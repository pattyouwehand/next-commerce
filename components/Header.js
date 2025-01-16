'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { TrolleyIcon } from "@sanity/icons"
import { PackageIcon } from "lucide-react"
import { useBasketStore } from "@/store/store"

function Header() {
  const { user } = useUser()
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      console.log("res:", response)
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2))
    }
  }

  return (
    <header className="bg-white py-2">
      <div className="section-style flex flex-wrap justify-between items-center">
        <div className="flex w-full flex-wrap justify-between items-center md:gap-4 xl:gap-0">
          <div className="flex flex-col justify-center items-center">
            <Link
              href="/"
              className="text-4xl font-bold hover:opacity-50 cursor-pointer sm:mx-0 mx-auto"
            >
              <span className="text-blue-dark">Your</span>
              <span className="text-red-dark">Webshop</span>
            </Link>
          </div>

          <Form
            action='/search'
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
          >
            <input
              type="text"
              name="query"
              placeholder="Waar ben je naar op zoek?"
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            />
          </Form>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            <Link
              href="/basket"
              className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <TrolleyIcon className="w-6 h-6" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>

              <span className="hidden md:block">Winkelmand</span>
            </Link>

            {/* User area*/}
            <ClerkLoaded>
              {user && (
                <Link
                  href="/orders"
                  className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <PackageIcon className="w-6 h-6" />
                  <span className="hidden md:block">Bestellingen</span>
                </Link>
              )}

              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />

                  <div className="hidden sm:block text-xs">
                    <p className="text-sm text-gray-400">Welkom</p>
                    <p className="text-sm font-bold">{user.fullName}!</p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal" />
              )}

              <div className="hidden md:block">
                {
                  user?.passkeys.length === 0 &&
                  <button
                    onClick={createClerkPasskey}
                    className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
                  >
                    Passkey aanmaken
                  </button>
                }
              </div>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header