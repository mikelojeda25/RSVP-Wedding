import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Users, Mail, Calendar, Loader2, Search, ArrowUpDown } from 'lucide-react';
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

type SortOption = 'latest' | 'oldest' | 'name';
type FilterOption = 'all' | 'attending' | 'declining';

export function AdminRSVPsPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  useEffect(() => {
    fetchRSVPs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [rsvps, searchQuery, sortBy, filterBy]);

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

  const applyFiltersAndSort = () => {
    let result = [...rsvps];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (rsvp) =>
          rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rsvp.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply attending filter
    if (filterBy === 'attending') {
      result = result.filter((rsvp) => rsvp.attending === 'yes');
    } else if (filterBy === 'declining') {
      result = result.filter((rsvp) => rsvp.attending === 'no');
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    setFilteredRsvps(result);
  };

  const attendingCount = rsvps.filter((r) => r.attending === 'yes').length;
  const decliningCount = rsvps.filter((r) => r.attending === 'no').length;
  const totalGuests = rsvps
    .filter((r) => r.attending === 'yes')
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-[#8b9eb5] italic">RSVP Management</h1>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto"></div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{attendingCount}</p>
            <p className="text-gray-600">Attending</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{decliningCount}</p>
            <p className="text-gray-600">Declining</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
            <Users className="w-10 h-10 text-[#8b9eb5] mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800 mb-1">{totalGuests}</p>
            <p className="text-gray-600">Total Guests</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b9eb5] focus:ring-2 focus:ring-[#8b9eb5]/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All RSVPs ({rsvps.length})</option>
                <option value="attending">Attending ({attendingCount})</option>
                <option value="declining">Declining ({decliningCount})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 text-center">
            Showing <span className="font-semibold text-[#8b9eb5]">{filteredRsvps.length}</span> of{' '}
            <span className="font-semibold text-[#8b9eb5]">{rsvps.length}</span> RSVPs
          </p>
        </div>

        {/* RSVP List */}
        {filteredRsvps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              {searchQuery || filterBy !== 'all' ? 'No RSVPs match your filters' : 'No RSVPs yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRsvps.map((rsvp, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4"
                style={{
                  borderLeftColor: rsvp.attending === 'yes' ? '#22c55e' : '#ef4444',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left side - Main info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-[#8b9eb5]">{rsvp.name}</h3>
                      {rsvp.attending === 'yes' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                          Attending
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                          Declining
                        </span>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#8b9eb5]" />
                        <span>{rsvp.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#8b9eb5]" />
                        <span>
                          {rsvp.guests} {parseInt(rsvp.guests) === 1 ? 'guest' : 'guests'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8b9eb5]" />
                        <span>{new Date(rsvp.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="text-xs">
                          {new Date(rsvp.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {rsvp.dietary && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <span className="text-sm text-amber-900 font-medium">Dietary: </span>
                        <span className="text-sm text-amber-800">{rsvp.dietary}</span>
                      </div>
                    )}

                    {rsvp.message && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 font-medium mb-2">Message:</p>
                        <p className="text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                          "{rsvp.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
