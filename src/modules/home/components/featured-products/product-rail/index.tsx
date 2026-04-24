import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
  isSpecial = false,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  isSpecial?: boolean
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts?.length) return null

  return (
    <div
      className="content-container py-12 small:py-16"
      style={isSpecial ? { color: "#fff" } : {}}
    >
      {/* Rail header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          {isSpecial && (
            <span
              className="text-lg"
              role="img"
              aria-label="special"
            >
              🔥
            </span>
          )}
          <span
            className="font-bold tracking-wide"
            style={{
              fontSize: "1.1rem",
              color: isSpecial ? "#fff" : "#0f172a",
            }}
          >
            {collection.title}
          </span>
        </div>
        <InteractiveLink
          href={`/collections/${collection.handle}`}
          style={isSpecial ? { color: "#60a5fa" } : {}}
        >
          View all
        </InteractiveLink>
      </div>

      {/* Product grid */}
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-16 small:gap-y-24">
        {pricedProducts.map((product) => (
          <li
            key={product.id}
            className="relative"
          >
            {/* Special deals badge */}
            {isSpecial && (
              <div
                className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  color: "#0f172a",
                }}
              >
                DEAL
              </div>
            )}
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}