'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, RefreshCw } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface ContentCardProps {
  title: string
  content: string | React.ReactNode
  onRefresh: () => Promise<void>
}

export function ContentCard({ title, content, onRefresh }: ContentCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRefresh = async () => {
    setIsLoading(true)
    await onRefresh()
    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(typeof content === 'string' ? content : '')
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button className="w-full sm:w-auto" variant="outline" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button className="w-full sm:w-auto" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </CardFooter>
    </Card>
  )
}

