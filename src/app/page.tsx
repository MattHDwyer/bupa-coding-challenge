"use client"

import { Button } from "@/components/Button"
import { getBookOwners } from "@/queries/getBookOwners"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { BookOwner } from "@/constants/types"
import { Card } from "@/components/Card"
import { Separator } from "@/components/Separator"
import { Header } from "@/components/Header"

export default function Home() {
  const [hardCoverOnly, setHardCoverOnly] = useState<boolean>(false)
  const {
    data: bookOwners,
    refetch: refetchBookOwners,
    isLoading,
    // @TODO: Add success notification for when query is successful
    // isSuccess,
    // @TODO: add error notification for when query is unsuccessful
    isError,
  } = useQuery({
    ...getBookOwners(),
    // disable to have button fetch on page load
    enabled: false,
  })

  const childBookOwners = bookOwners?.filter(
    (bookOwner: BookOwner) => bookOwner.age < 18
  )

  const adultBookOwners = bookOwners?.filter(
    (bookOwner: BookOwner) => bookOwner.age > 17
  )

  return (
    <main id="main-content" className="bg-white">
      <Header title="Owners and Books" />
      <section
        aria-label="Book collections"
        className="lg:max-w-2/3 w-4/5 mx-auto flex flex-col gap-4"
      >
        <div
          id="books-owned-container"
          aria-live="polite"
          className="flex flex-col lg:flex-row gap-4 w-full justify-center"
        >
          {isError && (
            <p className="text-red-500">
              Error fetching books! Please try again.
            </p>
          )}
          <Card
            demographic="Adults"
            bookOwners={adultBookOwners}
            hardCoverOnly={hardCoverOnly}
          />
          <Card
            demographic="Children"
            bookOwners={childBookOwners}
            hardCoverOnly={hardCoverOnly}
          />
        </div>
        <div className="lg:w-7/12 w-full mx-auto">
          <Separator className="my-2 py-2" />
          <div
            id="button-container"
            className="flex flex-col-reverse lg:flex-row lg:gap-4 gap-2 justify-center lg:justify-end"
          >
            <Button
              className="text-bupa-blue! bg-transparent! underline cursor-pointer"
              aria-pressed={hardCoverOnly}
              onClick={() => {
                setHardCoverOnly(!hardCoverOnly)
              }}
            >
              Hardcover only
            </Button>
            <Button
              onClick={() => {
                refetchBookOwners()
              }}
              isLoading={isLoading}
            >
              Get Books
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
