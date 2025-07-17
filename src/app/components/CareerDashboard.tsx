'use client';

import { useState, useEffect } from 'react';
import useAuth from '../../../lib/auth';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function CareerDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    interviewRate: 0,
    skillGap: 0,
    futureProofScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user) return;
      
      try {
        const metricsRef = collection(db, 'userMetrics');
        const q = query(metricsRef, where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setMetrics({
            interviewRate: data.interviewRate || 0,
            skillGap: data.skillGap || 0,
            futureProofScore: data.futureProofScore || 0
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching career metrics:', error);
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-lg animate-pulse">
        <div className="h-8 bg-orange-400 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 p-4 rounded-lg h-24"></div>
          <div className="bg-white/20 p-4 rounded-lg h-24"></div>
          <div className="bg-white/20 p-4 rounded-lg h-24"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Your Career Trajectory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="bg-white/20 p-4 rounded-lg backdrop-blur-sm"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h3 className="font-semibold">Interview Conversion</h3>
          <p className="text-3xl mt-2 font-bold">{metrics.interviewRate}%</p>
          <p className="text-sm opacity-80 mt-1">Based on your applications</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/20 p-4 rounded-lg backdrop-blur-sm"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h3 className="font-semibold">Skill Gap</h3>
          <p className="text-3xl mt-2 font-bold">{metrics.skillGap}%</p>
          <p className="text-sm opacity-80 mt-1">Compared to target roles</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/20 p-4 rounded-lg backdrop-blur-sm"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h3 className="font-semibold">Future-Proof Score</h3>
          <p className="text-3xl mt-2 font-bold">{metrics.futureProofScore}/100</p>
          <p className="text-sm opacity-80 mt-1">Industry relevance in 2 years</p>
        </motion.div>
      </div>
    </motion.div>
  );
}