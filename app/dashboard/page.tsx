import { supabase } from "@/lib/supabase";
import EventList from "@/components/EventList";

export default async function DashboardPage() {
  const { data: events, error } =
    await supabase
      .from("events")
      .select("*");

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-4xl font-bold text-blue-600">
    Campus Events Dashboard
  </h1>

  <div className="bg-white px-4 py-2 rounded shadow">
    <p className="text-gray-600">
      Total Events
    </p>

    <p className="text-2xl font-bold text-blue-600">
      {events?.length || 0}
    </p>
  </div>
</div>

      <EventList events={events || []} />
    </main>
  );
}