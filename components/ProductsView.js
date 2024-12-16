import ProductGrid from "./ProductGrid"
import { CategorySelectorComponent } from "./ui/category-selector"

const ProductsView = ({ products, categories}) => {
  return (
    <div className="flex flex-col">
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>
      <div className="flex-1">
        <div>
          <div>
            <ProductGrid products={products} />
            <hr className="w-1/2 sm:w-3/4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsView