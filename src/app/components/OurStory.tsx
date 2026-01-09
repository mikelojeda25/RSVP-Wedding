import React from "react";
import { ImageWithFallback } from "./image-rules/ImageWithFallback";

export function OurStory() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl mb-4 text-[#8b9eb5] italic">
            Our Story
          </h2>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl mb-4 text-[#8b9eb5]">How We Met</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              It was a rainy evening in Antipolo when our paths first crossed at
              the Vest in front of Robinsons Antipolo Mall. Sarah was searching
              for a rare edition of poetry, while Michael was lost in the travel
              section, planning his next adventure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We both reached for the same book at the same time, our hands
              touching briefly. That moment of serendipity turned into hours of
              conversation over coffee, and we've been inseparable ever since.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1660765035817-4b686af17664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHJvbWFudGljfGVufDF8fHx8MTc2Nzk0MzgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Romantic flowers"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689181273522-200c36e8c864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2Nzk0MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wedding rings"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-3xl mb-4 text-[#8b9eb5]">The Proposal</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Three years later, Michael planned a surprise trip back to
              Antipolo. As the sun set over the Cloud 9, he got down on one
              knee.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With tears of joy streaming down her face, Sarah said yes. Now
              we're ready to start the greatest adventure of all—spending the
              rest of our lives together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
