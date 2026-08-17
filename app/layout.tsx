import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam, Permanent_Marker } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-permanent-marker",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});


export const metadata: Metadata = {
  title: "Adhithya | Frontend Developer & React Architect",
  description: "Explore the professional developer portfolio of Adhithya, a Frontend and Software Engineer specializing in React, Next.js, TypeScript, and Spring Boot architectures.",
  keywords: "Adhithya, Frontend Developer, React Developer, Next.js Developer, Software Engineer, Portfolio, India, Spring Boot, Node.js",
  authors: [{ name: "Adhithya" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${permanentMarker.variable} ${kalam.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Adhithya",
              "url": "https://github.com/Adhis2003",
              "jobTitle": "Frontend Developer",
              "sameAs": [
                "https://www.linkedin.com/in/adhithya-frontend-developer/",
                "https://github.com/Adhis2003"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
