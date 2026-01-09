import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Users, Mail, Calendar, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface RSVPData {
  name: string;
  email: string;
  guests: string;
  attending: string;
  dietary: string;
  message: string;
  submittedAt: string;
}

export function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3f23999/rsvps`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch RSVPs');
      }

      setRsvps(data.rsvps || []);
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load RSVPs');
    } finally {
      setLoading(false);
    }
  };

  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const decliningCount = rsvps.filter(r => r.attending === 'no').length;
  const totalGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + parseInt(r.guests || '0'), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f4] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#8b9eb5] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f6f4] flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl text-gray-800 mb-2">Error Loading RSVPs</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f4] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-[#8b9eb5] italic">RSVP Responses</h1>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto"></div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="text-3xl text-gray-800 mb-1">{attendingCount}</p>
            <p className="text-gray-600">Attending</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-3xl text-gray-800 mb-1">{decliningCount}</p>
            <p className="text-gray-600">Declining</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-10 h-10 text-[#8b9eb5] mx-auto mb-3" />
            <p className="text-3xl text-gray-800 mb-1">{totalGuests}</p>
            <p className="text-gray-600">Total Guests</p>
          </div>
        </div>

        {/* RSVP List */}
        {rsvps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No RSVPs yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rsvps.map((rsvp, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl text-[#8b9eb5]">{rsvp.name}</h3>
                      {rsvp.attending === 'yes' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          Attending
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                          Declining
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {rsvp.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {rsvp.guests} {parseInt(rsvp.guests) === 1 ? 'guest' : 'guests'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(rsvp.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {rsvp.dietary && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600 font-medium">Dietary: </span>
                    <span className="text-sm text-gray-700">{rsvp.dietary}</span>
                  </div>
                )}

                {rsvp.message && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1 font-medium">Message:</p>
                    <p className="text-gray-700 italic">"{rsvp.message}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
