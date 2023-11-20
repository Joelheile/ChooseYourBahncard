import { useState } from "react"
import { Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  const [kilometers, setKilometers] = useState<string | number>("")
  const [tripNumber, setTripNumber] = useState<string | number>("")
  const [age, setAge] = useState<string | number>("")
  const [moneyMonth, setMoneyMonth] = useState<string | number>("")
  const [ticketType, setTicketType] = useState("")
  const [classType, setClassType] = useState("")
  const [bahnCardSuggestion, setBahnCardSuggestion] = useState("")

  const bahnCardPrices = {
    "BahnCard 25, 2nd Class U27": 36.9,
    "BahnCard 25, 1st Class U27": 77.9,
    "BahnCard 50, 2nd Class U27": 69.9,
    "BahnCard 50, 1st Class U27": 241,
    "BahnCard 25, 2nd Class": 59.9, // 25% discount on Flexpreis and Sparangebote
    "BahnCard 25, 1st Class": 121.0, // 25% discount on Flexpreis and Sparangebote
    "BahnCard 50, 2nd Class": 244.0, // 50% discount on Flexpreis and 25% on Sparangebote
    "BahnCard 50, 1st Class": 492.0, // 50% discount on Flexpreis and 25% on Sparangebote
    "BahnCard 100, 2nd Class": 4339.0, // Unlimited travel across Germany for one year
    "Jugend BahnCard 25": 7.9, // For 6- to 18-year-olds
    "Senioren BahnCard 25, 2nd Class": 38.9,
    "Senioren BahnCard 25, 1st Class": 77.9,
    "Senioren BahnCard 50, 2nd Class": 122.0,
    "Senioren BahnCard 50, 1st Class": 241.0, // For seniors&#8203
  }

  const suggestBahnCard = () => {
     // Convert string inputs to numbers for calculations
     const km = Number(kilometers);
     const trips = Number(tripNumber);
     const userAge = Number(age);
     const monthlyBudget = Number(moneyMonth);
 

    let suggestion = ""

    if (userAge <= 18) {
      suggestion = "Jugendbahncard 25"
    } else if (
      ticketType == "flexpreisAktion" ||
      ticketType == "flexpreis" ||
      monthlyBudget / trips >= 50
    ) {
      suggestion = "Bahncard 50"
    } else {
      suggestion = "Bahncard 25"
    }
    /*
    let suggestion = ""
    if (km > 1000 || trips > 10) {
      suggestion = userAge < 27 ? "BahnCard 50 (Youth Discount)" : "BahnCard 50"
    } else if (daysBeforeTrip >= 7 && ticketType === "sparpreis") {
      suggestion = "BahnCard 25"
    } else {
      suggestion = "BahnCard 25"
    }
    */
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
        return "../../components/bahncardimages/bahncard100-2nd"
      case "BahnCard 100, 1st Class":
        return "../../components/bahncardimages/bahncard100-1st"
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
            month)
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
          <Label>How much money do you donate to DB every month?</Label>
          <Input
            type="number"
            pattern="[0-9]*"
            id="moneyMonth"
            placeholder=""
            value={moneyMonth}
            onChange={(e) => {
              setMoneyMonth(e.currentTarget.value)
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Which class do you you usually in?</Label>

          <RadioGroup value={classType} onValueChange={(e) => setClassType(e)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="first-class" id="first-class" />
              <Label htmlFor="first-class">First Class</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="second-class" id="second-class" />
              <Label htmlFor="second-class">Second Class</Label>
            </div>
          </RadioGroup>
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
