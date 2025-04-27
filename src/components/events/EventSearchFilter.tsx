'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiCalendar, FiTag, FiFilter } from 'react-icons/fi';

export default function EventSearchFilter() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for events"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="">All Locations</option>
            <option value="london">London</option>
            <option value="manchester">Manchester</option>
            <option value="birmingham">Birmingham</option>
            <option value="edinburgh">Edinburgh</option>
            <option value="glasgow">Glasgow</option>
            <option value="cardiff">Cardiff</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleFilters}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <FiFilter className="mr-2" />
          Filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Search
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-6 mt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiCalendar className="mr-2" />
              Date
            </label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="this-weekend">This Weekend</option>
              <option value="next-week">Next Week</option>
              <option value="next-month">Next Month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiTag className="mr-2" />
              Category
            </label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="music">Music</option>
              <option value="arts">Arts & Theatre</option>
              <option value="sports">Sports</option>
              <option value="food">Food & Drink</option>
              <option value="business">Business & Networking</option>
              <option value="tech">Technology</option>
              <option value="comedy">Comedy</option>
              <option value="family">Family & Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Min"
                min="0"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              id="free-events"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="free-events" className="ml-2 block text-sm text-gray-700">
              Free Events Only
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="online-events"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="online-events" className="ml-2 block text-sm text-gray-700">
              Online Events
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="accessible"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accessible" className="ml-2 block text-sm text-gray-700">
              Accessible Venues
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
