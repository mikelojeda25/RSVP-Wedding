import React from "react";
import { Calendar, Clock, MapPin, Music, Camera, Utensils } from "lucide-react";

export function Details() {
  const events = [
    {
      title: "Ceremony",
      time: "4:00 PM",
      location: "The International Shrine of Our Lady of Peace and Good Voyage",
      description:
        "Join us for an intimate outdoor ceremony surrounded by blooming roses and lavender.",
    },
    {
      title: "Cocktail Hour",
      time: "5:00 PM",
      location: "Terrace Lounge",
      description:
        "Enjoy signature cocktails and hors d'oeuvres while mingling with family and friends.",
    },
    {
      title: "Reception",
      time: "6:30 PM",
      location: "Grand Ballroom",
      description:
        "Celebrate with dinner, dancing, and unforgettable moments under the chandeliers.",
    },
  ];

  const details = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Venue",
      info: "The International Shrine of Our Lady of Peace and Good Voyage",
      subinfo: "Dela Paz St, Antipolo, 1870 Rizal",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Date",
      info: "June 15, 2026",
      subinfo: "Save the date!",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Dress Code",
      info: "Black Tie Optional",
      subinfo: "Dusty blue & champagne encouraged",
    },
  ];

  return (
    <div className="py-24 bg-[#f8f6f4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl mb-4 text-[#8b9eb5] italic">
            Wedding Details
          </h2>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">
            All the information you need for our special day
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {details.map((detail, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4 text-[#8b9eb5]">
                {detail.icon}
              </div>
              <h3 className="text-xl mb-2 text-[#8b9eb5]">{detail.title}</h3>
              <p className="text-gray-800 mb-1">{detail.info}</p>
              <p className="text-sm text-gray-600">{detail.subinfo}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h3 className="text-4xl text-center mb-12 text-[#8b9eb5] italic">
            Schedule of Events
          </h3>
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#8b9eb5] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  {index < events.length - 1 && (
                    <div className="w-px h-full bg-[#8b9eb5]/30 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="text-2xl text-[#8b9eb5]">{event.title}</h4>
                    <span className="text-lg text-gray-600">{event.time}</span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {event.location}
                  </p>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-[#8b9eb5] text-white rounded-lg p-8 shadow-lg">
            <Music className="w-10 h-10 mb-4" />
            <h3 className="text-2xl mb-4">Music & Dancing</h3>
            <p className="opacity-90">
              Live jazz during dinner followed by a DJ spinning your favorite
              tunes all night long. Don't forget your dancing shoes!
            </p>
          </div>
          <div className="bg-[#8b9eb5] text-white rounded-lg p-8 shadow-lg">
            <Camera className="w-10 h-10 mb-4" />
            <h3 className="text-2xl mb-4">Photography</h3>
            <p className="opacity-90">
              Our photographer will capture every special moment, but we'd love
              to see your photos too! Share using #SarahAndMichael2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
