import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/utils/cn"
import { Loading01 } from "@untitledui/icons"

export function Button({
  className,
  asChild = false,
  isLoading = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isLoading?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        "bg-bupa-blue text-white py-2 px-4 text-md rounded-md font cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bupa-blue",
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loading01 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}
