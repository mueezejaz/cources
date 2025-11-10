"use client"

import { useState, useRef } from "react"
import { X, Download } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import html2canvas from "html2canvas"
import { Input } from "@/components/ui/input"

export function CertificateModal({ isOpen, onClose, courseName }) {
    const [userName, setUserName] = useState("")
    const [showCertificate, setShowCertificate] = useState(false)
    const certificateRef = useRef()
    const [isDownloading, setIsDownloading] = useState(false)

    if (!isOpen) return null

    const handleDownload = async () => {
        if (!certificateRef.current) return

        try {
            setIsDownloading(true)
            const canvas = await html2canvas(certificateRef.current, {
                backgroundColor: "#ffffff",
                scale: 2,
            })
            const link = document.createElement("a")
            link.href = canvas.toDataURL("image/png")
            link.download = `${userName}_certificate.png`
            link.click()
        } catch (error) {
            console.error("Error downloading certificate:", error)
        } finally {
            setIsDownloading(false)
        }
    }

    const handleGenerate = () => {
        if (userName.trim()) {
            setShowCertificate(true)
        }
    }

    const handleBack = () => {
        setShowCertificate(false)
        setUserName("")
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-red-600">
                {/* Header */}
                <div className="sticky top-0 bg-red-600 text-white border-b border-red-600 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Congratulations!</h2>
                    <button onClick={onClose} className="p-2 hover:bg-red-700 rounded-lg transition">
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 bg-white">
                    {!showCertificate ? (
                        // Input Name
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Name</h3>
                                <p className="text-gray-600 mb-4">Your name will appear on your certificate</p>
                                <Input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full border-2 border-red-600 text-gray-900"
                                />
                            </div>
                            <button
                                onClick={handleGenerate}
                                disabled={!userName.trim()}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Generate Certificate
                            </button>
                        </div>
                    ) : (
                        // Certificate Display
                        <div className="space-y-6">
                            <div
                                ref={certificateRef}
                                className="bg-white border-4 border-red-600 rounded-lg p-12 text-center shadow-lg"
                            >
                                {/* Certificate Header */}
                                <div className="mb-8">
                                    <div className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg mb-4 font-bold text-lg">
                                        HubIt
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificate of Completion</h1>
                                <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />

                                <p className="text-gray-700 text-lg mb-4">This is to certify that</p>
                                <h2 className="text-4xl font-bold text-red-600 mb-6 border-b-4 border-red-600 pb-3">{userName}</h2>

                                <p className="text-gray-700 text-lg mb-8">has successfully completed the course</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-12">{courseName}</h3>

                                <div className="mb-12 text-center">
                                    <div className="text-gray-900 mb-2">✓</div>
                                    <p className="text-sm text-gray-700 font-semibold">Verified by HubIt</p>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center mb-8">
                                    <div className="bg-white p-3 rounded-lg border-2 border-red-600">
                                        <QRCodeSVG
                                            value={`https://hubit.com/certificate/${userName}/${courseName}`}
                                            size={120}
                                            level="H"
                                            includeMargin={true}
                                            bgColor="#ffffff"
                                            fgColor="#dc2626"
                                        />
                                    </div>
                                </div>

                                <div className="text-sm text-gray-700 border-t border-gray-300 pt-4">
                                    <p>Certificate ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                    <p>Issued on {new Date().toLocaleDateString()}</p>
                                    <p className="font-bold mt-2">HubIt Online Learning Platform</p>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 font-bold py-3 px-4 rounded-lg transition"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Download size={20} />
                                    {isDownloading ? "Downloading..." : "Download Certificate"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
