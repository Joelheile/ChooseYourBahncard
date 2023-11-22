import { useBahnCard } from '../hooks/useBahnCard';
import { InputField } from './inputField';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const InputForm: React.FC = () => {
  const {
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
  } = useBahnCard();

return (
    <div className="flex flex-col gap-10 mt-10">
      {/* Kilometers Input */}
      <InputField
        label="How many kilometers do you drive in a month with trains?"
        value={kilometers}
        onChange={(e) => setKilometers(e.currentTarget.value)}
      />

      {/* Trip Number Input */}
      <InputField
        label="How many trips do you do where a ticket would be reasonable? (Per month)"
        value={tripNumber}
        onChange={(e) => setTripNumber(e.currentTarget.value)}
      />

      {/* Age Input */}
      <InputField
        label="How old are you?"
        value={age}
        onChange={(e) => setAge(e.currentTarget.value)}
      />

      {/* Money per Month Input */}
      <InputField
        label="How much money do you spend on trains each month?"
        value={moneyMonth}
        onChange={(e) => setMoneyMonth(e.currentTarget.value)}
      />

      {/* Class Type and Ticket Type Selection - Add your own components or logic here */}
      {/* ... */}

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
