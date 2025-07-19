"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Share2, Sparkles } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import CapsuleCard from "@/components/capsule-card"
import NotesUploader from "@/components/notes-uploader"
import Logo from "@/components/logo"

export default function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [showSummary, setShowSummary] = useState(false)
  const [userName] = useState("Deepansh") // Mock user name

  const handleFetchCapsule = () => {
    if (selectedSubject && selectedDate) {
      setShowSummary(true)
    }
  }

  const mockSummary = {
    subject: selectedSubject,
    date: selectedDate,
    content:
      "Today's Data Structures class covered Binary Trees! 🌳 Key points: tree traversal methods (inorder, preorder, postorder), balanced vs unbalanced trees, and time complexity O(log n) for search operations. Prof mentioned this will be in the mid-term! 📚",
    attendees: 45,
    notes: 3,
  }

  return (
    <div className="min-h-screen bg-[#fff1df] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3c366b] to-[#4a4a7a] p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo variant="light" size="md" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <h1 className="text-2xl font-bold text-white">Hey {userName}! 👋</h1>
            <p className="text-[#b9f5a1] mt-1">Ready to catch up on what you missed?</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6 mt-6">
        {/* Get Class Summary Section */}
        <Card className="bg-[#fff1df] border-2 border-[#80bfff]/30 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#80bfff]/20 to-[#b9f5a1]/20">
            <CardTitle className="flex items-center gap-2 text-[#3c366b]">
              <BookOpen className="w-6 h-6" />
              Get My Class Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Choose Subject/Topic</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80">
                    <SelectValue placeholder="Pick a subject..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-structures">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="dbms">Database Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Pick Session Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>
            </div>

            <Button
              onClick={handleFetchCapsule}
              disabled={!selectedSubject || !selectedDate}
              className="w-full bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold py-3 rounded-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Fetch Capsule
            </Button>

            {showSummary && (
              <div className="mt-6 space-y-4">
                <CapsuleCard summary={mockSummary} />
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#ff8fab] text-[#ff8fab] hover:bg-[#ff8fab] hover:text-white rounded-2xl bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Capsule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Notes Section */}
        <NotesUploader />
      </div>

      <BottomNav />
    </div>
  )
}
