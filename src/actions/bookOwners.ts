"use server"

import "server-only"

import * as z from "zod/mini"

const BookOwnersResponseSchema = z.array(
  z.object({
    age: z.number(),
    name: z.string(),
    books: z.array(
      z.object({
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
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    const parsedData = await BookOwnersResponseSchema.parseAsync(data)
    return parsedData
  } catch (error) {
    console.error("Error fetching book owners:", error)
    throw error
  }
}
