/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import WhyFrancos from './components/WhyFrancos';
import About from './components/About';
import Featured from './components/Featured';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import DeliverySection from './components/DeliverySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const schemaJsonLD = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Franco's Pizza & Pasta",
    "image": "https://ais-dev-4oifvusznv3367zp54fise-109958320449.europe-west3.run.app/src/assets/images/hero_pizza_1780327174323.png",
    "@id": "https://ais-dev-4oifvusznv3367zp54fise-109958320449.europe-west3.run.app/#domu",
    "url": "https://ais-dev-4oifvusznv3367zp54fise-109958320449.europe-west3.run.app/",
    "telephone": "+420777906014",
    "priceRange": "$$",
    "menu": "https://ais-dev-4oifvusznv3367zp54fise-109958320449.europe-west3.run.app/#menu",
    "servesCuisine": "itálie, pizzerie, těstoviny",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bezručova 3327",
      "addressLocality": "Mělník",
      "postalCode": "27601",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.3581176,
      "longitude": 14.4831349
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "16:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.facebook.com/francospizzaupastamelnik"
    ]
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-ita-green selection:text-white">
      {/* Schema.org Restaurant Microdata for search indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLD) }}
      />

      {/* Floating interactive navigation */}
      <Header />
      
      <main className="relative">
        {/* Fullscreen hero layout */}
        <Hero />
        
        {/* Core value grid block */}
        <WhyFrancos />
        
        {/* Editorial history & story */}
        <About />
        
        {/* Recommended marquee delicacies */}
        <Featured />
        
        {/* Filterable Menu + live cart checkout */}
        <MenuSection />
        
        {/* Slideway feedback review loops */}
        <ReviewsSection />
        
        {/* Delivery metrics CTA blocks */}
        <DeliverySection />
        
        {/* Click cards & Google map embeds */}
        <ContactSection />
      </main>

      {/* Address copyrights legal bounds */}
      <Footer />
    </div>
  );
}
