"use client"

import * as React from "react"
import { cn } from "@/utils/cn"

export function Separator({
  className,
  decorative = true,
}: {
  className?: string
  decorative?: boolean
}) {
  return (
    <hr
      className={cn(className)}
      aria-hidden={decorative || undefined}
      role={decorative ? "presentation" : "separator"}
    />
  )
}
