import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const searchProductsByName = async (searchParam) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && name match $searchParam] | order(name asc)
  `)

  try {
    // Add wildcard to search parameter for partial match
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`
      }
    })
    return products.data || []
  } catch(error) {
    console.error("Error fetching products by name:", error)
    return []
  }
}