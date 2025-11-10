"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

// Separate component that uses useSearchParams
function VerifyCertificateContent() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    const [certificateData, setCertificateData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const verifyCertificate = async () => {
            try {
                setLoading(true)
                const certificateId = searchParams.get('id')
                const email = searchParams.get('email')
                const course = searchParams.get('course')

                if (!certificateId || !email || !course) {
                    setError("Invalid verification link")
                    setVerified(false)
                    return
                }

                // Call API to verify certificate
                const response = await fetch(`/api/verify-certificate?id=${certificateId}&email=${encodeURIComponent(email)}&course=${encodeURIComponent(course)}`)

                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setVerified(true)
                        setCertificateData({
                            certificateId,
                            email,
                            course,
                            issuedDate: data.issuedDate || new Date().toLocaleDateString(),
                            userName: data.userName || "Certificate Holder"
                        })
                    } else {
                        setError(data.message || "Certificate verification failed")
                        setVerified(false)
                    }
                } else {
                    setError("Unable to verify certificate")
                    setVerified(false)
                }
            } catch (err) {
                console.error("Verification error:", err)
                setError("An error occurred during verification")
                setVerified(false)
            } finally {
                setLoading(false)
            }
        }

        verifyCertificate()
    }, [searchParams])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#dc2626' }} />
                    <p className="text-lg font-semibold" style={{ color: '#374151' }}>Verifying Certificate...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-8" style={{ border: `2px solid ${verified ? '#16a34a' : '#dc2626'}` }}>
                <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                        {verified ? (
                            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
                                <CheckCircle className="w-12 h-12" style={{ color: '#16a34a' }} />
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                                <XCircle className="w-12 h-12" style={{ color: '#dc2626' }} />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
                            {verified ? "Certificate Verified" : "Verification Failed"}
                        </h1>
                        <p className="text-lg" style={{ color: '#6b7280' }}>
                            {verified ? "This certificate is authentic and valid" : (error || "Unable to verify this certificate")}
                        </p>
                    </div>

                    {/* Certificate Details */}
                    {verified && certificateData && (
                        <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 mt-1" style={{ color: '#dc2626' }} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Certificate ID</p>
                                    <p className="text-base font-mono" style={{ color: '#111827' }}>{certificateData.certificateId}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 mt-1" style={{ color: '#dc2626' }} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Course Name</p>
                                    <p className="text-base" style={{ color: '#111827' }}>{certificateData.course}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 mt-1" style={{ color: '#dc2626' }} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Recipient Email</p>
                                    <p className="text-base" style={{ color: '#111827' }}>{certificateData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 mt-1" style={{ color: '#dc2626' }} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Issue Date</p>
                                    <p className="text-base" style={{ color: '#111827' }}>{certificateData.issuedDate}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 mt-1" style={{ color: '#dc2626' }} />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold" style={{ color: '#6b7280' }}>Issued By</p>
                                    <p className="text-base font-semibold" style={{ color: '#111827' }}>HubIt Online Learning Platform</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-4">
                        <Link href="/courses">
                            <button className="font-bold py-3 px-8 rounded-lg transition" style={{ backgroundColor: '#dc2626', color: 'white' }}>
                                {verified ? "Explore More Courses" : "Return to Courses"}
                            </button>
                        </Link>
                    </div>
                </div>
            </Card>

            {/* Additional Info */}
            <div className="mt-8 text-center">
                <p className="text-sm" style={{ color: '#6b7280' }}>
                    All certificates issued by HubIt are digitally signed and can be verified through this page.
                </p>
            </div>
        </div>
    )
}

// Main component with Suspense boundary
export default function VerifyCertificatePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm" style={{ borderBottom: '2px solid #dc2626' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{ backgroundColor: '#dc2626', color: 'white' }}>
                                H
                            </div>
                            <span className="text-xl font-bold" style={{ color: '#111827' }}>HubIt</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content wrapped in Suspense */}
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <div className="text-center">
                        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#dc2626' }} />
                        <p className="text-lg font-semibold" style={{ color: '#374151' }}>Loading...</p>
                    </div>
                </div>
            }>
                <VerifyCertificateContent />
            </Suspense>
        </main>
    )
}