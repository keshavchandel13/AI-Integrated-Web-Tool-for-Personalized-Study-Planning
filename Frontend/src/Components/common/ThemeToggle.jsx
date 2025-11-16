import React from 'react'
import { useEffectEvent } from 'react'
import {useState, useEffect} from 'react'
import { Moon } from 'lucide-react'
export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])
  return (
      <div>
        <button
        onClick={()=> setTheme(theme==="light" ? "dark":"light")}
         className="relative p-2 rounded-md text-purple-600 hover:bg-purple-50 dark:text-gray-100
        transition"
         >
          <Moon className="w-5 h-5"/>
        </button>
      </div>
  )
}
