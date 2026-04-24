import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className="relative h-16 mx-auto border-b duration-200 border-ui-border-base"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
          boxShadow: "0 2px 20px rgba(29, 78, 216, 0.25)",
        }}
      >
        <nav className="content-container flex items-center justify-between w-full h-full">

          {/* Left — side menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          {/* Center — Logo + Brand name */}
          <div className="flex items-center gap-x-3 h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-x-3 group/logo"
              data-testid="nav-store-link"
            >
              <div
                className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: "1.5px solid rgba(147, 197, 253, 0.5)",
                  boxShadow: "0 0 12px rgba(59, 130, 246, 0.4)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Digital Wave logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold tracking-widest uppercase text-white"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.2em",
                    textShadow: "0 0 20px rgba(147, 197, 253, 0.6)",
                  }}
                >
                  Digital Wave
                </span>
                <span
                  className="tracking-widest uppercase"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.25em",
                    color: "rgba(147, 197, 253, 0.7)",
                  }}
                >
                  Premium Devices
                </span>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Right — Account + Cart */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-blue-200 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-blue-200 hover:text-white flex gap-2 text-sm font-medium"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>

        </nav>
      </header>

      {/* Subtle blue accent line under nav */}
      <div
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)",
          opacity: 0.8,
        }}
      />
    </div>
  )
}