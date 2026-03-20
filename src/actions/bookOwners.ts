"use server"

import "server-only"

import * as z from "zod/mini"

const BookOwnersResponseSchema = z.array(
  z.looseObject({
    age: z.number(),
    name: z.string(),
    books: z.array(
      z.looseObject({
        name: z.string(),
        type: z.enum(["Hardcover", "Ebook", "Paperback"]),
      })
    ),
  })
)

export async function fetchBookOwners() {
  try {
    const response = await fetch(
      "https://digitalcodingtest.bupa.com.au/api/v1/bookowners",
      {
        headers: {
          accept: "*/*",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`, {
        cause: response,
      })
    }
    const data = await response.json()
    console.log(data)
    const parsedData = await BookOwnersResponseSchema.parseAsync(data)
    return parsedData
  } catch (error) {
    console.error("Error fetching book owners:", error)
    throw error
  }
}
