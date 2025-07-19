"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, LogOut, Save } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import Logo from "@/components/logo"
import { useRouter } from "next/navigation"

export default function Profile() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    college: "Government Engineering College, Raipur",
    course: "Computer Science Engineering",
    year: "3rd Year",
    avatar: "",
  })

  const handleSave = () => {
    // Mock save functionality
    console.log("Profile saved:", profile)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#fff1df] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3c366b] to-[#4a4a7a] p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo variant="light" size="md" />
          </div>

          <h1 className="text-2xl font-bold text-white">Your Profile 👤</h1>
          <p className="text-[#b9f5a1] mt-1">Make it uniquely yours!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-6">
        <Card className="bg-[#fff1df] border-2 border-[#80bfff]/30 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#80bfff]/20 to-[#ff8fab]/20 text-center">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-[#b9f5a1] text-[#353535] text-2xl font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full bg-[#ff8fab] hover:bg-[#ff7a9a] text-white p-2 h-8 w-8"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 focus:border-[#ff8fab]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">College</label>
                <Input
                  value={profile.college}
                  onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 focus:border-[#ff8fab]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Course</label>
                  <Input
                    value={profile.course}
                    onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                    className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 focus:border-[#ff8fab]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Year</label>
                  <Input
                    value={profile.year}
                    onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                    className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 focus:border-[#ff8fab]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold py-3 rounded-2xl transform transition-all duration-200 hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-2 border-[#ff8fab] text-[#ff8fab] hover:bg-[#ff8fab] hover:text-white rounded-2xl px-6 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
