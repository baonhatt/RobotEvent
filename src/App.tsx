/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { translations, Language } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Showcase from './components/Showcase';
import UseCases from './components/UseCases';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PhoneButton from './components/PhoneButton';

export default function App() {
  const [lang, setLang] = useState<Language>('VN');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-electric-blue selection:text-dark-bg">
      <Header lang={lang} setLang={setLang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Capabilities t={t.capabilities} />
        <Showcase t={t.showcase} contactT={t.contact} />
        <UseCases t={t.useCases} />
        <About t={t.about} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} nav={t.nav} />
      <ScrollToTop />
      <PhoneButton phone={t.contact.info.phone} />
    </div>
  );
}
