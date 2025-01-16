import ProductGrid from "./ProductGrid"
import { CategorySelectorComponent } from "./ui/category-selector"

const ProductsView = ({ products, categories}) => {
  return (
    <div className="section-style flex flex-col pt-2">
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

export default ProductsView