"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
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

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mb-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to a DB experience, you have never experienced before{" "}
          <br className="hidden sm:inline" />
          Trust me :)
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          I'm Joe, your personal helper figuring out which Bahncard you would
          like to use. <br />
          asdfök
        </p>
      </div>


      <div className="grid w-full max-w-sm items-center gap-10">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            How many kilometers do you drive in a month with trains?
          </Label>
          <Input
            type="number"
            pattern="[0-9]*"
            id="kilometers"
            placeholder=""
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
          />
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
      </div>
    </section>
  )
}
