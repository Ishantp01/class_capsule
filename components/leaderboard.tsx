import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, TrendingUp } from "lucide-react"

export default function Leaderboard() {
  const leaderboardData = [
    { name: "Arjun K", points: 1250, avatar: "", rank: 1, badge: "Contributor of the Week" },
    { name: "Sneha M", points: 1180, avatar: "", rank: 2 },
    { name: "Rahul S", points: 1050, avatar: "", rank: 3 },
    { name: "You (Priya)", points: 890, avatar: "", rank: 7, isCurrentUser: true },
    { name: "Vikash T", points: 820, avatar: "", rank: 8 },
  ]

  return (
    <Card className="bg-[#fff1df] border-2 border-[#ff8fab]/30 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#ff8fab]/20 to-[#80bfff]/20">
        <CardTitle className="flex items-center gap-2 text-[#3c366b]">
          <Trophy className="w-6 h-6" />
          FOMO Leaderboard
        </CardTitle>
        <p className="text-sm text-[#80bfff] font-medium">66 from your batch joined today! 🔥</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {leaderboardData.map((user, index) => (
          <div
            key={user.name}
            className={`
              flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-105
              ${
                user.isCurrentUser
                  ? "bg-[#b9f5a1]/20 border-2 border-[#b9f5a1] shadow-md"
                  : "bg-white/60 hover:bg-white/80"
              }
            `}
          >
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-[#80bfff] text-white font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {user.rank <= 3 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ff8fab] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user.rank}</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-[#353535]">{user.name}</h4>
                {user.badge && (
                  <span className="bg-[#ff8fab] text-white text-xs px-2 py-1 rounded-full font-medium">
                    <Star className="w-3 h-3 inline mr-1" />
                    {user.badge}
                  </span>
                )}
                {user.isCurrentUser && (
                  <div className="bg-[#b9f5a1] text-[#353535] text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    You're #{user.rank}! 🎯
                  </div>
                )}
              </div>
              <p className="text-sm text-[#80bfff] flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {user.points} points
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-[#3c366b]">#{user.rank}</div>
            </div>
          </div>
        ))}

        <div className="text-center mt-6 p-4 bg-[#80bfff]/10 rounded-2xl">
          <p className="text-[#353535] font-medium">Keep sharing notes to climb up! 📈</p>
          <p className="text-sm text-[#80bfff] mt-1">Next milestone: 1000 points for a special badge! ⭐</p>
        </div>
      </CardContent>
    </Card>
  )
}
