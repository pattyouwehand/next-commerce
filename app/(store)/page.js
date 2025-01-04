import BlackFridayBanner from "@/components/BlackFridayBanner"
import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts"

export const dynamic = "force-static"
export const revalidate = 60

export default async function Home() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  return (
    <div>
      <BlackFridayBanner />
      <div className="bg-gray-100 flex flex-col items-center justify-center py-6">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  )
}
