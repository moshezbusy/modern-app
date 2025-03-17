import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      title: 'TypeScript',
      description: 'Built with TypeScript for type-safe development',
      icon: CheckCircle,
    },
    {
      title: 'Next.js 14',
      description: 'Using the latest features of Next.js framework',
      icon: CheckCircle,
    },
    {
      title: 'Tailwind CSS',
      description: 'Modern utility-first CSS framework',
      icon: CheckCircle,
    },
    {
      title: 'Authentication',
      description: 'Secure authentication with NextAuth.js',
      icon: CheckCircle,
    },
    {
      title: 'Database',
      description: 'PostgreSQL with Prisma ORM',
      icon: CheckCircle,
    },
    {
      title: 'UI Components',
      description: 'Beautiful and accessible components',
      icon: CheckCircle,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex-1 py-20">
        <div className="mx-auto max-w-[800px] space-y-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Modern App
            </span>
          </h1>
          <p className="mx-auto text-lg leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A scalable, maintainable, and modern web application built with Next.js 14, TypeScript, and
            Tailwind CSS.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/auth/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/your-username/modern-app" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full border-t bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-full flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 