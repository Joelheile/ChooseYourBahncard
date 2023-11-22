import { useState } from 'react';
import { suggestBahnCard, getBahnCardImageUrl } from "../utils/bahncardUtils";

export const useBahnCard = () => {
  const [kilometers, setKilometers] = useState<string | number>("");
  const [tripNumber, setTripNumber] = useState<string | number>("");
  const [age, setAge] = useState<string | number>("");
  const [moneyMonth, setMoneyMonth] = useState<string | number>("");
  const [ticketType, setTicketType] = useState("");
  const [classType, setClassType] = useState("");
  const [bahnCardSuggestion, setBahnCardSuggestion] = useState("");
  const [suggestionPrice, setSuggestionPrice] = useState<string | number>("");

  const calculateSuggestion = () => {
    const suggestionResult = suggestBahnCard(
      Number(age), ticketType, Number(moneyMonth),
      Number(tripNumber), Number(classType)
    );
    setBahnCardSuggestion(suggestionResult.suggestion);
    setSuggestionPrice(suggestionResult.suggestionPrice);
  };

  const imageUrl = getBahnCardImageUrl(bahnCardSuggestion);

  return {
    kilometers, setKilometers,
    tripNumber, setTripNumber,
    age, setAge,
    moneyMonth, setMoneyMonth,
    ticketType, setTicketType,
    classType, setClassType,
    calculateSuggestion,
    imageUrl,
    bahnCardSuggestion,
    suggestionPrice
  };
};
