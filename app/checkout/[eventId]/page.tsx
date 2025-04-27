export default function Page({ params }: { params: { eventId: string } }) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Checkout for Event {params.eventId}</h1>
      <p className="text-gray-700 mb-2">This is a placeholder for the Checkout page.</p>
      <p className="text-gray-500">Implement your checkout flow here.</p>
    </div>
  );
}
