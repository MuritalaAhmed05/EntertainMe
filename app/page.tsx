'use client'

import { useState } from 'react'
import { 
  Home, 
  MessageCircle, 
  Heart, 
  Zap, 
  Quote, 
  Gamepad,
  RefreshCw,
  ArrowRight,
  Laugh
} from 'lucide-react'
import CustomSidenav from '@/components/CustomSidenav'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      title: "Random Facts",
      description: "Discover fascinating facts about the world around us.",
      url: "/facts",
      icon: MessageCircle,
      color: "bg-blue-500",
    },
    {
      title: "Flirt Lines",
      description: "Get creative conversation starters for that special someone.",
      url: "/flirt-lines",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      title: "Insult Lines",
      description: "Playful roasts and witty comebacks for friendly banter.",
      url: "/insult-lines",
      icon: Zap,
      color: "bg-purple-500",
    },
    {
      title: "Jokes",
      description: "Hilarious jokes that will brighten your day.",
      url: "/jokes",
      icon: Laugh,
      color: "bg-yellow-500",
    },
    {
      title: "Quotes",
      description: "Inspiring words of wisdom from great minds.",
      url: "/quotes",
      icon: Quote,
      color: "bg-green-500",
    },
    {
      title: "Truth or Dare",
      description: "Exciting challenges and revealing questions for game night.",
      url: "/truth-or-dare",
      icon: Gamepad,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomSidenav />
      
      <div className="flex-1">
        <h1 className="text-center text-2xl font-bold">Made with Love by💖 
          <a href="https://wa.me/2349020507509" className='text-blue-600 underline'> Ahmed</a>
        </h1>
        <div className="max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Entertainment Hub</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your one-stop destination for facts, jokes, quotes, and more. Discover something new every day!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.url}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300">
                  {/* Card Header with Icon */}
                  <div className={`${feature.color} p-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="flex items-center text-blue-600 font-medium">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Entertained</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <RefreshCw className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Always Fresh</h3>
                    <p className="text-gray-600">New content available with just a click</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-pink-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Curated Content</h3>
                    <p className="text-gray-600">Carefully selected for maximum enjoyment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Easy Sharing</h3>
                    <p className="text-gray-600">Share your favorites with friends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}