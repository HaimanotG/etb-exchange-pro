import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="ml-2 text-sm text-muted-foreground">Loading exchange rates...</span>
    </div>
  )
}

