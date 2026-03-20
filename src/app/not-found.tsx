import { TypographyH1 } from "@/components/Typography"
import Link from "next/link"

export default function NotFound() {
  return (
    <section
      aria-label="Not found page"
      className="w-full h-screen flex flex-col justify-center items-center text-center"
    >
      <TypographyH1>Not Found</TypographyH1>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-bupa-blue underline">
        Return Home
      </Link>
    </section>
  )
}
