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
  return (
    <div className="grid w-full max-w-sm items-center gap-10 mt-10">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>How many kilometers do you drive in a month with trains?</Label>
        <Input type="number" pattern="[0-9]*" id="kilometers" placeholder="" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>
          How many trips do you do where a ticket would be reasonable? (Per
          Month)
        </Label>
        <Input type="number" pattern="[0-9]*" id="tripNumber" placeholder="" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>How old are you?</Label>
        <Input type="number" pattern="[0-9]*" id="age" placeholder="" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>How many days do you usually book a trip beforehand?</Label>
        <Input
          type="number"
          pattern="[0-9]*"
          id="daysUntilTrip"
          placeholder=""
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Which type of ticket do you buy usually?</Label>

        <Select>
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
        <Button>Button</Button>
      </div>
    </div>
  )
}
