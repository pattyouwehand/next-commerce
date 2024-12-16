import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import getProductsByCategory from "@/sanity/lib/products/getProductsByCategory"

async function CategoryPage({ params }) {
  const { slug } = params

  const products = await getProductsByCategory(slug)
  const categories = await getAllCategories()

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-mdw-full max-w-4xl">
        <h1>
          {slug
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          }{" "} Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  )
}

export default CategoryPage