import React from 'react';
import type { Service, WalletBonus, Order, User, Testimonial } from './types';

const SpotifyIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.33c-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.89-1.42 1.4-3.05 1.4-4.83 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.54-.42 2.92-1.12 4.14-.2.32-.59.43-.9.23s-.43-.59-.23-.9C14.79 12.3 15.25 11 15.25 9.5c0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.25-.37 2.33-1.02 3.25-.2.32-.59.43-.9.23s-.43-.59-.23-.9c.55-.78.85-1.73.85-2.75 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 .78-.22 1.48-.63 2.08-.2.32-.59.43-.9.23-.32-.2-.43-.59-.23-.9.33-.47.51-1.02.51-1.61 0-.41-.34-.75-.75-.75S7 8.67 7 9.08c0 2.37 1.03 4.49 2.75 5.92.32.2.43.59.23.9s-.59.43-.9.23C7.51 14.88 6.5 12.83 6.5 10.5c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5c0 2.21-.81 4.2-2.11 5.83z" />
  </svg>
);

const UserGroupIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.513-.464c1.2-1.09 2.733-1.09 3.933 0c1.2 1.09 2.733 1.09 3.933 0c.513-.464 1.2-1.09 2.733-1.09 1.533 0 2.22.626 2.733 1.09M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12z" />
  </svg>
);

const UserPlusIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

const PodcastIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

export const UserCircleIcon = ({className = "w-6 h-6"}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'plays',
    slug: 'buy-spotify-plays',
    name: 'Spotify Plays',
    shortDescription: 'Boost your track\'s visibility and trigger the Spotify algorithm with high-quality plays.',
    description: 'Boost your track\'s visibility with high-quality plays.', // Kept for admin services page
    icon: <SpotifyIcon className="w-10 h-10 text-[#1DB954]" />,
    packages: [
      { id: 'p1', name: 'Starter Boost', quantity: 1000, price: 5.00, description: 'Ideal for new tracks'},
      { id: 'p2', name: 'Artist Pro', quantity: 5000, price: 20.00, description: 'Best value for playlist potential', isMostPopular: true },
      { id: 'p3', name: 'Viral Push', quantity: 25000, price: 90.00, description: 'Maximum impact for serious campaigns'},
    ],
  },
  {
    id: 'listeners',
    slug: 'buy-spotify-monthly-listeners',
    name: 'Spotify Monthly Listeners',
    shortDescription: 'Increase your monthly listener count to attract fans, blogs, and industry professionals.',
    description: 'Increase your monthly listener count to attract more fans.',
    icon: <UserGroupIcon className="w-10 h-10 text-[#1DB954]" />,
    packages: [
      { id: 'l1', name: 'Profile Starter', quantity: 1000, price: 10.00, description: 'Get the ball rolling'},
      { id: 'l2', name: 'Industry Standard', quantity: 5000, price: 45.00, description: 'The most popular choice for serious artists', isMostPopular: true},
      { id: 'l3', name: 'Label Ready', quantity: 20000, price: 160.00, description: 'Show you have a dedicated following'},
    ],
  },
  {
    id: 'followers',
    slug: 'buy-spotify-followers',
    name: 'Spotify Followers',
    shortDescription: 'Grow your artist profile with genuine followers to build a long-term, dedicated fanbase.',
    description: 'Grow your artist profile with genuine followers.',
    icon: <UserPlusIcon className="w-10 h-10 text-[#1DB954]" />,
    packages: [
      { id: 'f1', name: 'Fan Starter', quantity: 250, price: 8.00, description: 'A great start to build your tribe'},
      { id: 'f2', name: 'Superfan Builder', quantity: 1000, price: 25.00, description: 'Build a solid, loyal audience', isMostPopular: true},
      { id: 'f3', name: 'Community Creator', quantity: 5000, price: 100.00, description: 'Create a massive community of fans'},
    ],
  },
  {
    id: 'podcast',
    slug: 'buy-spotify-podcast-plays',
    name: 'Spotify Podcast Plays',
    shortDescription: 'Get your podcast heard, climb the charts, and attract sponsors with more episode plays.',
    description: 'Get your podcast heard by a wider audience.',
    icon: <PodcastIcon className="w-10 h-10 text-[#1DB954]" />,
    packages: [
      { id: 'pc1', name: 'Episode Boost', quantity: 1000, price: 12.00, description: 'Boost a new or existing episode'},
      { id: 'pc2', name: 'Chart Topper', quantity: 5000, price: 55.00, description: 'Aim for the Spotify podcast charts', isMostPopular: true },
      { id: 'pc3', name: 'Sponsor Magnet', quantity: 20000, price: 200.00, description: 'Attract brands and sponsors with big numbers'},
    ],
  },
];

export const WALLET_BONUSES: WalletBonus[] = [
    { addAmount: 20, bonusAmount: 1, total: 21 },
    { addAmount: 50, bonusAmount: 5, total: 55 },
    { addAmount: 100, bonusAmount: 15, total: 115 },
    { addAmount: 250, bonusAmount: 50, total: 300 },
];

