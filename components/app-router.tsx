"use client";

import dynamic from "next/dynamic";

const LayoutTextFlip = dynamic(
  () => import("./ui/layout-text-flip").then(m => m.LayoutTextFlip),
  {
    ssr: false,
    loading: () => <div className="h-10" />,
  }
);

const AnimatedTestimonials = dynamic(
  () =>
    import("./ui/animated-testimonials").then(
      m => m.AnimatedTestimonials
    ),
  { ssr: false, loading: () => <div className="h-64" /> }
);

const WorldMap = dynamic(() => import("./ui/world-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] rounded-xl bg-muted/20" />
  ),
});

export { LayoutTextFlip, AnimatedTestimonials, WorldMap };
