"use client"

import { languages } from "@/components/editor"
import { CatppuccinContext } from "@/context/catppuccin"
import { ThemeContext } from "@/context/mui"
import { useContext } from "react"

export default function Features() {
    const catppuccinColor = useContext(CatppuccinContext)
    const theme = useContext(ThemeContext)
    return <div style={{ borderColor: theme?.palette.primary.main }} className="w-full mb-12 p-4 rounded-2xl border-solid border-0 border-l-8 shadow">
        <p> Completely open source and managed wholly by the Coding Club. </p>
        <p> Always welcomed for contribution, issues, pull requests.  </p>
        <p> Programming languages offered: </p>
        <div className="grid grid-cols-3 gap-2 grid-rows-2">
            {languages.map((l, key) => <div className="py-2 px-4 [&>*]:my-0 flex flex-col justify-center" style={{background: catppuccinColor.surface0}} key={key}>
                <l.Icon style={{color: theme?.palette.primary.main}} size="2.5rem"></l.Icon>
                <p className="my-0 text-sm"> {l.langDetail} </p>
            </div>)}
        </div>
    </div>
}