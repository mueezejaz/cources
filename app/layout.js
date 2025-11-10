import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react"; // ✅ Lucide icon

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Operating Systems (OS) Course | Hub IT Courses",
  description:
    "Master fundamental OS concepts with Hub IT Courses. Our comprehensive Operating Systems course covers processes, memory management, file systems, and more. Enroll today!",
};

export default function RootLayout({ children }) {
  const whatsappNumber = "03064883325"; // <-- replace with your WhatsApp number (no + or spaces)
  const whatsappMessage = encodeURIComponent("I have problem with your website course.hubit.agency");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}

          {/* ✅ Floating WhatsApp Button (Lucide Icon) */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </body>
      </html>
    </ClerkProvider>
  );
}
