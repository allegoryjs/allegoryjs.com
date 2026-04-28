'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// 1. Move the hooks and logic into a separate inner component
function GoatCounterEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip the first render because the script tag automatically tracks the initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // Ping GoatCounter on subsequent route changes
    if (window.goatcounter) {
      const query = searchParams?.toString();
      const url = pathname + (query ? `?${query}` : '');
      window.goatcounter.count({ path: url });
    }
  }, [pathname, searchParams]);

  return null;
}

// 2. Export the main component wrapped in <Suspense>
export default function GoatCounter() {
  return (
    <>
      <Suspense fallback={null}>
        <GoatCounterEvents />
      </Suspense>

      <Script
        strategy="afterInteractive"
        data-goatcounter="https://allegoryjs.goatcounter.com/count"
        src="//gc.zgo.at/count.js"
      />
    </>
  );
}