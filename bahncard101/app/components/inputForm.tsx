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
    'BahnCard 25, 2nd Class': 59.90, // 25% discount on Flexpreis and Sparangebote&#8203;``【oaicite:8】``&#8203;
    'BahnCard 25, 1st Class': 121.00, // 25% discount on Flexpreis and Sparangebote&#8203;``【oaicite:7】``&#8203;
    'BahnCard 50, 2nd Class': 244.00, // 50% discount on Flexpreis and 25% on Sparangebote&#8203;``【oaicite:6】``&#8203;
    'BahnCard 50, 1st Class': 492.00, // 50% discount on Flexpreis and 25% on Sparangebote&#8203;``【oaicite:5】``&#8203;
    'Probe BahnCard 25, 2nd Class': 17.90, // Test BahnCard offering savings from the first journey&#8203;``【oaicite:4】``&#8203;
    'Probe BahnCard 25, 1st Class': 36.90, // Test BahnCard offering savings from the first journey&#8203;``【oaicite:3】``&#8203;
    'Probe BahnCard 50, 2nd Class': 72.90, // Test BahnCard offering savings from the first journey&#8203;``【oaicite:2】``&#8203;
    'Probe BahnCard 50, 1st Class': 146.00, // Test BahnCard offering savings from the first journey&#8203;``【oaicite:1】``&#8203;
    'BahnCard 100, 2nd Class': 4339.00, // Unlimited travel across Germany for one year&#8203;``【oaicite:0】``&#8203;
    'Jugend BahnCard 25': 7.90, // For 6- to 18-year-olds
    'Senioren BahnCard 25, 2nd Class': 38.90,
    'Senioren BahnCard 25, 1st Class': 77.90,
    'Senioren BahnCard 50, 2nd Class': 122.00,
    'Senioren BahnCard 50, 1st Class': 241.00, // For seniors
  };

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

  // Function to get the image URL based on the BahnCard suggestion
  const getBahnCardImageUrl = () => {
    switch (bahnCardSuggestion) {
      case "BahnCard 25":
        return "/path/to/bahncard25.jpg" // Replace with actual image path or URL
      case "BahnCard 50":
        return "/path/to/bahncard50.jpg" // Replace with actual image path or URL
      case "BahnCard 50 (Youth Discount)":
        return "/path/to/bahncard50-youth.jpg" // Replace with actual image path or URL
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
