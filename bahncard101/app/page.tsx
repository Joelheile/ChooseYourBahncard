"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import {InputForm} from "./components/inputForm";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mb-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to the best DB experience of your life
          <br className="hidden sm:inline" />
          Trust me :)
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          I'm Joe, your personal helper figuring out which Bahncard you would
          like to use.
        </p>
      </div>
      <InputForm/>

    </section>
  )
}
