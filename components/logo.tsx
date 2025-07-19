"use client"

import { useRouter } from "next/navigation"

interface LogoProps {
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
  clickable?: boolean
}

export default function Logo({ variant = "light", size = "md", clickable = true }: LogoProps) {
  const router = useRouter()

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  }

  const colorClasses = {
    light: "text-white",
    dark: "text-[#3c366b]",
  }

  const handleClick = () => {
    if (clickable) {
      router.push("/dashboard")
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 font-bold tracking-wide select-none
        ${clickable ? "cursor-pointer hover:scale-105 transition-transform duration-200" : ""}
        ${sizeClasses[size]} ${colorClasses[variant]}
      `}
    >
      {/* Hand-drawn style text with slight rotations */}
      <span className="inline-block transform -rotate-1 drop-shadow-sm">Class</span>
      <span className="inline-block transform rotate-1 drop-shadow-sm">Capsule</span>

      {/* Capsule emoji with subtle animation */}
      <span
        className={`
        inline-block transform transition-transform duration-300
        ${clickable ? "hover:rotate-12 hover:scale-110" : ""}
        ${size === "lg" ? "text-5xl" : size === "md" ? "text-3xl" : "text-xl"}
      `}
      >
        💊
      </span>

      {/* Decorative dots for extra personality */}
      {size !== "sm" && (
        <div className="flex flex-col gap-1 ml-1 opacity-60">
          <div className="w-1 h-1 bg-[#b9f5a1] rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-[#ff8fab] rounded-full animate-pulse delay-100"></div>
        </div>
      )}
    </div>
  )
}
