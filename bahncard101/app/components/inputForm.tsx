import { useState } from "react"
import { Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const InputForm = () => {
  const [kilometers, setKilometers] = useState("")
  const [tripNumber, setTripNumber] = useState("")
  const [age, setAge] = useState("")
  const [daysUntilTrip, setDaysUntilTrip] = useState("")
  const [ticketType, setTicketType] = useState("")
  const [bahnCardSuggestion, setBahnCardSuggestion] = useState("")

  const bahnCardPrices = {
    "BahnCard 25, 2nd Class U27": 36.9,
    "BahnCard 25, 1st Class U27": 77.9,
    "BahnCard 50, 2nd Class U27": 69.9,
    "BahnCard 50, 1st Class U27": 241,
    "BahnCard 25, 2nd Class": 59.9, // 25% discount on Flexpreis and Sparangebote&#8203;``【oaicite:8】``&#8203;
    "BahnCard 25, 1st Class": 121.0, // 25% discount on Flexpreis and Sparangebote&#8203;``【oaicite:7】``&#8203;
    "BahnCard 50, 2nd Class": 244.0, // 50% discount on Flexpreis and 25% on Sparangebote&#8203;``【oaicite:6】``&#8203;
    "BahnCard 50, 1st Class": 492.0, // 50% discount on Flexpreis and 25% on Sparangebote&#8203;``【oaicite:5】``&#8203;
    "BahnCard 100, 2nd Class": 4339.0, // Unlimited travel across Germany for one year&#8203;``【oaicite:0】``&#8203;
    "Jugend BahnCard 25": 7.9, // For 6- to 18-year-olds
    "Senioren BahnCard 25, 2nd Class": 38.9,
    "Senioren BahnCard 25, 1st Class": 77.9,
    "Senioren BahnCard 50, 2nd Class": 122.0,
    "Senioren BahnCard 50, 1st Class": 241.0, // For seniors&#8203
  }

  const suggestBahnCard = () => {
    // Convert string inputs to numbers for calculations
    const km = parseInt(kilometers)
    const trips = parseInt(tripNumber)
    const userAge = parseInt(age)
    const daysBeforeTrip = parseInt(daysUntilTrip)

    let suggestion = ""
    if (km > 1000 || trips > 10) {
      suggestion = userAge < 27 ? "BahnCard 50 (Youth Discount)" : "BahnCard 50"
    } else if (daysBeforeTrip >= 7 && ticketType === "sparpreis") {
      suggestion = "BahnCard 25"
    } else {
      suggestion = "BahnCard 25"
    }

    setBahnCardSuggestion(suggestion)
  }

  const getBahnCardImageUrl = () => {
    switch (bahnCardSuggestion) {
      case "BahnCard 25, 2nd Class":
        return "../../components/bahncardimages/bahncard25-2nd"
      case "BahnCard 25, 1st Class":
        return "../../components/bahncardimages/bahncard25-1st"
      case "BahnCard 50, 2nd Class":
        return "../../components/bahncardimages/bahncard50-2nd"
      case "BahnCard 50, 1st Class":
        return "../../components/bahncardimages/bahncard50-1st"
      case "BahnCard 100, 2nd Class":
        return "../../components/bahncardimages/bahncard100-2nd"; 
      case "BahnCard 100, 1st Class":
        return "../../components/bahncardimages/bahncard100-1st"; 
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col gap-10 mt-10">
      {/* Top Row with Input Fields */}
      <div>
        <Label>How many kilometers do you drive in a month with trains?</Label>
        <Input
          type="number"
          pattern="[0-9]*"
          id="kilometers"
          placeholder=""
          value={kilometers}
          onChange={(e) => {
            setKilometers(e.currentTarget.value)
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            How many trips do you do where a ticket would be reasonable? (Per
            Month)
          </Label>
          <Input
            type="number"
            pattern="[0-9]*"
            id="tripNumber"
            placeholder=""
            value={tripNumber}
            onChange={(e) => {
              setTripNumber(e.currentTarget.value)
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>How old are you?</Label>
          <Input
            type="number"
            pattern="[0-9]*"
            id="age"
            placeholder=""
            value={age}
            onChange={(e) => {
              setAge(e.currentTarget.value)
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>How many days do you usually book a trip beforehand?</Label>
          <Input
            type="number"
            pattern="[0-9]*"
            id="daysUntilTrip"
            placeholder=""
            value={daysUntilTrip}
            onChange={(e) => {
              setDaysUntilTrip(e.currentTarget.value)
            }}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Which type of ticket do you buy usually?</Label>

          <Select value={ticketType} onValueChange={(e) => setTicketType(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose one</SelectLabel>
                <SelectItem value="supersparpreis">Super Sparpreis</SelectItem>
                <SelectItem value="sparpreis">Sparpreis</SelectItem>
                <SelectItem value="flexpreisAktion">
                  Flexpreis Aktion
                </SelectItem>
                <SelectItem value="flexpreis">Flexpreis</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button onClick={suggestBahnCard}>Find My BahnCard</Button>
        </div>
      </div>
      {/* Row Below with BahnCard Suggestion and Image */}
      {bahnCardSuggestion && (
        <div className="flex flex-col items-center">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Based on your input, we suggest the {bahnCardSuggestion}.
            </AlertDescription>
          </Alert>
          {getBahnCardImageUrl() && (
            <img
              src={getBahnCardImageUrl()}
              alt="BahnCard Suggestion"
              className="mt-4"
            />
          )}
        </div>
      )}
    </div>
  )
}
