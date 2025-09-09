'use client';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const tran_id = searchParams.get('tran_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');

  if (!tran_id) {
    return <p>Transaction data not found.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">✅ Payment Cancel</h1>
      <p>Transaction ID: {tran_id}</p>
      <p>Amount: {amount} {currency}</p>
    </div>
  );
}
