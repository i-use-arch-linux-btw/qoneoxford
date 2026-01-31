"use client";

import Script from "next/script";

export function BeehiivEmbed() {
  return (
    <div className="w-full">
      <Script
        src="https://embeds.beehiiv.com/attribution.js"
        strategy="lazyOnload"
      />
      <iframe
        src="https://embeds.beehiiv.com/71536852-e217-40cd-982a-d3caef9152eb"
        data-test-id="beehiiv-embed"
        width="100%"
        height="320"
        frameBorder="0"
        scrolling="no"
        className="w-full rounded border-2 border-[#002147]/20 bg-transparent transition-colors hover:border-[#002147]/40"
        title="Newsletter signup form"
      />
    </div>
  );
}
