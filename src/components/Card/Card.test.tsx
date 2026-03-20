// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, test } from "vitest"
import { BookOwner } from "@/constants/types"
import { Card } from "."

afterEach(cleanup)

const owners: BookOwner[] = [
  {
    name: "Alice",
    age: 30,
    books: [
      { name: "Zebra Tales", type: "Hardcover" },
      { name: "Alpha Guide", type: "Ebook" },
    ],
  },
  {
    name: "Bob",
    age: 25,
    books: [
      { name: "Middle Earth", type: "Paperback" },
      { name: "Beta Manual", type: "Hardcover" },
    ],
  },
]

describe("Card", () => {
  test("returns null when bookOwners is undefined", () => {
    const { container } = render(
      <Card demographic="Adults" hardCoverOnly={false} />
    )
    expect(container.innerHTML).toBe("")
  })

  test("returns null when bookOwners is explicitly undefined", () => {
    const { container } = render(
      <Card demographic="Adults" bookOwners={undefined} hardCoverOnly={false} />
    )
    expect(container.innerHTML).toBe("")
  })

  test("renders book names sorted alphabetically", () => {
    render(
      <Card demographic="Adults" bookOwners={owners} hardCoverOnly={false} />
    )
    const items = screen.getAllByRole("listitem")
    expect(items.map((li) => li.textContent)).toEqual([
      "Alpha Guide",
      "Beta Manual",
      "Middle Earth",
      "Zebra Tales",
    ])
  })

  test("filters to hardcover books only when hardCoverOnly is true", () => {
    render(
      <Card demographic="Adults" bookOwners={owners} hardCoverOnly={true} />
    )
    const items = screen.getAllByRole("listitem")
    expect(items.map((li) => li.textContent)).toEqual([
      "Beta Manual",
      "Zebra Tales",
    ])
  })

  test("shows all books when hardCoverOnly is false", () => {
    render(
      <Card demographic="Adults" bookOwners={owners} hardCoverOnly={false} />
    )
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(4)
  })

  test("heading includes 'Hardcover' prefix when hardCoverOnly is true", () => {
    render(
      <Card demographic="Children" bookOwners={owners} hardCoverOnly={true} />
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Hardcover Books owned by Children"
    )
  })

  test("heading omits 'Hardcover' prefix when hardCoverOnly is false", () => {
    render(
      <Card demographic="Children" bookOwners={owners} hardCoverOnly={false} />
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Books owned by Children"
    )
  })

  test("renders books from multiple owners merged and sorted", () => {
    const multipleOwners: BookOwner[] = [
      {
        name: "Carol",
        age: 40,
        books: [{ name: "Yoga Basics", type: "Paperback" }],
      },
      {
        name: "Dave",
        age: 35,
        books: [{ name: "Cooking 101", type: "Hardcover" }],
      },
    ]
    render(
      <Card
        demographic="Everyone"
        bookOwners={multipleOwners}
        hardCoverOnly={false}
      />
    )
    const items = screen.getAllByRole("listitem")
    expect(items.map((li) => li.textContent)).toEqual([
      "Cooking 101",
      "Yoga Basics",
    ])
  })
})
