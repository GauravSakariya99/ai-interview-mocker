import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail } from "lucide-react"
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Welcome to Your Personal AI Coach</h1>
      <Button>
        <Mail /> Contact Us
      </Button>
    </div>
  );
}
