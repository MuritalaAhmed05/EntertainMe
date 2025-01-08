'use client'

import { useState, useEffect } from 'react'
import { fetchData } from '@/app/utils/api'
import { ContentCard } from '@/components/ContentCard'
import { RefreshCw, Copy, Share2 } from 'lucide-react'
import CustomSidenav from '@/components/CustomSidenav'

export default function Quotes() {
  const [quote, setQuote] = useState({ body: '', author: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchQuote = async () => {
    try {
      setIsRefreshing(true)
      const data = await fetchData('quotes')
      setQuote(data.result)
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.body}"\n\n- ${quote.author}`)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomSidenav />
      
      <div className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotes</h1>
            <p className="text-gray-600">Discover inspiring words of wisdom from great minds.</p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Today's Quote</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  <Copy className="h-5 w-5 text-gray-600" />
                  {isCopied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                      Copied!
                    </span>
                  )}
                </button>
                <button
                  onClick={fetchQuote}
                  disabled={isRefreshing}
                  className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                    isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Get new quote"
                >
                  <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    // Add share functionality
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Share quote"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 ml-auto"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg leading-relaxed italic">"{quote.body}"</p>
                  <p className="text-gray-600 text-right">- {quote.author}</p>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Click the refresh button to get a new quote!
              </p>
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Inspiration</h3>
              <p className="text-gray-600">
                Our quotes are carefully curated to inspire and motivate you every day.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Wisdom</h3>
              <p className="text-gray-600">
                Found an inspiring quote? Share it with friends using the share button!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}