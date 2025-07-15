// src/services/resumeService.ts
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { ResumeSubmission } from './../app/types';

export const resumeService = {
  async submitResume(data: Omit<ResumeSubmission, 'id' | 'createdAt' | 'updatedAt'>) {
    return addDoc(collection(db, 'submissions'), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async getSubmissions(): Promise<ResumeSubmission[]> {
    const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ResumeSubmission));
  },

  async updateStatus(id: string, status: ResumeSubmission['status']) {
    const docRef = doc(db, 'submissions', id);
    return updateDoc(docRef, {
      status,
      updatedAt: new Date()
    });
  }
};