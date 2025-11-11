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
    const [isHDMode, setIsHDMode] = useState(false)
    const [certificateId] = useState(Math.random().toString(36).substring(2, 10).toUpperCase())

    if (!isOpen) return null

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        setIsDownloading(true);

        try {
            // Switch to HD mode
            setIsHDMode(true);

            // Wait for the DOM to update with HD styles
            await new Promise(resolve => setTimeout(resolve, 100));

            // Get the certificate element
            const node = certificateRef.current;

            // Configure for high quality output
            const config = {
                quality: 1.0,
                pixelRatio: 2
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

            // Switch back to mobile view
            setIsHDMode(false);

        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to download certificate. Please try again.');
            setIsHDMode(false);
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
                                className="bg-white rounded-lg text-center shadow-lg"
                                style={{
                                    border: '4px solid #dc2626',
                                    width: isHDMode ? '1200px' : 'auto',
                                    padding: isHDMode ? '80px' : '24px',
                                    position: isHDMode ? 'fixed' : 'relative',
                                    left: isHDMode ? '-9999px' : 'auto',
                                    top: isHDMode ? '0' : 'auto'
                                }}
                            >
                                {/* Certificate Header */}
                                <div style={{ marginBottom: isHDMode ? '48px' : '24px' }}>
                                    <div
                                        className="inline-block px-4 py-2 rounded-lg font-bold"
                                        style={{
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            fontSize: isHDMode ? '28px' : '18px',
                                            marginBottom: isHDMode ? '24px' : '16px'
                                        }}
                                    >
                                        HubIt
                                    </div>
                                </div>

                                <h1
                                    className="font-bold"
                                    style={{
                                        color: '#111827',
                                        fontSize: isHDMode ? '56px' : '28px',
                                        marginBottom: isHDMode ? '16px' : '8px'
                                    }}
                                >
                                    Certificate of Completion
                                </h1>
                                <div
                                    className="mx-auto"
                                    style={{
                                        width: isHDMode ? '144px' : '72px',
                                        height: isHDMode ? '6px' : '3px',
                                        backgroundColor: '#dc2626',
                                        marginBottom: isHDMode ? '48px' : '24px'
                                    }}
                                />

                                <p
                                    style={{
                                        color: '#374151',
                                        fontSize: isHDMode ? '28px' : '16px',
                                        marginBottom: isHDMode ? '24px' : '12px'
                                    }}
                                >
                                    This is to certify that
                                </p>
                                <h2
                                    className="font-bold"
                                    style={{
                                        color: '#dc2626',
                                        borderBottom: isHDMode ? '6px solid #dc2626' : '3px solid #dc2626',
                                        fontSize: isHDMode ? '56px' : '28px',
                                        marginBottom: isHDMode ? '36px' : '18px',
                                        paddingBottom: isHDMode ? '18px' : '9px'
                                    }}
                                >
                                    {userName}
                                </h2>

                                <p
                                    style={{
                                        color: '#374151',
                                        fontSize: isHDMode ? '28px' : '16px',
                                        marginBottom: isHDMode ? '48px' : '24px'
                                    }}
                                >
                                    has successfully completed the course
                                </p>
                                <h3
                                    className="font-bold"
                                    style={{
                                        color: '#111827',
                                        fontSize: isHDMode ? '36px' : '20px',
                                        marginBottom: isHDMode ? '72px' : '36px'
                                    }}
                                >
                                    {courseName}
                                </h3>

                                <div
                                    className="text-center"
                                    style={{ marginBottom: isHDMode ? '72px' : '36px' }}
                                >
                                    <div
                                        style={{
                                            color: '#111827',
                                            fontSize: isHDMode ? '36px' : '24px',
                                            marginBottom: isHDMode ? '12px' : '8px'
                                        }}
                                    >
                                        ✓
                                    </div>
                                    <p
                                        className="font-semibold"
                                        style={{
                                            color: '#374151',
                                            fontSize: isHDMode ? '20px' : '14px'
                                        }}
                                    >
                                        Verified by HubIt
                                    </p>
                                </div>

                                {/* QR Code */}
                                <div
                                    className="flex justify-center"
                                    style={{ marginBottom: isHDMode ? '48px' : '24px' }}
                                >
                                    <div className="bg-white rounded-lg" style={{ border: '2px solid #dc2626', padding: isHDMode ? '18px' : '12px' }}>
                                        <QRCodeSVG
                                            value={verificationUrl}
                                            size={isHDMode ? 220 : 120}
                                            level="H"
                                            includeMargin={true}
                                            bgColor="#ffffff"
                                            fgColor="#dc2626"
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color: '#374151',
                                        borderTop: '1px solid #d1d5db',
                                        paddingTop: isHDMode ? '24px' : '12px',
                                        fontSize: isHDMode ? '20px' : '14px'
                                    }}
                                >
                                    <p style={{ marginBottom: isHDMode ? '8px' : '4px' }}>Certificate ID: {certificateId}</p>
                                    <p style={{ marginBottom: isHDMode ? '8px' : '4px' }}>Issued on {new Date().toLocaleDateString()}</p>
                                    <p className="font-bold" style={{ marginTop: isHDMode ? '12px' : '8px', marginBottom: isHDMode ? '12px' : '8px' }}>HubIt Online Learning Platform</p>
                                    <p style={{ color: '#6b7280', fontSize: isHDMode ? '16px' : '12px', marginTop: isHDMode ? '12px' : '8px' }}>Scan QR code to verify certificate</p>
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