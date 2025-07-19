"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Sparkles } from "lucide-react"

export default function NotesUploader() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [summary, setSummary] = useState("")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSummarize = () => {
    // Mock AI summarization
    setSummary(
      "📝 Your notes on 'React Hooks' have been processed! Key points: useState for state management, useEffect for side effects, custom hooks for reusable logic. Great handwriting btw! This will help your classmates a lot. 🌟",
    )
  }

  return (
    <Card className="bg-[#fff1df] border-2 border-[#ff8fab]/30 shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#ff8fab]/20 to-[#b9f5a1]/20">
        <CardTitle className="flex items-center gap-2 text-[#3c366b]">
          <Upload className="w-6 h-6" />
          Upload Peer Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* File Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-200
            ${
              dragActive
                ? "border-[#b9f5a1] bg-[#b9f5a1]/10"
                : "border-[#80bfff]/50 hover:border-[#80bfff] hover:bg-[#80bfff]/5"
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="space-y-2">
              <FileText className="w-12 h-12 mx-auto text-[#b9f5a1]" />
              <p className="font-medium text-[#353535]">{uploadedFile.name}</p>
              <p className="text-sm text-[#80bfff]">Ready to process! ✨</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-[#80bfff]" />
              <div>
                <p className="font-medium text-[#353535] mb-2">Drop your notes here, or click to browse</p>
                <p className="text-sm text-[#80bfff]">PDF, JPG, PNG files welcome! 📚</p>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-[#80bfff] hover:bg-[#6ba8e6] text-white px-6 py-2 rounded-2xl cursor-pointer transition-colors"
              >
                Choose File
              </label>
            </div>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-[#353535] mb-2">Write a note/description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this about? Any context for your classmates? 😊"
            className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 focus:border-[#ff8fab] min-h-[100px]"
          />
        </div>

        {/* Summarize Button */}
        <Button
          onClick={handleSummarize}
          disabled={!uploadedFile}
          className="w-full bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold py-3 rounded-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Summarize & Boost
        </Button>

        {/* AI Summary Result */}
        {summary && (
          <Card className="bg-white/80 border-2 border-[#b9f5a1]/50 rounded-2xl">
            <CardContent className="p-4">
              <p className="text-[#353535] leading-relaxed">{summary}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
