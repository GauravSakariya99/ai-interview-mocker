import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail } from "lucide-react"
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="relative">
        <Image
          src="/public/landing1.avif"
          alt="AI Insights"
          layout="fill"
          objectFit="cover"
          className="w-full h-screen"
        />
      </div>
      <div className="relative px-4 pt-6 pb-8 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
        <div className="lg:col-start-2 lg:pl-8">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Prepare for Your Dream Job with AI Interview Mocker
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Get ready for your upcoming interview with our AI-powered mock interview platform.
            </p>
            <div className="mt-8">
              <Button>
                <Mail /> Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
