'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import ProductThumb from './ProductThumb'

function ProductGrid({ products }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {
        products?.map((product, index) => {
          return (
            <AnimatePresence key={`${product.id}-${index}`}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <ProductThumb product={product} />
              </motion.div>
            </AnimatePresence>
          )
        })
      }
    </div>
  )
}

export default ProductGrid