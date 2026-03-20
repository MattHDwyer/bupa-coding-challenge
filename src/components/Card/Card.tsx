"use client"

import { useId } from "react"
import { isNullOrUndefined } from "@sindresorhus/is"
import { Book, BookOwner } from "@/constants/types"
import { TypographyH2 } from "@/components/Typography"

export function Card({
  demographic,
  bookOwners,
  hardCoverOnly,
}: {
  demographic: string
  bookOwners?: BookOwner[]
  hardCoverOnly: boolean
}) {
  const titleId = useId()

  if (isNullOrUndefined(bookOwners)) {
    return null
  }

  const books = bookOwners.map((bookOwner: BookOwner) => bookOwner.books).flat()

  const filteredBooks = books
    ?.filter((book: Book) => {
      if (hardCoverOnly) {
        return book.type === "Hardcover"
      }
      return true
    })
    .sort((a: Book, b: Book) => a.name.localeCompare(b.name))

  if (isNullOrUndefined(filteredBooks)) {
    return null
  }

  return (
    <section aria-labelledby={titleId} className="lg:max-w-64 lg:w-64 text">
      <div className="bg-bupa-blue text-center text-white px-2 py-4 rounded-sm">
        <TypographyH2 id={titleId}>
          {hardCoverOnly && "Hardcover "}Books owned by {demographic}
        </TypographyH2>
      </div>
      <ul className="list-none p-0">
        {filteredBooks.map((book: Book) => (
          <li key={`${book.name}-${book.type}`} className="text-lg">
            {book.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
