import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
  isSpecial = false,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
  isSpecial?: boolean
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} isSpecial={isSpecial} />
    </li>
  ))
}