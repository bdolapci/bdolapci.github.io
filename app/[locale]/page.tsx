"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "@/components/contact-form";
import LanguageSwitcher from "@/components/language-switcher";
import { useState, useEffect, type ReactNode } from "react";
import emailjs from "@emailjs/browser";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

function AnimatedSection({ children, delay = 0.1 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const t = useTranslations("Index");
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);
    
  const scrollToContent = () => {
    document.getElementById("main-content")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const navigateToContact = () => {
    setActiveTab("contact");
    setTimeout(() => {
      document.getElementById("main-content")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };
  const backgroundElements = Array.from({ length: 20 }).map(() => ({
    width: Math.random() * 100 + 50,
    height: Math.random() * 100 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    yMovement: Math.random() * 100 - 50,
    xMovement: Math.random() * 100 - 50,
    duration: Math.random() * 10 + 10,
  }));
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section with Animation */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Baran Dolapci
            </motion.h1>

            <motion.p
              className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("role")}
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="https://linkedin.com/in/baran-dolapc%C4%B1"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 transition-transform hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="https://github.com/bdolapci" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 transition-transform hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Button
                className="rounded-full px-6 transition-transform hover:scale-105"
                onClick={navigateToContact}
              >
                {t("contactMe")}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient &&
            backgroundElements.map((elem, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gray-200 dark:bg-gray-700 opacity-20"
                style={{
                  width: elem.width,
                  height: elem.height,
                  left: elem.left,
                  top: elem.top,
                }}
                animate={{
                  y: [0, elem.yMovement],
                  x: [0, elem.xMovement],
                }}
                transition={{
                  duration: elem.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          onClick={scrollToContent}
        >
          <ChevronDown className="h-8 w-8 text-gray-600 dark:text-gray-300" />
        </motion.div>
      </section>

      {/* Main Content */}
      <section
        id="main-content"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto">
            <TabsTrigger
              value="experience"
              className="text-base sm:text-lg py-3 px-2 h-auto flex items-center justify-center"
            >
              {t("tabs.experience")}
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="text-base sm:text-lg py-3 px-2 h-auto flex items-center justify-center"
            >
              {t("tabs.skills")}
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-base sm:text-lg py-3 px-2 h-auto flex items-center justify-center"
            >
              {t("tabs.education")}
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-base sm:text-lg py-3 px-2 h-auto flex items-center justify-center"
            >
              {t("tabs.projects")}
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="text-base sm:text-lg py-3 px-2 h-auto flex items-center justify-center"
            >
              {t("tabs.contact")}
            </TabsTrigger>
          </TabsList>

          {/* Experience Tab */}
          <TabsContent value="experience" className="mt-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("experience.title")}
              </h2>
              <div className="space-y-12">
                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {t("experience.job1.title")}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job1.period")}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {t("experience.job1.company")}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job1.location")}
                        </div>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>{t("experience.job1.description1")}</li>
                        <li>{t("experience.job1.description2")}</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {t("experience.job2.title")}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job2.period")}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {t("experience.job2.company")}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job2.location")}
                        </div>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>{t("experience.job2.description1")}</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {t("experience.job3.title")}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job3.period")}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div className="text-gray-700 dark:text-gray-300">
                          {t("experience.job3.company")}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("experience.job3.location")}
                        </div>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>{t("experience.job3.description1")}</li>
                        <li>{t("experience.job3.description2")}</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("skills.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-6">
                        {t("skills.technical.title")}
                      </h3>
                      <div className="space-y-4">
                        <ul className="space-y-3 list-disc pl-5">
                          {[
                            t("skills.technical.items.database"),
                            t("skills.technical.items.dotnet"),
                            t("skills.technical.items.java"),
                            t("skills.technical.items.agile"),
                            t("skills.technical.items.frontend"),
                            t("skills.technical.items.mern"),
                            t("skills.technical.items.git"),
                            t("skills.technical.items.cloud"),
                            t("skills.technical.items.docker"),
                          ].map((skill, index) => (
                            <li
                              key={index}
                              className="text-gray-800 dark:text-gray-200"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {t("skills.languages.title")}
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>{t("skills.languages.english.name")}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t("skills.languages.english.level")}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="bg-gray-800 dark:bg-gray-300 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: "90%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>{t("skills.languages.german.name")}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t("skills.languages.german.level")}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="bg-gray-800 dark:bg-gray-300 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: "75%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>{t("skills.languages.turkish.name")}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {t("skills.languages.turkish.level")}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="bg-gray-800 dark:bg-gray-300 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {t("skills.interests.title")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["webDev", "cloudDev", "systemDesign"].map(
                          (interest) => (
                            <motion.div
                              key={interest}
                              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                              whileHover={{ scale: 1.03 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <div className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-200"></div>
                              <span>
                                {t(`skills.interests.items.${interest}`)}
                              </span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="mt-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("education.title")}
              </h2>
              <div className="space-y-12">
                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {t("education.degree1.title")}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("education.degree1.period")}
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 mb-2">
                        {t("education.degree1.institution")}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("education.degree1.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                  <Card className="transform transition-all hover:scale-[1.01]">
                    <CardContent className="pt-6">
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          {t("education.degree2.title")}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400">
                          {t("education.degree2.period")}
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 mb-2">
                        {t("education.degree2.institution")}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("education.degree2.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("projects.title")}
              </h2>
              <div className="space-y-8">
                {[
                  "project1",
                  "project2",
                  "project3",
                  "project4",
                  "project5",
                  "project6",
                ].map((project, index) => (
                  <motion.div
                    key={project}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden transform transition-all hover:scale-[1.01]">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {t(`projects.${project}.title`)}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {t(`projects.${project}.description`)}
                        </p>

                        {(() => {
                          try {
                            t(`projects.${project}.title`);

                            const outcomesKey = `projects.${project}.outcomes`;
                            const outcomes = t.raw(outcomesKey);

                            if (
                              Array.isArray(outcomes) &&
                              outcomes.length > 0
                            ) {
                              return (
                                <div className="mb-4">
                                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Key Outcomes:
                                  </h4>
                                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    {outcomes.map((outcome, i) => (
                                      <li key={i}>{outcome}</li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            }
                            return null;
                          } catch (error) {
                            console.error(
                              `Error rendering outcomes for ${project}:`,
                              error
                            );
                            return null;
                          }
                        })()}

                        {/* Project Link */}
                        {t(`projects.${project}.link`) && (
                          <Link
                            href={t(`projects.${project}.link`)}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mt-2"
                            target="_blank"
                          >
                            <span>View Project Github</span>
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Upcoming Projects Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6">
                    {t("projects.upcoming.title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["upcoming1", "upcoming2", "upcoming3"].map(
                      (project, index) => (
                        <motion.div
                          key={project}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card className="h-full overflow-hidden transform transition-all hover:scale-[1.01] border-dashed border-2">
                            <CardContent className="pt-6">
                              <div className="inline-block px-3 py-1 mb-3 text-sm bg-gray-100 dark:bg-gray-800 rounded-full">
                                {t("projects.upcoming.comingSoon")}
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {t(`projects.upcoming.${project}.title`)}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300">
                                {t(`projects.upcoming.${project}.description`)}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" id="contact" className="mt-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t("contact.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="transform transition-all hover:scale-[1.01]">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-6">
                      {t("contact.info.title")}
                    </h3>
                    <div className="space-y-6">
                      <motion.div
                        className="flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <a
                          href="mailto:barandolapci@hotmail.com"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          barandolapci@hotmail.com
                        </a>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <a
                          href="tel:+4917151340430"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          +49 171 5134043
                        </a>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Wiesbaden, Germany
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <a
                          href="https://linkedin.com/in/baran-dolapc%C4%B1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          linkedin.com/in/baran-dolapc%C4%B1
                        </a>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                          <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <a
                          href="https://github.com/bdolapci"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          github.com/bdolapci
                        </a>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="transform transition-all hover:scale-[1.01]">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-6">
                      {t("contact.form.title")}
                    </h3>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
