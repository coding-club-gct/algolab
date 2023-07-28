"use client"

import { CatppuccinContext } from "@/context/catppuccin"
import { useContext } from "react"

export default function Header() {
    const catppuccinColor = useContext(CatppuccinContext)
    return <div className="flex flex-col [&>*]:m-0 my-4">
        <p className="text-2xl font-bold"> Algolab </p>
        <p className="text-xl font-extrabold"> Unleash your coding potential </p>
    </div>
}