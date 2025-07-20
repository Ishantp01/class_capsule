"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Sparkles, Share2, Tag } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import Logo from "@/components/logo"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    date: "",
    description: "",
    tags: "",
    visibility: "public",
  })
  const [summary, setSummary] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

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

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!uploadedFiles.length || !formData.subject || !formData.topic) return

    setIsProcessing(true)

    const form = new FormData()
    uploadedFiles.forEach(file => {
      form.append("file", file)
    })
    form.append("title", formData.subject)
    form.append("classDate", formData.date)
    form.append("topic", formData.topic)
    form.append("description", formData.description)
    form.append("tags", formData.tags)
    form.append("visibility", formData.visibility)
    form.append("uploadedBy", "64fe24e905f1e39bb61e7c20") // Replace with actual user ID in production

    try {
      const res = await fetch("/api/notes/upload", {
        method: "POST",
        body: form
      })

      if (!res.ok) throw new Error("Failed to upload")

      const result = await res.json()
      console.log("Upload successful:", result)

      setSummary(
        `🎉 Your notes on "${formData.topic}" have been processed and shared! Our AI found key concepts about ${formData.subject}. Your classmates will love this - you've earned 50 points! Keep the knowledge flowing! ✨`
      )
    } catch (error) {
  console.error("❌ Error during file upload:", error); // ADD THIS
  return Response.json({ error: 'Something went wrong while uploading. Please try again.' }, { status: 500 });
} finally {
      setIsProcessing(false)
    }
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

          <h1 className="text-2xl font-bold text-white">Share Your Notes 📚</h1>
          <p className="text-[#b9f5a1] mt-1">Help your classmates catch up!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-6 space-y-6">
        {/* File Upload Section */}
        <Card className="bg-[#fff1df] border-2 border-[#b9f5a1]/30 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#b9f5a1]/20 to-[#80bfff]/20">
            <CardTitle className="flex items-center gap-2 text-[#3c366b]">
              <Upload className="w-6 h-6" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
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
              <Upload className="w-12 h-12 mx-auto text-[#80bfff] mb-4" />
              <div>
                <p className="font-medium text-[#353535] mb-2">Drop your files here, or click to browse</p>
                <p className="text-sm text-[#80bfff]">PDF, JPG, PNG, DOC files welcome! 📄</p>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                multiple
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-[#80bfff] hover:bg-[#6ba8e6] text-white px-6 py-2 rounded-2xl cursor-pointer transition-colors mt-4"
              >
                Choose Files
              </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-[#353535]">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/60 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#b9f5a1]" />
                      <span className="text-sm font-medium text-[#353535]">{file.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                      className="text-[#ff8fab] hover:bg-[#ff8fab]/10 rounded-full"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details Form */}
        <Card className="bg-[#fff1df] border-2 border-[#ff8fab]/30 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#ff8fab]/20 to-[#b9f5a1]/20">
            <CardTitle className="flex items-center gap-2 text-[#3c366b]">
              <Tag className="w-6 h-6" />
              Add Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Subject</label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
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
                <label className="block text-sm font-medium text-[#353535] mb-2">Class Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#353535] mb-2">Topic/Chapter</label>
              <Input
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., Binary Trees, React Hooks, SQL Joins..."
                className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#353535] mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What's covered in these notes? Any important points to highlight? 😊"
                className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80 min-h-[100px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Tags</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="important, midterm, practical..."
                  className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#353535] mb-2">Visibility</label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => setFormData({ ...formData, visibility: value })}
                >
                  <SelectTrigger className="rounded-2xl border-2 border-[#80bfff]/50 bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (All students)</SelectItem>
                    <SelectItem value="batch">My Batch Only</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!uploadedFiles.length || !formData.subject || !formData.topic || isProcessing}
          className="w-full bg-[#b9f5a1] hover:bg-[#a8e690] text-[#353535] font-semibold py-4 rounded-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 text-lg"
        >
          {isProcessing ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Processing Magic...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Share & Earn Points
            </>
          )}
        </Button>

        {/* Success Message */}
        {summary && (
          <Card className="bg-white/80 border-2 border-[#b9f5a1]/50 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <p className="text-[#353535] leading-relaxed font-medium">{summary}</p>
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-[#ff8fab] text-[#ff8fab] hover:bg-[#ff8fab] hover:text-white rounded-2xl bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Success
                </Button>
                <Button
                  onClick={() => {
                    setUploadedFiles([])
                    setFormData({ subject: "", topic: "", date: "", description: "", tags: "", visibility: "public" })
                    setSummary("")
                  }}
                  className="bg-[#80bfff] hover:bg-[#6ba8e6] text-white rounded-2xl px-6"
                >
                  Upload More
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
