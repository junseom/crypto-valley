'use client';

import { useRouter } from 'next/navigation';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Profile() {
  const router = useRouter();
  const { handleLogOut, primaryWallet } = useDynamicContext();

  const disconnectWallet = () => {
    handleLogOut();
    router.push('/');
  };

  const user = {
    username: 'Coin User',
    likes: 2458,
    submits: 12,
    bio: 'I’m a technology enthusiast and crypto investor. I love to share my knowledge and experience with others. Feel free to reach out to me if you have any questions.',
    activityHistory: [
      { date: 'Dec 12, 2022', action: 'Submitted a post' },
      { date: 'Dec 10, 2022', action: 'Submitted a post' },
    ],
    rewards: {
      lifetime: '9289 SCV',
      monthly: '350 SCV',
      claimable: '200 SCV',
      subscription: '$0.00',
    },
    coins: [{ name: 'BitCoin', type: 'Lifetime Subscription' }],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      

      {/* Profile Content */}
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-600 flex-shrink-0"></div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-sm text-gray-400">
                {primaryWallet ? primaryWallet.address : 'No Wallet Connected'}
              </p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition duration-300"
          >
            Log Out
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{user.likes}</span>
            <span className="text-gray-400">Likes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{user.submits}</span>
            <span className="text-gray-400">Submits</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Bio</h2>
          <p className="text-gray-300">{user.bio}</p>
        </div>

        {/* Activity History */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Activity History</h2>
          <ul className="space-y-4">
            {user.activityHistory.map((activity, index) => (
              <li
                key={index}
                className="flex justify-between p-4 bg-gray-800 rounded-lg"
              >
                <span>{activity.date}</span>
                <span>{activity.action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rewards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Rewards</h2>
          <div className="p-4 bg-gray-800 rounded-lg">
            <p>Lifetime Rewards: {user.rewards.lifetime}</p>
            <p>Monthly Rewards: {user.rewards.monthly}</p>
            <p>Claimable Rewards: {user.rewards.claimable}</p>
            <p>Lifetime Subscription: {user.rewards.subscription}</p>
          </div>
        </div>

        {/* Coins */}
        <div>
          <h2 className="text-lg font-semibold mb-2">My Coins</h2>
          <ul className="space-y-4">
            {user.coins.map((coin, index) => (
              <li
                key={index}
                className="flex justify-between p-4 bg-gray-800 rounded-lg"
              >
                <span>{coin.name}</span>
                <span>{coin.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
