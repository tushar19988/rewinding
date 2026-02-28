import MotorExplodeScroll from "@/components/MotorExplodeScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 1. Scrollytelling Section */}
      <MotorExplodeScroll />

      {/* 2. Services Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d0d] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
            <div>
              <h3 className="text-[#b87333] tracking-widest text-sm uppercase mb-3 font-sans font-bold">What We Do</h3>
              <h2 className="text-4xl md:text-7xl font-heading leading-tight">INDUSTRIAL<br />SERVICES</h2>
            </div>
            <p className="max-w-md text-white/50 text-base md:text-lg mt-6 md:mt-0 font-sans">
              From large-scale industrial overhauls to precision domestic rewinding, we deliver unparalleled engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Motor Rewinding", desc: "Single phase, Three phase, & DC motors rebuilt with premium copper." },
              { title: "Pump Rewinding", desc: "Submersible, centrifugal, and industrial water pumps restored." },
              { title: "Transformer Rewinding", desc: "High and low voltage transformer repairs using factory-grade insulation." },
              { title: "Motor Testing", desc: "Dynamic balancing and load testing for maximum operational efficiency." },
              { title: "On-site Services", desc: "Emergency diagnostics and repair deployed directly to your facility." },
              { title: "Motor Overhauling", desc: "Complete strip-down, bearing replacement, and preventive maintenance." },
            ].map((service, i) => (
              <div key={i} className="group p-8 border border-white/10 bg-[#121212] hover:bg-[#1a1a1a] transition duration-300">
                <div className="w-12 h-12 rounded bg-[#b87333]/10 flex items-center justify-center mb-6 group-hover:bg-[#b87333]/20 transition">
                  <span className="text-[#b87333] text-xl font-bold font-heading">{i + 1}</span>
                </div>
                <h4 className="text-3xl mb-3 font-heading">{service.title}</h4>
                <p className="text-white/50 font-sans leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#b87333]/5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-[#b87333] tracking-widest text-sm uppercase mb-3 font-sans font-bold">The Patel Difference</h3>
            <h2 className="text-4xl md:text-7xl mb-6 md:mb-8 font-heading leading-tight">YEARS OF<br />TRUSTED SERVICE</h2>
            <p className="text-lg md:text-xl text-white/60 mb-10 font-sans leading-relaxed">
              We don&apos;t just repair motors; we re-engineer them for longevity. Our commitment to quality materials and meticulous craftsmanship ensures every unit leaves our facility performing better than new.
            </p>

            <ul className="space-y-6 font-sans">
              {[
                "Expert Technicians with Decades of Experience",
                "100% Quality Copper Windings & F Grade Insulation",
                "Fast Turnaround to Minimize Downtime",
                "Comprehensive Support for All Motor Types",
                "Competitive & Transparent Pricing"
              ].map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#b87333] mr-4 text-xl">✓</span>
                  <span className="text-lg text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full aspect-square bg-[#121212] border border-white/10 relative flex items-center justify-center">
            {/* Minimalist abstract representation of a motor core / quality seal */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 20.5V18H0v2.5h20v20h2.5V20.5H40V18H22.5V0H20v20.5z\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.03\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')]"></div>
            <div className="w-64 h-64 rounded-full border border-[#b87333]/30 flex items-center justify-center relative">
              <div className="w-48 h-48 rounded-full border border-[#b87333]/50 flex items-center justify-center relative animate-[spin_30s_linear_infinite]">
                <div className="w-4 h-4 rounded-full bg-[#b87333] absolute top-[-2px]"></div>
                <div className="w-4 h-4 rounded-full bg-[#b87333] absolute bottom-[-2px]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                <span className="text-5xl text-[#b87333] font-heading">100%</span>
                <span className="text-sm tracking-widest text-[#b87333] font-sans">QUALITY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact / CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#b87333] text-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-5xl md:text-8xl mb-6 leading-none font-heading text-black">READY FOR A<br />REWIND?</h2>
            <p className="text-lg md:text-xl font-sans mb-10 text-black/70 font-semibold">
              Get your machinery back online. Fill out the form or call us directly for an immediate diagnostic consultation and quote.
            </p>
            <div className="font-sans text-lg space-y-2 text-black/80 font-medium">
              <p>Email: service@patelelectronics.com</p>
              <p>Phone: +1 (800) 555-0199</p>
              <p>Workshop: 42 Industrial Parkway, Sector 9</p>
            </div>
          </div>

          <div className="lg:w-1/2 bg-[#0a0a0a] p-10 font-sans text-white border border-white/10 shadow-2xl">
            <h3 className="text-3xl tracking-wide mb-8 font-heading text-white">REQUEST A QUOTE</h3>
            <form className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/50 mb-2 uppercase tracking-wide">Name</label>
                  <input type="text" className="w-full bg-[#121212] border border-white/10 p-4 focus:outline-none focus:border-[#b87333] transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2 uppercase tracking-wide">Phone</label>
                  <input type="tel" className="w-full bg-[#121212] border border-white/10 p-4 focus:outline-none focus:border-[#b87333] transition" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2 uppercase tracking-wide">Motor Type</label>
                <select className="w-full bg-[#121212] border border-white/10 p-4 focus:outline-none focus:border-[#b87333] transition text-white/80 appearance-none">
                  <option>Single Phase Motor</option>
                  <option>Three Phase Motor</option>
                  <option>DC Motor</option>
                  <option>Pump / Submersible</option>
                  <option>Transformer</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2 uppercase tracking-wide">Message / Details</label>
                <textarea rows={4} className="w-full bg-[#121212] border border-white/10 p-4 focus:outline-none focus:border-[#b87333] transition" placeholder="Tell us about the issue..."></textarea>
              </div>

              <button type="button" className="w-full mt-4 bg-[#b87333] hover:bg-white text-black font-heading text-xl tracking-widest uppercase p-5 transition duration-300 cursor-pointer">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/30 font-sans text-sm border-t border-white/5 object-bottom">
        &copy; {new Date().getFullYear()} Patel Electronics. All rights reserved.
      </footer>
    </main>
  );
}
