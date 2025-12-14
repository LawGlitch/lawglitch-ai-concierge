import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
import CalculatorSection from "@/components/CalculatorSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onChatOpen={handleChatOpen} />
      
      <main>
        <HeroSection onChatOpen={handleChatOpen} />
        <SolutionsSection />
        <CalculatorSection />
        <TestimonialsSection />
        <PricingSection onChatOpen={handleChatOpen} />
      </main>

      <Footer />

      {/* Chat Components */}
      <FloatingChatButton onClick={handleChatOpen} isVisible={!isChatOpen} />
      <ChatWidget isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
};

export default Index;
