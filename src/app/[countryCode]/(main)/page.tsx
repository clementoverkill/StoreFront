import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Digital Wave — Premium Phones in Zambia",
  description:
    "Brand new & pre-owned Samsung and iPhone devices. Cash, lay-bye, and hire purchase available. Kitwe, Zambia.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return (
      <div className="content-container py-24 text-center">
        <p style={{ color: "#6b7280" }}>
          Loading store data...
        </p>
      </div>
    )
  }

  // Split collections — first one is "Recommended", rest are "Special Deals"
  const recommended = collections.slice(0, 1)
  const specials = collections.slice(1)

  return (
    <>
      <Hero />

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <section>
          {/* Section Header */}
          <div
            className="w-full py-8 px-6"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
              borderBottom: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <div className="content-container flex items-center gap-4">
              <div
                className="w-1 h-8 rounded-full"
                style={{ background: "linear-gradient(180deg, #3b82f6, #60a5fa)" }}
              />
              <div>
                <h2
                  className="font-black uppercase tracking-widest text-white"
                  style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }}
                >
                  Recommended
                </h2>
                <p style={{ color: "rgba(147,197,253,0.6)", fontSize: "0.75rem" }}>
                  Top picks selected for you
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ background: "#f8faff" }}
          >
            <ul className="flex flex-col">
              <FeaturedProducts collections={recommended} region={region} />
            </ul>
          </div>
        </section>
      )}

      {/* Special Deals Section */}
      {specials.length > 0 && (
        <section>
          {/* Section Header */}
          <div
            className="w-full py-8 px-6"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              borderTop: "1px solid rgba(59,130,246,0.15)",
              borderBottom: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <div className="content-container flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: "linear-gradient(180deg, #f59e0b, #fbbf24)" }}
                />
                <div>
                  <h2
                    className="font-black uppercase tracking-widest text-white"
                    style={{ fontSize: "1.1rem", letterSpacing: "0.2em" }}
                  >
                    Special Deals
                  </h2>
                  <p style={{ color: "rgba(147,197,253,0.6)", fontSize: "0.75rem" }}>
                    Limited offers — grab them before they&apos;re gone
                  </p>
                </div>
              </div>

              {/* Live badge */}
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  color: "#fbbf24",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#f59e0b" }}
                />
                Live Deals
              </div>
            </div>
          </div>

          <div style={{ background: "#0f172a" }}>
            <ul className="flex flex-col">
              <FeaturedProducts collections={specials} region={region} isSpecial />
            </ul>
          </div>
        </section>
      )}

      {/* No collections fallback */}
      {collections.length === 0 && (
        <div className="content-container py-24 text-center">
          <p style={{ color: "#6b7280" }}>
            No products yet, add collections 
          </p>
        </div>
      )}
    </>
  )
}