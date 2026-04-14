'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CONSENT_KEY = 'cookie-consent';
const GTM_ID = 'GTM-WSTH9JTX';

type ConsentValue = 'accepted' | 'declined' | null;

function injectGTM() {
  if (document.getElementById('gtm-script')) return; // already injected

  // Head script
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(script);

  // Body noscript iframe
  const noscript = document.createElement('noscript');
  noscript.id = 'gtm-noscript';
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

export function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);

  // Read stored consent on mount and inject GTM if already accepted
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;
    setConsent(stored);
    if (stored === 'accepted') {
      injectGTM();
    } else if (stored === null) {
      // No decision yet — show banner after a short delay
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // Listen for the footer "Cookie Preferences" link to reopen the banner
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('open-consent-banner', handler);
    return () => window.removeEventListener('open-consent-banner', handler);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
    injectGTM();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setConsent('declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-4xl mx-auto bg-surface-900 border border-surface-700 rounded-xl shadow-bento px-5 py-4 md:px-7 md:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs tracking-[0.12em] uppercase text-brand-500 mb-1">
                Cookie Preferences
              </p>
              <p className="text-sm text-ash leading-relaxed">
                This site uses analytics cookies to understand how visitors interact with it.
                No personal data is sold.{' '}
                <Link
                  href="/privacy"
                  className="text-brand-400 hover:text-brand-300 underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm font-semibold text-surface-400 hover:text-ash border border-surface-600 hover:border-surface-500 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
