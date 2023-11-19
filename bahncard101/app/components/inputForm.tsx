import { useState } from "react"

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

import { Terminal } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"

export const InputForm = () => {
  const [kilometers, setKilometers] = useState("")
  const [tripNumber, setTripNumber] = useState("")
  const [age, setAge] = useState("")
  const [daysUntilTrip, setDaysUntilTrip] = useState("")
  const [ticketType, setTicketType] = useState("")
  const [bahnCardSuggestion, setBahnCardSuggestion] = useState("")

  const suggestBahnCard = () => {
    // Convert string inputs to numbers for calculations
    const km = parseInt(kilometers);
    const trips = parseInt(tripNumber);
    const userAge = parseInt(age);
    const daysBeforeTrip = parseInt(daysUntilTrip);

    let suggestion = "";
    if (km > 1000 || trips > 10) {
      suggestion = userAge < 27 ? 'BahnCard 50 (Youth Discount)' : 'BahnCard 50';
    } else if (daysBeforeTrip >= 7 && ticketType === 'sparpreis') {
      suggestion = 'BahnCard 25';
    } else {
      suggestion = 'BahnCard 25';
    }

    setBahnCardSuggestion(suggestion);
  };


  return (
    <div className="grid w-full max-w-sm items-center gap-10 mt-10">
      <div className="grid w-full max-w-sm items-center gap-1.5">
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
        <Input type="number" pattern="[0-9]*" id="age" placeholder="" value={age}
          onChange={(e) => {
            setAge(e.currentTarget.value)
          }}/>
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
              <SelectItem value="flexpreisAktion">Flexpreis Aktion</SelectItem>
              <SelectItem value="flexpreis">Flexpreis</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button onClick={suggestBahnCard}>Find My BahnCard</Button>
      </div>

      {bahnCardSuggestion && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Based on your input, we suggest the {bahnCardSuggestion}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
