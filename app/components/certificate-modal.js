"use client"

import { useState, useRef } from "react"
import domtoimage from 'dom-to-image-more';
import { X, Download } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"

export function CertificateModal({ isOpen, onClose, courseName, userEmail }) {
    const [userName, setUserName] = useState("")
    const [showCertificate, setShowCertificate] = useState(false)
    const certificateRef = useRef()
    const [isDownloading, setIsDownloading] = useState(false)
    const [certificateId] = useState(Math.random().toString(36).substring(2, 10).toUpperCase())

    if (!isOpen) return null

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        setIsDownloading(true);

        try {
            // Get the certificate element
            const node = certificateRef.current;

            // Set a fixed width for HD output (1920px for Full HD)
            const hdWidth = 1920;
            const scale = hdWidth / node.offsetWidth;

            // Configure for high quality output
            const config = {
                quality: 1.0,
                width: hdWidth,
                height: node.offsetHeight * scale,
                style: {
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${node.offsetWidth}px`,
                    height: `${node.offsetHeight}px`
                },
                pixelRatio: 2 // Higher pixel ratio for better quality
            };

            // Generate high-quality PNG
            const dataUrl = await domtoimage.toPng(node, config);

            // Create and trigger download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${userName.replace(/\s+/g, '_')}_${courseName.replace(/\s+/g, '_')}_certificate.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to download certificate. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleGenerate = () => {
        if (userName.trim()) {
            setShowCertificate(true)
        }
    }

    const handleBack = () => {
        setShowCertificate(false)
        setUserName("")
    }

    // Create verification URL
    const verificationUrl = `https://courses.hubit.agency/verify-certificate?id=${certificateId}&email=${encodeURIComponent(userEmail)}&course=${encodeURIComponent(courseName)}`

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" style={{ border: '4px solid #dc2626' }}>
                {/* Header */}
                <div className="sticky top-0 p-6 flex justify-between items-center" style={{ backgroundColor: '#dc2626', color: 'white' }}>
                    <h2 className="text-2xl font-bold">Congratulations!</h2>
                    <button onClick={onClose} className="p-2 rounded-lg transition" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                        <X size={24} style={{ color: 'white' }} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 bg-white">
                    {!showCertificate ? (
                        // Input Name
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#111827' }}>Enter Your Name</h3>
                                <p className="mb-4" style={{ color: '#4b5563' }}>Your name will appear on your certificate</p>
                                <Input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full"
                                    style={{ borderWidth: '2px', borderColor: '#dc2626', color: '#111827' }}
                                />
                            </div>
                            <button
                                onClick={handleGenerate}
                                disabled={!userName.trim()}
                                className="w-full font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: userName.trim() ? '#dc2626' : '#9ca3af',
                                    color: 'white'
                                }}
                            >
                                Generate Certificate
                            </button>
                        </div>
                    ) : (
                        // Certificate Display
                        <div className="space-y-6">
                            <div
                                ref={certificateRef}
                                data-certificate="true"
                                className="bg-white rounded-lg p-12 text-center shadow-lg"
                                style={{
                                    border: '4px solid #dc2626',
                                    minWidth: '800px' // Ensures consistent base size for scaling
                                }}
                            >
                                {/* Certificate Header */}
                                <div className="mb-8">
                                    <div className="inline-block px-4 py-2 rounded-lg mb-4 font-bold text-lg" style={{ backgroundColor: '#dc2626', color: 'white' }}>
                                        HubIt
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold mb-2" style={{ color: '#111827' }}>Certificate of Completion</h1>
                                <div className="mx-auto mb-8" style={{ width: '96px', height: '4px', backgroundColor: '#dc2626' }} />

                                <p className="text-lg mb-4" style={{ color: '#374151' }}>This is to certify that</p>
                                <h2 className="text-4xl font-bold mb-6 pb-3" style={{ color: '#dc2626', borderBottom: '4px solid #dc2626' }}>{userName}</h2>

                                <p className="text-lg mb-8" style={{ color: '#374151' }}>has successfully completed the course</p>
                                <h3 className="text-2xl font-bold mb-12" style={{ color: '#111827' }}>{courseName}</h3>

                                <div className="mb-12 text-center">
                                    <div className="mb-2" style={{ color: '#111827', fontSize: '24px' }}>✓</div>
                                    <p className="text-sm font-semibold" style={{ color: '#374151' }}>Verified by HubIt</p>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center mb-8">
                                    <div className="bg-white p-3 rounded-lg" style={{ border: '2px solid #dc2626' }}>
                                        <QRCodeSVG
                                            value={verificationUrl}
                                            size={120}
                                            level="H"
                                            includeMargin={true}
                                            bgColor="#ffffff"
                                            fgColor="#dc2626"
                                        />
                                    </div>
                                </div>

                                <div className="text-sm pt-4" style={{ color: '#374151', borderTop: '1px solid #d1d5db' }}>
                                    <p>Certificate ID: {certificateId}</p>
                                    <p>Issued on {new Date().toLocaleDateString()}</p>
                                    <p className="font-bold mt-2">HubIt Online Learning Platform</p>
                                    <p className="text-xs mt-2" style={{ color: '#6b7280' }}>Scan QR code to verify certificate</p>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 font-bold py-3 px-4 rounded-lg transition"
                                    style={{
                                        border: '2px solid #dc2626',
                                        color: '#dc2626',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="flex-1 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#dc2626', color: 'white' }}
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