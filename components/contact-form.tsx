"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const t = useTranslations("Index.contact.form")
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verify reCAPTCHA first
    if (!captchaVerified) {
      toast({
        title: t("error.captcha.title") || "Verification Required",
        description: t("error.captcha.message") || "Please verify that you are not a robot",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      toast({
        title: t("success.title"),
        description: t("success.message"),
      })
      
      // Clear form data
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      
      // Reset reCAPTCHA
      recaptchaRef.current?.reset()
      setCaptchaVerified(false)
      
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: t("error.title"),
        description: t("error.message"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Label htmlFor="name">{t("name.label")}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t("name.placeholder")}
          value={formData.name}
          onChange={handleChange}
          required
          className="transition-all focus:scale-[1.01]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Label htmlFor="email">{t("email.label")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("email.placeholder")}
          value={formData.email}
          onChange={handleChange}
          required
          className="transition-all focus:scale-[1.01]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Label htmlFor="subject">{t("subject.label")}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={t("subject.placeholder")}
          value={formData.subject}
          onChange={handleChange}
          required
          className="transition-all focus:scale-[1.01]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Label htmlFor="message">{t("message.label")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("message.placeholder")}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="transition-all focus:scale-[1.01]"
        />
      </motion.div>

      {/* reCAPTCHA component */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex justify-center"
      >
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaChange}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button 
          type="submit" 
          className="w-full transition-all hover:scale-[1.02]" 
          disabled={isSubmitting || !captchaVerified}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </motion.div>
    </form>
  )
}