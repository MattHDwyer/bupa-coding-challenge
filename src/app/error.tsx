"use client" // Error boundaries must be Client Components

import { Button } from "@/components/Button"
import { TypographyH1 } from "@/components/Typography"
import { useEffect } from "react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <section
      aria-label="Error page"
      className="w-full h-screen flex flex-col justify-center items-center text-center"
    >
      <TypographyH1>Something went wrong!</TypographyH1>
      <Button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </Button>
    </section>
  )
}
