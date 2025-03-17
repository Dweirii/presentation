"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ChevronDown,
  Server,
  Code,
  Database,
  Key,
  Layers,
  Terminal,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CodeBlock from "@/components/code-block"
import AnimatedSection from "@/components/animated-section"
import ParticleBackground from "@/components/particle-background"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

// Sample code snippets
const nodeCodeSnippet = `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`

const nextjsCodeSnippet = `// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js API route!' });
}`

const typescriptCodeSnippet = `// JavaScript
function addNumbers(a, b) {
  return a + b;
}

// TypeScript
function addNumbers(a: number, b: number): number {
  return a + b;
}`

const prismaCodeSnippet = `// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

// Query example
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  include: { posts: true },
});`

const sqlCodeSnippet = `-- Create a table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com');

-- Query data
SELECT * FROM users WHERE email = 'john@example.com';`

export default function BackendWorkshop() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    what: useRef<HTMLDivElement>(null),
    nodejs: useRef<HTMLDivElement>(null),
    nextjs: useRef<HTMLDivElement>(null),
    typescript: useRef<HTMLDivElement>(null),
    postgresql: useRef<HTMLDivElement>(null),
    prisma: useRef<HTMLDivElement>(null),
    setup: useRef<HTMLDivElement>(null),
    next: useRef<HTMLDivElement>(null),
  }

  const sections = [
    { id: "hero", label: "Home", icon: <Terminal className="h-4 w-4" /> },
    { id: "what", label: "What is Backend?", icon: <Server className="h-4 w-4" /> },
    { id: "nodejs", label: "Node.js", icon: <Layers className="h-4 w-4" /> },
    { id: "nextjs", label: "Next.js", icon: <Code className="h-4 w-4" /> },
    { id: "typescript", label: "TypeScript", icon: <Code className="h-4 w-4" /> },
    { id: "postgresql", label: "PostgreSQL", icon: <Database className="h-4 w-4" /> },
    { id: "prisma", label: "Prisma & Clerk", icon: <Key className="h-4 w-4" /> },
    { id: "setup", label: "Environment Setup", icon: <Terminal className="h-4 w-4" /> },
    { id: "next", label: "What's Next", icon: <ArrowRight className="h-4 w-4" /> },
  ]

  const scrollToSection = (id: string) => {
    sectionRefs[id as keyof typeof sectionRefs]?.current?.scrollIntoView({
      behavior: "smooth",
    })
    setActiveSection(id)
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of Object.keys(sectionRefs)) {
        const element = sectionRefs[section as keyof typeof sectionRefs].current
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
  <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <ParticleBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{
          width: progressWidth,
          opacity: progressOpacity,
        }}
      />

      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm p-4 md:hidden"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-2 w-full">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className={cn(
                  "justify-start transition-all duration-300",
                  activeSection === section.id && "bg-primary/20 text-primary border border-primary/30",
                )}
                onClick={() => scrollToSection(section.id)}
              >
                {section.icon}
                <span className="ml-2">{section.label}</span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeIndicatorMobile"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </Button>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Desktop Sidebar */}
      <SidebarProvider>
        <main className="w-screen mx-0 py-8 ">
          {/* Theme Toggle */}
          <div className="fixed top-4 right-4 z-50 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Hero Section */}
          <section
            ref={sectionRefs.hero}
            id="hero"
            className="min-h-[90vh] flex flex-col justify-center gap-x-10 items-center text-center py-20 w-full relative"
          >
            <div className="absolute inset-0 grid-pattern opacity-20 w-screen" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 inline-block"
              >
                <div className="p-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center space-x-2 mb-4 mx-auto w-fit">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Day 1 - Core Concepts</span>
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 glow-text">
                <span className="text-gradient">Mastering Backend Development</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Understanding the Core Concepts Before Writing Code
              </p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("what")}
                  className="group relative overflow-hidden bg-primary/90 hover:bg-primary transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Scroll Down to Learn
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-16 flex flex-wrap justify-center gap-4"
              >
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Server className="h-4 w-4 text-primary" />
                  <span>Server-side Logic</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Database Design</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4 text-primary" />
                  <span>API Development</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Key className="h-4 w-4 text-primary" />
                  <span>Authentication</span>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* What is Backend Development */}
          <AnimatedSection id="what" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Server className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">What is Backend Development?</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <p className="text-lg mb-4">
                    Backend development refers to the server-side of web development that focuses on how the website
                    works. It includes the architecture of the server, databases, APIs, and the logic that powers the
                    application.
                  </p>
                  <p className="text-lg mb-4">Backend developers are responsible for:</p>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Creating and managing APIs",
                      "Database design and management",
                      "Server-side logic implementation",
                      "Authentication and authorization",
                      "Performance optimization",
                      "Security implementation",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <div className="gradient-border p-6 h-full">
                    <div className="w-full max-w-md mx-auto">
                      <div className="flex flex-col items-center">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 w-full mb-4 text-center animate-float">
                          <p className="font-medium">Frontend (Client)</p>
                        </div>
                        <motion.div
                          className="h-10 w-0.5 bg-primary/30"
                          initial={{ height: 0 }}
                          animate={{ height: 40 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        />
                        <div
                          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 w-full mb-4 text-center animate-float"
                          style={{ animationDelay: "1s" }}
                        >
                          <p className="font-medium text-gradient">API (Communication Layer)</p>
                        </div>
                        <motion.div
                          className="h-10 w-0.5 bg-blue-500/30"
                          initial={{ height: 0 }}
                          animate={{ height: 40 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        />
                        <div
                          className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 w-full text-center animate-float"
                          style={{ animationDelay: "2s" }}
                        >
                          <p className="font-medium text-gradient-green">Backend (Server)</p>
                        </div>
                        <motion.div
                          className="h-10 w-0.5 bg-green-500/30"
                          initial={{ height: 0 }}
                          animate={{ height: 40 }}
                          transition={{ duration: 0.5, delay: 1 }}
                        />
                        <div
                          className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 w-full text-center animate-float"
                          style={{ animationDelay: "3s" }}
                        >
                          <p className="font-medium text-gradient-amber">Database</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* Node.js Fundamentals */}
          <AnimatedSection id="nodejs" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Layers className="h-5 w-5 text-green-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient-green">Node.js Fundamentals</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <p className="text-lg mb-4">
                    Node.js is a JavaScript runtime built on Chrome&apos;s V8 JavaScript engine that allows developers to run
                    JavaScript on the server-side.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-gradient-green">Key Features:</h3>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    {[
                      "Non-blocking, event-driven architecture",
                      "Asynchronous I/O operations",
                      "Single-threaded but highly scalable",
                      "Large ecosystem (npm)",
                      "JavaScript across the entire stack",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold mb-3 text-gradient-green">Non-blocking I/O:</h3>
                  <p className="text-muted-foreground">
                    Unlike traditional servers that block execution until an operation completes, Node.js continues
                    processing other requests while waiting for I/O operations to finish, making it highly efficient for
                    I/O-intensive applications.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <h3 className="text-xl font-semibold mb-3 text-gradient-green">Simple Express.js API Example:</h3>
                  <CodeBlock code={nodeCodeSnippet} language="javascript" fileName="server.js" />
                  <div className="mt-6 p-4 gradient-border">
                    <h4 className="font-medium mb-2 text-gradient-green">When to use Node.js:</h4>
                    <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                      {[
                        "Real-time applications (chat, gaming)",
                        "API servers and microservices",
                        "Single-page applications",
                        "Streaming applications",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          className="flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* Next.js for Backend */}
          <AnimatedSection id="nextjs" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Code className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">Next.js for Backend</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <p className="text-lg mb-4">
                    Next.js is a React framework that enables server-side rendering and static site generation, but it
                    also provides powerful backend capabilities.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-gradient">Why use Next.js for backend:</h3>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    {[
                      "Unified codebase for frontend and backend",
                      "Built-in API routes",
                      "Server Components for server-side logic",
                      "Middleware for request processing",
                      "Simplified deployment with Vercel",
                      "TypeScript integration",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="p-4 gradient-border">
                    <h4 className="font-medium mb-2 text-gradient">App Router vs Pages Router:</h4>
                    <p className="text-sm text-muted-foreground">
                      The App Router is the newer, recommended approach that uses React Server Components and provides
                      more flexibility for building complex applications.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <h3 className="text-xl font-semibold mb-3 text-gradient">API Routes with App Router:</h3>
                  <CodeBlock code={nextjsCodeSnippet} language="typescript" fileName="app/api/hello/route.ts" />
                  <div className="mt-6">
                    <h4 className="font-medium mb-2 text-gradient">File-based Routing:</h4>
                    <div className="gradient-border p-4 text-sm font-mono">
                      <p className="mb-2 font-medium text-gradient">API Route Structure:</p>
                      <pre className="text-muted-foreground">
                        app/
                        <br/> 
                         ├── api/
                        <br/>
                         ├── users<br/>
                          │ <br />
                          │ ├─ route.ts {/* GET, POST /api/users */}<br/>
                          │ ├── users/[id]<br/>
                          └─ route.ts {/* GET, PUT, DELETE /api/users/:id */}<br/>
                          │ └── auth/ <br/>
                          │ └── route.ts{" "}
                        {/* POST /api/auth */}
                      </pre>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* TypeScript Explained */}
          <AnimatedSection  id="typescript" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Code className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">TypeScript Explained</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <p className="text-lg mb-4">
                    TypeScript is a strongly typed programming language that builds on JavaScript, giving you better
                    tooling at any scale.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-gradient">Why TypeScript over JavaScript:</h3>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    {[
                      "Static type checking catches errors during development",
                      "Better IDE support with autocompletion",
                      "Improved code documentation",
                      "Enhanced refactoring capabilities",
                      "Scales better for large applications",
                      "Interfaces and type definitions",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="p-4 gradient-border">
                    <h4 className="font-medium mb-2 text-gradient">TypeScript in Backend:</h4>
                    <p className="text-sm text-muted-foreground">
                      TypeScript helps define clear contracts between different parts of your backend, making it easier
                      to understand how data flows through your application.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <h3 className="text-xl font-semibold mb-3 text-gradient">JavaScript vs TypeScript:</h3>
                  <CodeBlock code={typescriptCodeSnippet} language="typescript" fileName="example.ts" />
                  <div className="mt-6 space-y-4">
                    <div className="gradient-border p-4">
                      <h4 className="font-medium mb-2 text-gradient">Common TypeScript Types:</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground w-full ">
                        {[
                          "<code>string</code>, <code>number</code>, <code>boolean</code>",
                          "<code>array</code>:  <code>Array&lt;string&gt;</code>",
                          "<code> object </code>: <code> { name: string, age: number }</code>",
                          "<code>union</code>: <code>string | number</code>",
                          "<code>interface</code> and <code>type</code> for custom types",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                            className="flex items-start"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        ))}
                      </ul>
                    </div>
                    <div className="gradient-border p-4">
                      <h4 className="font-medium mb-2 text-gradient">TypeScript Benefits:</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                        {["Self-documenting", "Fewer bugs", "Better tooling", "Code navigation"].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            className="flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* PostgreSQL & Database Concepts */}
          <AnimatedSection  id="postgresql" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Database className="h-5 w-5 text-amber-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient-amber">PostgreSQL & Database Concepts</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <p className="text-lg mb-4">
                    PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active
                    development.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-gradient-amber">Why PostgreSQL:</h3>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    {[
                      "ACID compliance (Atomicity, Consistency, Isolation, Durability)",
                      "Advanced data types (JSON, Arrays, Geometric)",
                      "Robust performance for complex queries",
                      "Extensibility and custom functions",
                      "Strong community and documentation",
                      "Enterprise-grade reliability",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="p-4 gradient-border">
                    <h4 className="font-medium mb-2 text-gradient-amber">ACID Properties:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "<strong>Atomicity:</strong> Transactions are all-or-nothing",
                        "<strong>Consistency:</strong> Database remains in a valid state",
                        "<strong>Isolation:</strong> Transactions don't interfere with each other",
                        "<strong>Durability:</strong> Committed data is permanently stored",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          className="flex items-start"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <h3 className="text-xl font-semibold mb-3 text-gradient-amber">Basic SQL Examples:</h3>
                  <CodeBlock code={sqlCodeSnippet} language="sql" fileName="example.sql" />
                  <div className="mt-6 space-y-4">
                    <div className="gradient-border p-4">
                      <h4 className="font-medium mb-2 text-gradient-amber">Database Design Concepts:</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {[
                          "Normalization (reducing data redundancy)",
                          "Primary and foreign keys",
                          "Indexes for query performance",
                          "Relationships (one-to-one, one-to-many, many-to-many)",
                          "Constraints (unique, not null, check)",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                            className="flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-amber-500" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="gradient-border p-4">
                      <h4 className="font-medium mb-2 text-gradient-amber">PostgreSQL JSON Support:</h4>
                      <p className="text-sm text-muted-foreground">
                        PostgreSQL offers robust JSON and JSONB data types, allowing you to store and query JSON data
                        efficiently, combining the flexibility of NoSQL with the reliability of a relational database.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* Prisma & Clerk Overview */}
          <AnimatedSection id="prisma" className="py-16 scroll-mt-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Key className="h-5 w-5 text-purple-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">Prisma & Clerk Overview</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection delay={0.2} direction="left">
                  <h3 className="text-xl font-semibold mb-3 text-gradient">Prisma ORM:</h3>
                  <p className="text-lg mb-4">
                    Prisma is a next-generation ORM that simplifies database access with type-safe queries and an
                    intuitive data model.
                  </p>
                  <h4 className="font-medium mb-2 text-gradient">Key Features:</h4>
                  <ul className="space-y-3 text-muted-foreground mb-4">
                    {[
                      "Type-safe database queries",
                      "Auto-generated migrations",
                      "Intuitive data modeling",
                      "Powerful query engine",
                      "Supports multiple databases",
                      "Built-in data validation",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="p-4 gradient-border">
                    <h4 className="font-medium mb-2 text-gradient">Prisma Workflow:</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "Define your data model in schema.prisma",
                        "Generate the Prisma client",
                        "Use the client to query your database",
                        "Migrate your database when the schema changes",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          className="flex items-center"
                        >
                          <span className="flex items-center justify-center mr-2 h-5 w-5 rounded-full bg-purple-500/20 text-purple-500 text-xs">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <h3 className="text-xl font-semibold mb-3 text-gradient">Prisma Schema & Queries:</h3>
                  <CodeBlock code={prismaCodeSnippet} language="typescript" fileName="schema.prisma" />
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gradient">Clerk Authentication:</h3>
                    <p className="mb-4 text-muted-foreground">
                      Clerk is a complete authentication and user management solution that provides:
                    </p>
                    <div className="gradient-border p-4">
                      <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                        {[
                          "User sign-up and login",
                          "Multi-factor authentication",
                          "Social login providers",
                          "Session management",
                          "User profile management",
                          "Role-based access control",
                          "Easy integration with Next.js",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                            className="flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-purple-500" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>

          {/* Setting Up the Environment */}
          <AnimatedSection id="setup" className="py-16 scroll-mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Terminal className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">Setting Up the Environment</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "1. Install Node.js",
                    description:
                      "Download and install Node.js from <a href='https://nodejs.org' class='text-primary hover:underline' target='_blank' rel='noopener noreferrer'>nodejs.org</a> or use a version manager like nvm.",
                    code: "# Using nvm (recommended)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash\nnvm install 20\nnvm use 20\n\n# Verify installation\nnode --version\nnpm --version\n#Access Error?\n#Run this command on your terminal\nSet-ExecutionPolicy Unrestricted -Scope CurrentUser",
                  },
                  {
                    title: "2. Install PostgreSQL",
                    description:
                      "Download and install PostgreSQL from <a href='https://www.postgresql.org/download/' class='text-primary hover:underline' target='_blank' rel='noopener noreferrer'>postgresql.org</a> or use Docker.",
                    code: "# Using Docker\ndocker pull postgres\ndocker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres",
                  },
                  {
                    title: "3. Create a Next.js Project",
                    description: "Set up a new Next.js project with TypeScript and Tailwind CSS.",
                    code: "# Create a new Next.js project\nnpx create-next-app@latest my-backend-app\ncd my-backend-app\n\n# During setup, select:\n# - Yes for TypeScript\n# - Yes for ESLint\n# - Yes for Tailwind CSS\n# - Yes for App Router\n# - No for src/ directory\n# - No for import alias (@/*)",
                  },
                  {
                    title: "4. Set Up Prisma",
                    description: "Install and initialize Prisma in your project.",
                    code: '# Install Prisma\nnpm install prisma\nnpx prisma init\n\n# Update DATABASE_URL in .env file\n# DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"\n\n# After creating your schema\nnpx prisma generate\nnpx prisma db push',
                  },
                  {
                    title: "5. Set Up Clerk",
                    description: "Install and configure Clerk for authentication.",
                    code: "# Install Clerk\nnpm install @clerk/nextjs\n\n# Add environment variables to .env.local\n# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...\n# CLERK_SECRET_KEY=sk_test_...\n\n# Set up Clerk in your app\n# See documentation at: https://clerk.com/docs/nextjs/get-started-with-nextjs",
                  },
                ].map((step, index) => (
                  <AnimatedSection
                    key={index}
                    delay={0.2 + index * 0.1}
                    direction={index % 2 === 0 ? "left" : "right"}
                    className="gradient-border p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gradient">{step.title}</h3>
                    <p className="mb-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: step.description }} />
                    <div className="code-window">
                      <div className="code-content">
                        <SyntaxHighlighter
                          language="bash"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            fontFamily: "var(--font-mono)",
                            background: "#1e1e1e",
                          }}
                        >
                          {step.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* What's Next */}
          <AnimatedSection id="next" className="py-16 scroll-mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <ArrowRight className="h-5 w-5 text-green-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient-green">What&apos;s Next?</h2>
              </div>

              <AnimatedSection delay={0.2} direction="up" className="gradient-border p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gradient-green">Recap of What We&apos;ve Learned</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                  {[
                    "Backend development fundamentals and architecture",
                    "Node.js and its non-blocking, event-driven nature",
                    "Next.js for full-stack development",
                    "TypeScript for type-safe code",
                    "PostgreSQL and relational database concepts",
                    "Prisma ORM for database access",
                    "Clerk for authentication and user management",
                    "Environment setup for backend development",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.4} direction="up" className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gradient-green">Get Ready for Hands-On Coding Tomorrow!</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Tomorrow we&apos;ll start building a real backend application with all the technologies we&apos;ve discussed
                  today.
                </p>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-green-500/90 hover:bg-green-500 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Prepare Your Development Environment
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>

                <div className="mt-12 flex justify-center">
                  <a
                    href="https://workspace.learnifyjo.com/preview/j57evjfzstsx54qxry2vfmj67s7c7r6j"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View additional resources
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </main>
      </SidebarProvider>
    </div>
  )
}

