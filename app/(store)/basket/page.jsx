'use client'

import { createCheckoutSession } from "@/actions/createCheckoutSession"
import AddToBasketButton from "@/components/AddToBasketButton"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { imageUrl } from "@/lib/imageUrl"
import { useBasketStore } from "@/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // wait for client to mount
  // useEffect(() => {
  //   setIsClient(true)
  // },[])

  // if (isClient) {
  //   return <Loader />
  // }


  if (groupedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white text-center p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">Winkelwagen</h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-gray-600 text-lg">Je winkelwagen is leeg</h1>
            <p>Op zoek naar ideeën?</p>
            <Button asChild className="">
              <Link href="/">Verder winkelen</Link>
            </Button>
          </div>
        </div>
        <div>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return
    setIsLoading(true)

    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user?.id
      }

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata)

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }

    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="section-style py-6">
      <h1 className="text-blue-dark mb-6">Winkelwagen</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {
            groupedItems?.map((item) => (
              <div
                key={item.product._id}
                className="mb-4 py-4 md:px-4 border rounded flex items-center justify-between bg-white"
              >
                <div
                  className="flex items-center cursor-pointer flex-1 min-w-0"
                  onClick={() => router.push(`/product/${item.product.slug?. current}`)}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                    {
                      item.product.image &&
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name ?? "Product name"}
                        className="w-full h-full object-cover rounded"
                        width={96}
                        height={96}
                      />
                    }
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-sm sm:text-base">
                      €{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center ml-2 mr-1 md:ml-4 md:mr-0 flex-shrink-0">
                  <AddToBasketButton product={item.product} />
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Overzicht</h3>
          <div className="mt-4 space-y-2">
            <p className=" flex justify-between">
              <span>Artikelen:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Totaal:</span>
              <span>
                €{useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {
            isSignedIn ? (
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-4 w-full bg-blue-500 text-white px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? "Processing..." : "Afrekenen"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Aanmelden om af te rekenen
                </button>
              </SignInButton>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default BasketPage