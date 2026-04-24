import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)",
      }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(29, 78, 216, 0.35) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          bottom: "-80px",
          left: "-80px",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 small:px-32 gap-8">

        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            border: "1px solid rgba(147, 197, 253, 0.3)",
            background: "rgba(29, 78, 216, 0.2)",
            color: "#93c5fd",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#60a5fa" }}
          />
          Zambia&apos;s Trusted Phone Store
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-black uppercase tracking-tight text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1.05",
              textShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
            }}
          >
            Premium Phones.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa, #93c5fd, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trusted Deals.
            </span>
          </h1>
          <p
            className="font-light max-w-lg mx-auto"
            style={{
              color: "rgba(186, 214, 254, 0.75)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: "1.6",
            }}
          >
            Brand new &amp; pre-owned Samsung and iPhone devices. 
            Cash, lay-bye, and hire purchase available.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col small:flex-row items-center gap-4 mt-2">
          <LocalizedClientLink href="/store">
            <button
              className="px-8 py-3.5 rounded-full font-bold text-white tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
              }}
            >
              Shop Now →
            </button>
          </LocalizedClientLink>

          <LocalizedClientLink href="/store">
            <button
              className="px-8 py-3.5 rounded-full font-semibold tracking-wide transition-all duration-300 hover:bg-white/10"
              style={{
                border: "1px solid rgba(147, 197, 253, 0.4)",
                color: "#93c5fd",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                backdropFilter: "blur(10px)",
              }}
            >
              View All Devices
            </button>
          </LocalizedClientLink>
        </div>

        {/* Trust indicators */}
        <div
          className="flex items-center gap-6 mt-4 text-xs tracking-widest uppercase font-medium"
          style={{ color: "rgba(147, 197, 253, 0.5)" }}
        >
          <span>✓ Brand New</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(147, 197, 253, 0.3)" }}
          />
          <span>✓ Pre-Owned</span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(147, 197, 253, 0.3)" }}
          />
          <span>✓ Lay-bye Available</span>
        </div>

      </div>
    </div>
  )
}

export default Hero