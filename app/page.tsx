import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 px-20 py-4 background-gradient">
      <ChatSection />
    </main>
  );
}
