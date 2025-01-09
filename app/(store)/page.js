import BlackFridayBanner from "@/components/BlackFridayBanner"
import ProductsView from "@/components/ProductsView"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts"
import Image from "next/image"
import { getGiftPlants } from "../api/flora/getGiftPlants"

export const dynamic = "force-static"
export const revalidate = 60

export default async function Home() {
  const products = await getAllProducts()
  const categories = await getAllCategories()
  const giftPlants = await getGiftPlants()

  console.log("giftPlants:", giftPlants)

  return (
    <div>
      <BlackFridayBanner />
      <h2 className="text-2xl font-bold mb-4">Featured Gift Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {giftPlants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
          >
            {
              plant.image_url &&
              <Image
                className="object-cover mb-2"
                src={plant.image_url}
                alt={plant.name || "Gift Plant"}
                width={128}
                height={128}
              />
            }
            <h3 className="font-semibold text-lg">{plant.name || "Plant"}</h3>
            <p className="text-sm text-gray-500">
              {plant.description || "A beautiful gift plant."}
            </p>
            <span className="text-green-600 font-bold mt-2">
              ${plant.price || "0.00"}
            </span>
          </div>
        ))}
      </div>
      {/* <div className="bg-gray-100 flex flex-col items-center justify-center py-6">
        <ProductsView products={products} categories={categories} />
      </div> */}
    </div>
  )
}
