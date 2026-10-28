import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoffeeBeansSection } from './components/CoffeeBeansSection';
import { BrewingGuideSection } from './components/BrewingGuideSection';
import { FoodMenuSection } from './components/FoodMenuSection';
import { FlavorQuizModal } from './components/FlavorQuizModal';
import { AuthModal } from './components/AuthModal';
import { MemberDrawer } from './components/MemberDrawer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';

function MainApp() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { setIsAuthModalOpen } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#292524]">
      {/* Navigation Top Bar Contract */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        <CoffeeBeansSection />
        <BrewingGuideSection />
        <FoodMenuSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <FlavorQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
      <AuthModal />
      <MemberDrawer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
