"use client"

import { useId } from "react"
import { isNullOrUndefined } from "@sindresorhus/is"
import { Book, BookOwner } from "@/constants/types"
import { TypographyText, TypographyH2 } from "./Typography"

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
  const booksId = useId()

  if (isNullOrUndefined(bookOwners)) {
    return null
  }

  const books = bookOwners.map((bookOwner: BookOwner) => bookOwner.books).flat()

  const filteredBooks = books?.filter((book: Book) => {
    if (hardCoverOnly) {
      return book.type === "Hardcover"
    }
    return true
  })

  if (isNullOrUndefined(filteredBooks)) {
    return null
  }

  return (
    <div className="lg:max-w-64 lg:w-64 text">
      <div
        id={`title_${titleId}`}
        className="bg-bupa-blue text-center text-white px-2 py-4 rounded-sm"
      >
        <TypographyH2>
          {hardCoverOnly && "Hardcover"} Books owned by {demographic}
        </TypographyH2>
      </div>
      <div id={`books_${booksId}`}>
        {filteredBooks.map((book: Book, index: number) => (
          <TypographyText key={index}>{book.name}</TypographyText>
        ))}
      </div>
    </div>
  )
}
