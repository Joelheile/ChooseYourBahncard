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
  const [suggestionPrice, setSuggestionPrice] = useState<string | number>("")

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
    const km = Number(kilometers)
    const trips = Number(tripNumber)
    const userAge = Number(age)
    const monthlyBudget = Number(moneyMonth)
    const trainClass = Number(classType)
    
    let suggestion = ""
    let suggestionPrice = 0

    // tests
    console.log(km)
    console.log(trips)
    console.log(userAge)
    console.log(monthlyBudget)
    console.log(trainClass)

    if (
      userAge <= 18 &&
      (ticketType == "supersparpreis" || ticketType == "sparpreis")
    ) {
      suggestion = "JugendBahncard 25"
      suggestionPrice = 7.9
    }

    // Bahncard 100
    else if (monthlyBudget >= (7356 / 12) && trainClass == 1) {
      suggestion = "BahnCard 100 1st Class"
      suggestionPrice = 7356
    } else if (monthlyBudget >= (4339 / 12) && trainClass == 2) {
      suggestion = "BahnCard 100 2nd Class"
      suggestionPrice = 4339
    }

    // Bahncard 50
    else if (
      userAge <= 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 50 1st Class"
      suggestionPrice = 241
    } else if (
      userAge <= 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 50 2nd Clas"
      suggestionPrice = 492.0
    }
    

    // Bahncard 25
    else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 25 1st Class"
      suggestionPrice = 77.9
    } else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 25 2nd Clas"
      suggestionPrice = 36.9
    }

    // else
    else {
      suggestion = "BahnCard 25"
      suggestionPrice = 59.9
    }

    setBahnCardSuggestion(suggestion)
    setSuggestionPrice(suggestionPrice)
  }

  const getBahnCardImageUrl = () => {
    switch (bahnCardSuggestion) {
      case "JugendBahncard 25":
        return "../../components/bahncardimages/youth-bahncard25"
      case "BahnCard 25 2nd Class":
        return "../../components/bahncardimages/bahncard25-2nd"
      case "BahnCard 25 1st Class":
        return "../../components/bahncardimages/bahncard25-1st"
      case "BahnCard 50 2nd Class":
        return "../../components/bahncardimages/bahncard50-2nd"
      case "BahnCard 50 1st Class":
        return "../../components/bahncardimages/bahncard50-1st"
      case "BahnCard 100 2nd Class":
        return "../../components/bahncardimages/bahncard100-2nd"
      case "BahnCard 100 1st Class":
        return "bahncard101/components/bahncardimages/bahncard100-1st"
        

      default:
        return ""
    }
    console.log(getBahnCardImageUrl)
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
              <RadioGroupItem value="1" id="first-class" />
              <Label htmlFor="first-class">First Class</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="second-class" />
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
            <AlertTitle>We've got a recommendation for you!</AlertTitle>
            <AlertDescription>
              Based on your input, we suggest the {bahnCardSuggestion}. It costs{" "}
              {suggestionPrice} €.
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
