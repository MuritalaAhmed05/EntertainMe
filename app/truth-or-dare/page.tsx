'use client'

import { useState, useEffect } from 'react'
import { fetchData } from '@/app/utils/api'
import { ContentCard } from '@/components/ContentCard'
import { RefreshCw, Copy, Share2 } from 'lucide-react'
import CustomSidenav from '@/components/CustomSidenav'


export default function TruthOrDare() {
  const [truth, setTruth] = useState('')
  const [dare, setDare] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isCopiedTruth, setIsCopiedTruth] = useState(false)
  const [isCopiedDare, setIsCopiedDare] = useState(false)
  const [isRefreshingTruth, setIsRefreshingTruth] = useState(false)
  const [isRefreshingDare, setIsRefreshingDare] = useState(false)

  const fetchTruthAndDare = async () => {
    try {
      setIsLoading(true)
      const [truthData, dareData] = await Promise.all([
        fetchData('truth'),
        fetchData('dare')
      ])
      setTruth(truthData.result)
      setDare(dareData.result)
    } catch (error) {
      console.error('Error fetching truth or dare:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTruth = async () => {
    try {
      setIsRefreshingTruth(true)
      const data = await fetchData('truth')
      setTruth(data.result)
    } catch (error) {
      console.error('Error fetching truth:', error)
    } finally {
      setIsRefreshingTruth(false)
    }
  }

  const fetchDare = async () => {
    try {
      setIsRefreshingDare(true)
      const data = await fetchData('dare')
      setDare(data.result)
    } catch (error) {
      console.error('Error fetching dare:', error)
    } finally {
      setIsRefreshingDare(false)
    }
  }

  const copyToClipboard = async (text:any, setIsCopied:any) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  useEffect(() => {
    fetchTruthAndDare()
  }, [])

  const CardContent = ({ title, content, isRefreshing, isCopied, onRefresh, onCopy }:any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={onCopy}
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
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={`Get new ${title.toLowerCase()}`}
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              // Add share functionality
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            title={`Share ${title.toLowerCase()}`}
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <p className="text-gray-700 text-lg leading-relaxed">{content}</p>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Click the refresh button to get a new {title.toLowerCase()}!
        </p>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomSidenav />
      
      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Truth or Dare</h1>
            <p className="text-gray-600">Choose your challenge: answer truthfully or take on a dare!</p>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2">
            <CardContent
              title="Truth"
              content={truth}
              isRefreshing={isRefreshingTruth}
              isCopied={isCopiedTruth}
              onRefresh={fetchTruth}
              onCopy={() => copyToClipboard(truth, setIsCopiedTruth)}
            />
            <CardContent
              title="Dare"
              content={dare}
              isRefreshing={isRefreshingDare}
              isCopied={isCopiedDare}
              onRefresh={fetchDare}
              onCopy={() => copyToClipboard(dare, setIsCopiedDare)}
            />
          </div>

          {/* Additional Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fun for Everyone</h3>
              <p className="text-gray-600">
                Our truth or dare questions are designed for entertaining and friendly gameplay.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Share the Fun</h3>
              <p className="text-gray-600">
                Found a great question? Share it with friends using the share button!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}