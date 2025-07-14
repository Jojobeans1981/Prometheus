// app/api/payment/route.ts
import { NextResponse } from 'next/server';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  const { orderID, plan, amount } = await request.json();
  
  try {
    // Save payment to Firestore
    await addDoc(collection(db, 'payments'), {
      orderID,
      plan,
      amount,
      status: 'completed',
      createdAt: new Date()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}