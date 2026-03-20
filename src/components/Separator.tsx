"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

export function Separator({
  className,
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return <hr className={className} />
}
