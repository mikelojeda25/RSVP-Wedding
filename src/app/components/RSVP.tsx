import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: '',
    dietary: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3f23999/rsvp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      console.log('RSVP submitted successfully:', data);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          guests: '1',
          attending: '',
          dietary: '',
          message: '',
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-24 bg-[#f8f6f4] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#8b9eb5]/20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-[#8b9eb5]/20 rounded-full"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl mb-4 text-[#8b9eb5] italic">RSVP</h2>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">Please respond by May 15, 2026</p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <Heart className="w-16 h-16 text-[#8b9eb5] mx-auto mb-6" fill="currentColor" />
            <h3 className="text-3xl text-[#8b9eb5] mb-4">Thank You!</h3>
            <p className="text-xl text-gray-700">
              We've received your RSVP and can't wait to celebrate with you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="attending" className="block text-sm mb-2 text-gray-700">
                  Will you be attending? *
                </label>
                <select
                  id="attending"
                  name="attending"
                  required
                  value={formData.attending}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
                >
                  <option value="">Please select</option>
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm mb-2 text-gray-700">
                  Number of Guests *
                </label>
                <select
                  id="guests"
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="dietary" className="block text-sm mb-2 text-gray-700">
                Dietary Restrictions
              </label>
              <input
                type="text"
                id="dietary"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
                placeholder="Vegetarian, vegan, allergies, etc."
              />
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                Message to the Couple
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all resize-none"
                placeholder="Share your well wishes..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8b9eb5] text-white py-4 rounded-lg hover:bg-[#7a8da4] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}
          </form>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Questions or need to update your RSVP?</p>
          <a
            href="mailto:sarahandmichael@wedding.com"
            className="text-[#8b9eb5] hover:underline"
          >
            Contact us at sarahandmichael@wedding.com
          </a>
        </div>
      </div>
    </div>
  );
}