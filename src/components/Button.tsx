import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/utils/cn"
import { Loading01 } from "@untitledui/icons"

export function Button({
  className,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isLoading?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading01 className="w-4 h-4 animate-spin" />
      </div>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        className,
        "bg-bupa-blue text-white py-2 px-4 text-md rounded-md font cursor-pointer"
      )}
      {...props}
    />
  )
}
