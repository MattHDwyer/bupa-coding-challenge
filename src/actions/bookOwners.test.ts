import { expect, test, vi } from "vitest"
import { fetchBookOwners } from "./bookOwners"

vi.mock("server-only", () => ({}))
vi.stubGlobal("fetch", vi.fn())

test("throws an error if the API returns a non-200 status code", async () => {
  vi.mocked(fetch).mockResolvedValue({
    ok: false,
    status: 404,
  } as Response)

  await expect(fetchBookOwners()).rejects.toThrow("HTTP error! Status: 404")
})

test("parses valid response", async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          name: "Alice",
          age: 30,
          books: [{ name: "Book", type: "Hardcover" }],
        },
      ]),
  } as Response)
  const result = await fetchBookOwners()
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe("Alice")
})

test("throws error on successful response with invalid schema", async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          name: "Alice",
          age: 30,
          books: [{ name: "Book", TYPE: "Hardcover" }],
        },
      ]),
  } as Response)

  await expect(fetchBookOwners()).rejects.toMatchObject({
    name: "$ZodError",
  })
})

test("passes without error on successful response with additional properties", async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          name: "Alice",
          age: 30,
          favoriteColor: "red",
          books: [{ name: "Book", type: "Hardcover", publishedYear: "2000" }],
        },
      ]),
  } as Response)

  const result = await fetchBookOwners()
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe("Alice")
})
