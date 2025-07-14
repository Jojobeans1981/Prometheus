// app/dashboard/page.tsx
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
      if (user) fetchSubmissions();
    });

    return () => unsubscribe();
  }, []);

  const fetchSubmissions = async () => {
    const snapshot = await getDocs(collection(db, 'submissions'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSubmissions(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Submissions</h1>
        <button 
          onClick={() => auth.signOut()}
          className="text-orange-500 hover:underline"
        >
          Sign Out
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Target Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">{submission.name}</td>
                <td className="py-3 px-4">{submission.email}</td>
                <td className="py-3 px-4">{submission.targetRole}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    submission.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {submission.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <a 
                    href={submission.resumeUrl} 
                    target="_blank"
                    className="text-orange-500 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}