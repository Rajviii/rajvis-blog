import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="glass p-12 rounded-3xl max-w-lg w-full flex flex-col items-center shadow-xl">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <FileQuestion className="w-12 h-12 text-primary drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-bold font-heading mb-4 text-gradient">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link 
          href="/" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
