import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {useState}  from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      suggestionPrice = 7.90
    }

    // Bahncard 100
    else if (monthlyBudget >= 7356 / 12 && trainClass == 1) {
      suggestion = "BahnCard 100 1st Class"
      suggestionPrice = 7356
    } else if (monthlyBudget >= 4339 / 12 && trainClass == 2) {
      suggestion = "BahnCard 100 2nd Class"
      suggestionPrice = 4339
    }
    // MyBahncard 50 (Jugend)
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
      suggestionPrice = 69.90
    }
    // Bahncard 50
    else if (
      userAge > 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 50 1st Class"
      suggestionPrice = 241
    } else if (
      userAge > 27 &&
      (ticketType == "flexpreisAktion" ||
        ticketType == "flexpreis" ||
        monthlyBudget / trips >= 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 50 2nd Clas"
      suggestionPrice = 492
    }

    // MyBahncard 25
    else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 25 1st Class"
      suggestionPrice = 77.90
    } else if (
      userAge <= 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 25 2nd Clas"
      suggestionPrice = 36.90
    }

    // Bahncard 25
    else if (
      userAge > 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 1
    ) {
      suggestion = "BahnCard 25 1st Class"
      suggestionPrice = 121
    } else if (
      userAge > 27 &&
      (ticketType == "supersparpeis" ||
        ticketType == "sparpreis" ||
        monthlyBudget / trips < 50) &&
      trainClass == 2
    ) {
      suggestion = "BahnCard 25 2nd Clas"
      suggestionPrice = 59.90
    }

    // else
    else {
      suggestion = "BahnCard 25 2nd Class"
      suggestionPrice = 59.90
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
      {/* Kilometers Input */}
      <Input
        label="How many kilometers do you drive in a month with trains?"
        value={kilometers}
        onChange={(e) => setKilometers(e.currentTarget.value)}
      />

      {/* Trip Number Input */}
      <Input
        label="How many trips do you do where a ticket would be reasonable? (Per month)"
        value={tripNumber}
        onChange={(e) => setTripNumber(e.currentTarget.value)}
      />

      {/* Age Input */}
      <Input
        label="How old are you?"
        value={age}
        onChange={(e) => setAge(e.currentTarget.value)}
      />

      {/* Money per Month Input */}
      <Input
        label="How much money do you spend on trains each month?"
        value={moneyMonth}
        onChange={(e) => setMoneyMonth(e.currentTarget.value)}
      />

      

      {/* Suggestion Button */}
      <Button onClick={calculateSuggestion}>Find My BahnCard</Button>

      {/* BahnCard Suggestion Display */}
      {bahnCardSuggestion && (
        <div className="flex flex-col items-center">
          <Alert>
            <AlertTitle>We've got a recommendation for you!</AlertTitle>
            <AlertDescription>
              Based on your input, we suggest the {bahnCardSuggestion}. It costs{" "}
              {suggestionPrice} €.
            </AlertDescription>
            </Alert>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="BahnCard Suggestion"
              className="mt-4"
            />
          )}
        </div>
      )}
    </div>
  );
};
