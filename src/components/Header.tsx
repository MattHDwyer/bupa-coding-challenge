import { TypographyH1 } from "@/components/Typography"

export function Header({ title }: { title: string }) {
  return (
    <header className="bg-bupa-blue text-white text-center w-full mb-8 py-4">
      <TypographyH1>{title}</TypographyH1>
    </header>
  )
}
