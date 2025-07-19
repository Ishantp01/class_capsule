"use client"

import { Home, Upload, Users, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Upload, label: "Upload", path: "/upload" },
    { icon: Users, label: "Groups", path: "/study-groups" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-[#80bfff]/30 shadow-lg">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`
                flex flex-col items-center p-3 rounded-2xl transition-all duration-200
                ${
                  isActive
                    ? "bg-[#b9f5a1] text-[#353535] transform scale-110"
                    : "text-[#80bfff] hover:bg-[#80bfff]/10 hover:text-[#3c366b]"
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
