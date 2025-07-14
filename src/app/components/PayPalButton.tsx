// components/PayPalButton.tsx
'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function PayPalButton({ plan }: { plan: 'basic' | 'pro' }) {
  const [{ isPending }] = usePayPalScriptReducer();
  const amount = plan === 'basic' ? "29.00" : "49.00";

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        description: `${plan === 'basic' ? 'Basic' : 'Pro'} Resume Optimization`,
        amount: {
          value: amount,
        }
      }]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    const order = await actions.order.capture();
    // Save transaction to database
    await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        orderID: data.orderID,
        plan,
        amount
      })
    });
    window.location.href = `/thank-you?order_id=${data.orderID}`;
  };

  return (
    <div className="mt-6">
      {isPending ? (
        <div className="animate-pulse bg-gray-200 h-12 rounded-md" />
      ) : (
        <PayPalButtons 
          style={{ layout: "horizontal", height: 48 }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </div>
  );
}