import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import getProductsByCategory from "@/sanity/lib/products/getProductsByCategory"

async function CategoryPage({ params }) {
  const { slug } = await params

  const products = await getProductsByCategory(slug)
  const categories = await getAllCategories()

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <h1 className="section-style">
        {slug
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        }{" "} Collectie
      </h1>
      <ProductsView products={products} categories={categories} />
    </div>
  )
}

export default CategoryPage