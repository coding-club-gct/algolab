"use client"

import { CatppuccinContext } from "@/context/catppuccin"
import { DarkModeContext } from "@/context/darkmode"
import { useContext } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"

export default function DarkModeSwitcher() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
    const catppuccinColor = useContext(CatppuccinContext)
    return <DarkModeSwitch
        sunColor={catppuccinColor.yellow}
        moonColor={catppuccinColor.sky}
        checked={!darkMode}
        onChange={toggleDarkMode}
    />
}