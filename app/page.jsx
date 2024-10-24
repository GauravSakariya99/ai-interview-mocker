//"use client"
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div>
      <Header />
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
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sakariya.gd@gmail.com&su=AI%20Interview%20Mocker%20-%20Contact%20Us&body=Hi%20Gaurav%2C%0A%0A%5BYOUR%20MESSAGE%5D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <Mail /> Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
