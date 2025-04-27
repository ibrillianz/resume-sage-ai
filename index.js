import Head from 'next/head';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: new Date()
      });
      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error("Error adding email: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Head>
        <title>MindCrafting Careers</title>
        <meta name="description" content="Your Mind. Your Career. Your Way." />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <img src="/logo.svg" alt="MindCrafting Careers Logo" width="200" height="200" className="mb-6" />

        <h1 className="text-4xl font-bold text-blue-700">MindCrafting Careers</h1>
        <p className="mt-4 text-lg text-gray-600">"Your Mind. Your Career. Your Way."</p>
        
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Notify Me
          </button>
        </form>

        {success && (
          <p className="mt-4 text-green-600">Thanks! We’ll notify you when we launch 🚀</p>
        )}
      </main>
    </div>
  );
}
