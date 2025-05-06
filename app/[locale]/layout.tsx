import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ThemeToggle from "@/components/theme-toggle"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "Baran Dolapci" }],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://bdolapci.github.io",
      siteName: t("ogSiteName"),
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: "https://bdolapci.github.io",
      languages: {
        en: "/en",
        de: "/de",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }]
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale;
  
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="fixed top-4 left-4 z-50">
              <ThemeToggle />
            </div>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}