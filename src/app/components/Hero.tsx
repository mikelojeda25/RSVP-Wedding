import React from "react";
import { Heart } from "lucide-react";
import { ImageWithFallback } from "./image-rules/ImageWithFallback";
import { useState, useEffect } from "react";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("June 15, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/assets/couple.png"
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b9eb5]/60 via-[#8b9eb5]/40 to-[#8b9eb5]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-8 flex justify-center">
          <Heart className="w-16 h-16 animate-pulse" fill="currentColor" />
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl mb-6 italic">
          Sarah & Mike
        </h1>
        <div className="w-24 h-px bg-white mx-auto mb-6"></div>
        <p className="text-xl sm:text-2xl md:text-3xl mb-4 tracking-wide">
          Together with their families
        </p>
        <p className="text-lg sm:text-xl opacity-90 mb-8">
          invite you to celebrate their wedding
        </p>
        <div className="text-2xl sm:text-3xl">
          <p className="mb-2">June 15, 2026</p>
          <p className="text-lg opacity-90">
            The International Shrine of Our Lady of Peace and Good Voyage •
            Antipolo, Philippines
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-18 w-full">
          <p className="text-xl sm:text-2xl md:text-3xl tracking-wide mb-2">
            COUNTDOWN:
          </p>
          <div className="flex gap-4 text-3xl font-bold">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
