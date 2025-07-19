"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"

export default function LandingPage() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleSignIn = () => {
    // Mock sign in - in real app would handle authentication
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c366b] via-[#4a4a7a] to-[#80bfff] flex flex-col items-center justify-center p-4">
      {/* Main Content */}
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo */}
        <div className="space-y-2">
          <Logo variant="light" size="lg" clickable={false} />

          {/* Tagline */}
          <p className="text-xl text-[#b9f5a1] font-medium tracking-wide">Catch up, the human way.</p>
        </div>

        {/* Sign In Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSignIn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold 
              px-8 py-4 rounded-full text-lg shadow-lg border-2 border-[#a8e690]
              transform transition-all duration-200 hover:scale-105 hover:shadow-xl
              ${isHovered ? "rotate-1" : ""}
            `}
          >
            Sign In to Start
          </Button>

          <p className="text-sm text-[#80bfff] font-medium">For students, by students. 🎓</p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 mt-12 opacity-60">
          <div className="w-2 h-2 bg-[#ff8fab] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#b9f5a1] rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-[#80bfff] rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fff1df] to-transparent opacity-20"></div>
    </div>
  )
}
