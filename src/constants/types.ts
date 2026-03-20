export type Book = {
  name: string
  type: "Hardcover" | "Ebook" | "Paperback"
}

export type BookOwner = {
  age: number
  books: Book[]
  name: string
}
