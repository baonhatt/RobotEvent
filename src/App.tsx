/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { translations, Language } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';

const Capabilities = lazy(() => import('./components/Capabilities'));
const Showcase = lazy(() => import('./components/Showcase'));
const UseCases = lazy(() => import('./components/UseCases'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const PhoneButton = lazy(() => import('./components/PhoneButton'));

function SectionFallback() {
  return <div className="h-24" aria-hidden="true" />;
}

export default function App() {
  df
  const [lang, setLang] = useState<Language>('VN');
  const [loadSecondaryContent, setLoadSecondaryContent] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadSecondaryContent(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-electric-blue selection:text-dark-bg">
      <Header lang={lang} setLang={setLang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        {loadSecondaryContent && (
          <Suspense fallback={<SectionFallback />}>
            <Capabilities t={t.capabilities} />
            <Showcase t={t.showcase} contactT={t.contact} />
            <UseCases t={t.useCases} />
            <About t={t.about} />
            <Contact t={t.contact} />
          </Suspense>
        )}
      </main>
      {loadSecondaryContent && (
        <Suspense fallback={null}>
          <Footer t={t.footer} nav={t.nav} />
          <ScrollToTop />
          <PhoneButton phone={t.contact.info.phone} />
        </Suspense>
      )}
    </div>
  );
}
