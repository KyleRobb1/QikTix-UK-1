export default function Page({ params }: { params: { eventId: string } }) {
  return (
    <div>
      <h1>Checkout for Event {params.eventId}</h1>
      <p>This is a placeholder for the Checkout page.</p>
    </div>
  );
}

