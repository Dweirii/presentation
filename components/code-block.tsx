"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CodeBlockProps {
  code: string
  language: string
  fileName?: string
}

export default function CodeBlock({ code, language, fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentElement = document.getElementById(`code-block-${language}-${code.substring(0, 20).replace(/\s/g, "")}`)
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [code, language])

  return (
    <motion.div
      id={`code-block-${language}-${code.substring(0, 20).replace(/\s/g, "")}`}
      className="relative rounded-md overflow-hidden code-window gradient-border"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {fileName && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#2d2d2d] flex items-center px-10 z-10 text-xs text-gray-400 font-mono">
          {fileName}
        </div>
      )}
      <div className="absolute right-2 top-2 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/50 transition-all duration-200"
          onClick={copyToClipboard}
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="code-content">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontFamily: "var(--font-mono)",
            background: "#1e1e1e",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  )
}

