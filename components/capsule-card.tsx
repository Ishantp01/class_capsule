import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText } from "lucide-react"

interface CapsuleCardProps {
  summary: {
    subject: string
    date: string
    content: string
    attendees: number
    notes: number
  }
}

export default function CapsuleCard({ summary }: CapsuleCardProps) {
  return (
    <Card className="bg-white/80 border-2 border-[#b9f5a1]/50 shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#ff8fab] rounded-full"></div>
          <h3 className="font-bold text-[#3c366b] text-lg">
            {summary.subject} - {new Date(summary.date).toLocaleDateString()}
          </h3>
        </div>

        <div className="bg-[#fff1df] rounded-2xl p-4 mb-4 border-l-4 border-[#b9f5a1]">
          <p className="text-[#353535] leading-relaxed font-medium">{summary.content}</p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#80bfff]">
              <Users className="w-4 h-4" />
              <span>{summary.attendees} attended</span>
            </div>
            <div className="flex items-center gap-1 text-[#ff8fab]">
              <FileText className="w-4 h-4" />
              <span>{summary.notes} notes shared</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
