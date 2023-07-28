"use client"

import { ThemeContext } from '@/context/mui'
import { useContext } from 'react'
import { Browser, Ghost } from 'react-kawaii'

export const KawaiBroswer = () => {
    const theme = useContext(ThemeContext)
    return <Browser size={125} mood='lovestruck' color={theme?.palette.primary.main} />
}

export const KawaiGhost = () => {
    const theme = useContext(ThemeContext)
    return <Ghost size={150} color={theme?.palette.primary.main} />
}
