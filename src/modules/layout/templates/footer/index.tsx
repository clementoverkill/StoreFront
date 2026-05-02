import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer
      className="border-t w-full"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0a1628 100%)",
        borderColor: "rgba(59, 130, 246, 0.2)",
      }}
    >
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-20">

          {/* Brand column */}
          <div className="flex flex-col gap-y-4 max-w-xs">
            <LocalizedClientLink href="/" className="flex items-center gap-x-3">
              <div
                className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: "1.5px solid rgba(147, 197, 253, 0.4)",
                  boxShadow: "0 0 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                <Image src="/logo.png" alt="Digital Wave" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold tracking-widest uppercase text-white"
                  style={{ fontSize: "13px", letterSpacing: "0.2em" }}
                >
                  Digital Wave
                </span>
                <span
                  style={{ fontSize: "8px", letterSpacing: "0.25em", color: "rgba(147, 197, 253, 0.6)" }}
                  className="uppercase tracking-widest"
                >
                  Premium Devices
                </span>
              </div>
            </LocalizedClientLink>
            <p style={{ color: "rgba(147, 197, 253, 0.55)", fontSize: "0.8rem", lineHeight: "1.7" }}>
              Zambia&apos;s trusted source for brand new &amp; pre-owned Samsung and iPhone devices.
              Cash, lay-bye &amp; hire purchase available.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-y-1" style={{ color: "rgba(147, 197, 253, 0.5)", fontSize: "0.78rem" }}>
              <span>📍 Lusaka, Zambia</span>
              <span>📱 Available on WhatsApp</span>
            </div>
          </div>

          {/* Links columns */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="font-semibold tracking-widest uppercase"
                  style={{ color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories.slice(0, 6).map((c) => {
                    if (c.parent_category) return null
                    const children = c.category_children?.map((child) => ({
                      name: child.name, handle: child.handle, id: child.id,
                    })) || null
                    return (
                      <li className="flex flex-col gap-2 txt-small" key={c.id}
                        style={{ color: "rgba(147, 197, 253, 0.55)" }}>
                        <LocalizedClientLink
                          className={clx("hover:text-white transition-colors", children && "font-medium")}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-white transition-colors"
                                  href={`/categories/${child.handle}`}
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span
                  className="font-semibold tracking-widest uppercase"
                  style={{ color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  Collections
                </span>
                <ul className={clx("grid grid-cols-1 gap-2 txt-small",
                  { "grid-cols-2": (collections.length || 0) > 3 })}
                  style={{ color: "rgba(147, 197, 253, 0.55)" }}
                >
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-white transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-3">
              <span
                className="font-semibold tracking-widest uppercase"
                style={{ color: "#60a5fa", fontSize: "0.7rem", letterSpacing: "0.15em" }}
              >
                Payment Options
              </span>
              <ul className="grid grid-cols-1 gap-y-2 txt-small"
                style={{ color: "rgba(147, 197, 253, 0.55)" }}>
                <li>💵 Cash</li>
                <li>🗓️ Lay-bye</li>
                <li>📋 Hire Purchase</li>
                <li>
                  <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                    Shop Now →
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex w-full mb-8 pt-6 justify-between items-center flex-wrap gap-4"
          style={{ borderTop: "1px solid rgba(59, 130, 246, 0.15)" }}
        >
          <span style={{ color: "rgba(147, 197, 253, 0.35)", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Digital Wave. All rights reserved.
          </span>
          <span style={{ color: "rgba(147, 197, 253, 0.35)", fontSize: "0.75rem" }}>
            Lusaka, Zambia 🇿🇲
          </span>
        </div>
      </div>
    </footer>
  )
}