export const ORDER_HISTORY: Order[] = [
    {
      id: 'ORD-001',
      userEmail: 'user@example.com',
      serviceName: 'Spotify Plays',
      quantity: 5000,
      url: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
      price: 20.00,
      status: 'Completed',
      date: '2023-10-26',
    },
    {
      id: 'ORD-002',
      userEmail: 'user@example.com',
      serviceName: 'Spotify Followers',
      quantity: 1000,
      url: 'https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY',
      price: 25.00,
      status: 'Completed',
      date: '2023-10-22',
    },
    {
      id: 'ORD-003',
      userEmail: 'user@example.com',
      serviceName: 'Spotify Monthly Listeners',
      quantity: 1000,
      url: 'https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY',
      price: 10.00,
      status: 'In Progress',
      date: '2023-10-28',
    },
    {
      id: 'ORD-004',
      userEmail: 'user@example.com',
      serviceName: 'Spotify Podcast Plays',
      quantity: 5000,
      url: 'https://open.spotify.com/episode/6l6Vb01e3A4yZ4i4J4Z4Z4',
      price: 55.00,
      status: 'Pending',
      date: '2023-10-29',
    },
    {
      id: 'ORD-005',
      userEmail: 'user@example.com',
      serviceName: 'Spotify Plays',
      quantity: 1000,
      url: 'https://open.spotify.com/track/1a2b3c4d5e6f7g8h9i0j',
      price: 5.00,
      status: 'Cancelled',
      date: '2023-10-15',
    },
];

export const MOCK_USERS: User[] = [
    { email: 'admin@spotifyboost.com', name: 'Admin User', isAdmin: true },
    { email: 'user@example.com', name: 'Returning User' },
    { email: 'djkhaled@music.com', name: 'DJ Khaled' },
    { email: 'mia@wong.music', name: 'Mia Wong' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex R.",
    handle: "@indiepop",
    avatar: "https://picsum.photos/id/1025/100/100",
    review: "My song's visibility exploded after using this service. Finally got on a Discover Weekly playlist!",
    rating: 5,
  },
  {
    name: "Jenna L.",
    handle: "@singersongwriter",
    avatar: "https://picsum.photos/id/1011/100/100",
    review: "The jump in my numbers got me noticed by two different music blogs. It’s a huge credibility boost.",
    rating: 5,
  },
  {
    name: "Marco V.",
    handle: "@djmarco",
    avatar: "https://picsum.photos/id/1012/100/100",
    review: "Incredible results! The plays were delivered fast and looked completely organic. Highly recommend.",
    rating: 4,
  },
  {
    name: "Sarah K.",
    handle: "@marketingminds",
    avatar: "https://picsum.photos/id/1005/100/100",
    review: "If you're serious about your music, this is a must-have. The followers gave my profile the professional look it needed.",
    rating: 5,
  }
];


export const ABOUT_US_CONTENT = `
  <p class="mb-4">Welcome to SpotifyBoost, your premier partner in amplifying your musical journey. Founded by a team of music lovers, data scientists, and marketing experts, we understand the challenges artists face in a crowded digital landscape.</p>
  <p class="mb-4">Our mission is simple: to provide effective, reliable, and safe solutions to help you increase your visibility on Spotify. We believe that great music deserves to be heard, and our services are designed to give your tracks, profiles, and podcasts the initial momentum they need to reach a wider audience.</p>
  <p class="mb-4">Using cutting-edge promotional techniques, we connect your music with real listeners, ensuring organic growth and meaningful engagement. Our innovative wallet system is designed to provide you with the best value, rewarding your commitment to growth with generous bonuses.</p>
  <p class="mb-4">Join the thousands of artists who have trusted SpotifyBoost to elevate their careers. Let's make some noise together.</p>
`;

export const PRIVACY_POLICY_CONTENT = `
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">1. Information We Collect</h3>
  <p class="mb-4">We collect information you provide directly to us, such as when you create an account, add funds to your wallet, or place an order. This includes your name, email address, phone number, and Spotify URLs.</p>
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">2. How We Use Your Information</h3>
  <p class="mb-4">We use your information to operate, maintain, and provide the features and functionality of our services, to process transactions, and to communicate with you about your orders and our platform.</p>
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">3. Information Sharing</h3>
  <p class="mb-4">We do not share your personal information with third parties except as necessary to provide our services (e.g., to process payments) or as required by law. Your Spotify data is used solely for the purpose of fulfilling your orders.</p>
`;

export const REFUND_POLICY_CONTENT = `
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">1. Wallet Funds</h3>
  <p class="mb-4">Funds added to your wallet are non-refundable. The bonus amounts credited to your wallet are promotional and hold no cash value. By adding funds, you agree that you are purchasing a balance to be used exclusively for services on our platform.</p>
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">2. Service Orders</h3>
  <p class="mb-4">We strive for 100% satisfaction. If we fail to deliver the services as described within the specified timeframe, you may be eligible for a credit to your wallet. We do not offer cash refunds for completed or partially completed orders.</p>
  <h3 class="text-xl font-bold mb-2 text-[#1DB954]">3. Order Issues</h3>
  <p class="mb-4">If you provide an incorrect URL or your content is removed from Spotify, we are not responsible for the non-delivery of the service and no refund or credit will be issued. Please double-check all information before submitting an order.</p>
`;