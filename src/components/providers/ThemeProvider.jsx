import transition from "@/lib/transition"
import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const getSystemThemePreference = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const theme = mediaQuery.matches ? 'dark' : 'light'
        return theme
    }

    const [theme, setTheme] = useState(localStorage.getItem('theme') || getSystemThemePreference())

    const setNewTheme = (newTheme) => {
        transition(() => setTheme(newTheme))
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const setThemeAttribute = (isSystemChange = false) => {
            if (theme === 'system') {
                document.documentElement.setAttribute('data-theme', getSystemThemePreference())
            }
            else if (!isSystemChange)
                document.documentElement.setAttribute('data-theme', theme)

        }
        const _systemChangeListener = () => setThemeAttribute(true)

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', _systemChangeListener)

        setThemeAttribute()

        return () => mediaQuery.removeEventListener('change', _systemChangeListener)
    }, [theme])

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'theme')
                setNewTheme(event.newValue)
        }
        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setNewTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
