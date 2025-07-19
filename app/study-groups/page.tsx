"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, MapPin, Clock, BookOpen, MessageCircle, Star } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import Logo from "@/components/logo"

export default function StudyGroupsPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "create" | "my-groups">("browse")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    description: "",
    meetingType: "online",
    schedule: "",
    maxMembers: "5",
    location: "",
    tags: "",
  })

  const studyGroups = [
    {
      id: 1,
      name: "DSA Warriors 💪",
      subject: "Data Structures & Algorithms",
      description: "Daily problem solving sessions. Currently preparing for placement interviews!",
      members: 8,
      maxMembers: 10,
      meetingType: "hybrid",
      schedule: "Daily 7-9 PM",
      location: "Library + Discord",
      tags: ["placement", "coding", "daily"],
      rating: 4.8,
      isJoined: false,
      avatar: "",
      organizer: "Arjun K",
    },
    {
      id: 2,
      name: "Web Dev Buddies 🌐",
      subject: "Web Development",
      description: "Building projects together! Currently working on a college portal.",
      members: 6,
      maxMembers: 8,
      meetingType: "online",
      schedule: "Tue, Thu, Sat 8-10 PM",
      location: "Google Meet",
      tags: ["projects", "react", "nodejs"],
      rating: 4.9,
      isJoined: true,
      avatar: "",
      organizer: "Sneha M",
    },
    {
      id: 3,
      name: "DBMS Study Circle 📊",
      subject: "Database Management",
      description: "Preparing for mid-terms together. SQL practice sessions every weekend!",
      members: 12,
      maxMembers: 15,
      meetingType: "offline",
      schedule: "Weekends 2-5 PM",
      location: "Computer Lab",
      tags: ["midterm", "sql", "weekend"],
      rating: 4.6,
      isJoined: false,
      avatar: "",
      organizer: "Rahul S",
    },
  ]

  const myGroups = studyGroups.filter((group) => group.isJoined)

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.subject || !newGroup.description) return

    // Mock group creation
    console.log("Creating group:", newGroup)
    setShowCreateForm(false)
    setNewGroup({
      name: "",
      subject: "",
      description: "",
      meetingType: "online",
      schedule: "",
      maxMembers: "5",
      location: "",
      tags: "",
    })
  }

  const joinGroup = (groupId: number) => {
    console.log("Joining group:", groupId)
  }

  return (
    <div className="min-h-screen bg-[#fff1df] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3c366b] to-[#4a4a7a] p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo variant="light" size="md" />
          </div>

          <h1 className="text-2xl font-bold text-white">Study Groups 👥</h1>
          <p className="text-[#b9f5a1] mt-1">Learn together, grow together!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 mt-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white/60 p-2 rounded-2xl">
          {[
            { key: "browse", label: "Browse Groups", icon: Users },
            { key: "my-groups", label: "My Groups", icon: BookOpen },
            { key: "create", label: "Create Group", icon: Plus },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                  ${
                    activeTab === tab.key
                      ? "bg-[#b9f5a1] text-[#353535] shadow-md transform scale-105"
                      : "text-[#80bfff] hover:bg-[#80bfff]/10"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Browse Groups Tab */}
        {activeTab === "browse" && (
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <Card
                key={group.id}
                className="bg-[#fff1df] border-2 border-[#80bfff]/30 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-[#b9f5a1]">
                        <AvatarImage src={group.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#b9f5a1] text-[#353535] font-bold">
                          {group.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-[#3c366b] text-lg">{group.name}</h3>
                        <p className="text-sm text-[#80bfff]">by {group.organizer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#ff8fab]/20 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-[#ff8fab]" />
                      <span className="text-sm font-medium text-[#ff8fab]">{group.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[#353535] leading-relaxed">{group.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#80bfff]/20 text-[#80bfff] px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-1 text-[#353535]">
                        <Users className="w-4 h-4 text-[#b9f5a1]" />
                        <span>
                          {group.members}/{group.maxMembers}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[#353535]">
                        <Clock className="w-4 h-4 text-[#ff8fab]" />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#353535]">
                        <MapPin className="w-4 h-4 text-[#80bfff]" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#353535]">
                        <BookOpen className="w-4 h-4 text-[#ff8fab]" />
                        <span>{group.subject}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      {group.isJoined ? (
                        <Button className="flex-1 bg-[#80bfff] hover:bg-[#6ba8e6] text-white rounded-2xl">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Open Chat
                        </Button>
                      ) : (
                        <Button
                          onClick={() => joinGroup(group.id)}
                          className="flex-1 bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold rounded-2xl"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Join Group
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-2 border-[#ff8fab] text-[#ff8fab] hover:bg-[#ff8fab] hover:text-white rounded-2xl px-6 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* My Groups Tab */}
        {activeTab === "my-groups" && (
          <div className="space-y-4">
            {myGroups.length > 0 ? (
              myGroups.map((group) => (
                <Card
                  key={group.id}
                  className="bg-[#fff1df] border-2 border-[#b9f5a1]/50 shadow-lg rounded-3xl overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border-2 border-[#b9f5a1]">
                          <AvatarFallback className="bg-[#b9f5a1] text-[#353535] font-bold">
                            {group.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-[#3c366b] text-lg">{group.name}</h3>
                          <p className="text-sm text-[#80bfff]">Next: {group.schedule}</p>
                        </div>
                      </div>
                      <div className="bg-[#b9f5a1] text-[#353535] px-3 py-1 rounded-full text-sm font-bold">Active</div>
                    </div>

                    <p className="text-[#353535] mb-4">{group.description}</p>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-[#80bfff] hover:bg-[#6ba8e6] text-white rounded-2xl">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Group Chat
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-[#ff8fab] text-[#ff8fab] hover:bg-[#ff8fab] hover:text-white rounded-2xl px-6 bg-transparent"
                      >
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-[#fff1df] border-2 border-[#80bfff]/30 shadow-lg rounded-3xl text-center p-8">
                <Users className="w-16 h-16 mx-auto text-[#80bfff] mb-4" />
                <h3 className="text-xl font-bold text-[#3c366b] mb-2">No Groups Yet!</h3>
                <p className="text-[#353535] mb-4">Join a study group to start learning with peers</p>
                <Button
                  onClick={() => setActiveTab("browse")}
                  className="bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold rounded-2xl"
                >
                  Browse Groups
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Create Group Tab */}
        {activeTab === "create" && (
          <Card className="bg-[#fff1df] border-2 border-[#b9f5a1]/30 shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#b9f5a1]/20 to-[#ff8fab]/20">
              <CardTitle className="flex items-center gap-2 text-[#3c366b]">
                <Plus className="w-6 h-6" />
                Create New Study Group
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Group Name</label>
                <Input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., React Ninjas, Math Masters..."
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Subject</label>
                  <Select
                    value={newGroup.subject}
                    onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}
                  >
                    <SelectTrigger className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80">
                      <SelectValue placeholder="Choose subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data-structures">Data Structures & Algorithms</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="dbms">Database Management</SelectItem>
                      <SelectItem value="os">Operating Systems</SelectItem>
                      <SelectItem value="networks">Computer Networks</SelectItem>
                      <SelectItem value="math">Engineering Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Max Members</label>
                  <Select
                    value={newGroup.maxMembers}
                    onValueChange={(value) => setNewGroup({ ...newGroup, maxMembers: value })}
                  >
                    <SelectTrigger className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 members</SelectItem>
                      <SelectItem value="5">5 members</SelectItem>
                      <SelectItem value="8">8 members</SelectItem>
                      <SelectItem value="10">10 members</SelectItem>
                      <SelectItem value="15">15 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Description</label>
                <Textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="What will your group focus on? What are your goals? 🎯"
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Meeting Type</label>
                  <Select
                    value={newGroup.meetingType}
                    onValueChange={(value) => setNewGroup({ ...newGroup, meetingType: value })}
                  >
                    <SelectTrigger className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Only</SelectItem>
                      <SelectItem value="offline">Offline Only</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#353535] mb-2">Schedule</label>
                  <Input
                    value={newGroup.schedule}
                    onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                    placeholder="e.g., Daily 7-9 PM, Weekends..."
                    className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Location/Platform</label>
                <Input
                  value={newGroup.location}
                  onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                  placeholder="e.g., Library, Discord, Google Meet..."
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Tags</label>
                <Input
                  value={newGroup.tags}
                  onChange={(e) => setNewGroup({ ...newGroup, tags: e.target.value })}
                  placeholder="placement, projects, beginner, advanced..."
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>

              <Button
                onClick={handleCreateGroup}
                disabled={!newGroup.name || !newGroup.subject || !newGroup.description}
                className="w-full bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold py-4 rounded-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Study Group
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
