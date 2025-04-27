export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Event: {params.slug}</h1>
      <p className="text-gray-700 mb-2">This is a placeholder for the Event Detail page.</p>
      <p className="text-gray-500">Show event details here.</p>
    </div>
  );
}
