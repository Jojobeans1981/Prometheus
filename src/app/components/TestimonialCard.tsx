// components/TestimonialCard.tsx
'use client';

import { motion } from 'framer-motion';

export default function TestimonialCard({ 
  name, 
  role, 
  content,
  avatar 
}: { 
  name: string; 
  role: string; 
  content: string;
  avatar: string;
}) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-orange-100 dark:border-orange-900/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-0.5">
          <div className="bg-white dark:bg-gray-800 rounded-full p-0.5">
            <img 
              src={avatar} 
              alt={name} 
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{name}</h3>
          <p className="text-orange-500 dark:text-orange-400">{role}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-gray-700 dark:text-gray-300 italic">
        "{content}"
      </blockquote>
    </motion.div>
  );
}