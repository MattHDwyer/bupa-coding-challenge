import { fetchBookOwners } from "@/actions/bookOwners"

export function getBookOwners() {
  return {
    queryKey: ["getBookOwners"],
    queryFn: async () => {
      return await fetchBookOwners()
    },
  }
}
