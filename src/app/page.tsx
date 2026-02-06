import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { ChatSection } from "@/components/sections/ChatSection";
import { Footer } from "@/components/layout/Footer";
import { ChatBubble } from "@/components/chat/ChatBubble";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DestinationsSection />
        <QuizSection />
        <ChatSection />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}
