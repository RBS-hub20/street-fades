"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Header from "./Header";
import Hero from "./Hero";
import FeatureStrip from "./FeatureStrip";
import Marquee from "./Marquee";
import About from "./About";
import Services from "./Services";
import Pricing from "./Pricing";
import SplitPanels from "./SplitPanels";
import Lookbook from "./Lookbook";
import Barbers from "./Barbers";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

/* The modal is a big chunk that nobody sees until they click BOOK, so it is
   loaded on demand and never rendered on the server. */
const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });

export default function ClientPage() {
  const [modal, setModal] = useState<{ open: boolean; serviceId?: string; key: number }>({
    open: false,
    key: 0,
  });

  const openBooking = useCallback((serviceId?: string) => {
    setModal((m) => ({ open: true, serviceId, key: m.key + 1 }));
  }, []);

  /* The hero already has a big red CTA; showing the sticky bar at the same
     time puts two identical buttons on screen. Reveal it only once the hero
     has scrolled away. */
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const closeBooking = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
  }, []);

  return (
    <>
      <Header onBook={() => openBooking()} />

      <main>
        <Hero onBook={openBooking} />
        <FeatureStrip />
        <Marquee />
        <About />
        <Services onBook={openBooking} />
        <Pricing onBook={() => openBooking()} />
        <SplitPanels onBook={openBooking} />
        <Lookbook />
        <Barbers onBook={() => openBooking()} />
        <Testimonials />
      </main>

      <Footer onBook={() => openBooking()} />

      {/* Mobile sticky CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-5 py-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${
          pastHero ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!pastHero}
      >
        <button
          type="button"
          onClick={() => openBooking()}
          className="w-full rounded-lg bg-blood py-3.5 font-head text-sm tracking-[.16em] text-white"
        >
          BOOK YOUR SLOT NOW!
        </button>
      </div>
      <div className="h-[68px] sm:hidden" />

      {modal.open && (
        <BookingModal key={modal.key} initialServiceId={modal.serviceId} onClose={closeBooking} />
      )}
    </>
  );
}
