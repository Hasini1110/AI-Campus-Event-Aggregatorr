"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { supabase } from "@/lib/supabase";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } =
      await supabase
        .from("events")
        .select("*");

    if (!error && data) {
      setEvents(data);
    }
  }

  const selectedEvents =
    events.filter((event) => {
      const eventDate =
        new Date(event.start_date);

      return (
        eventDate.toDateString() ===
        selectedDate.toDateString()
      );
    });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Event Calendar
      </h1>

      <div className="bg-white p-6 rounded shadow">
        <Calendar
          onChange={(value) =>
            setSelectedDate(
              value as Date
            )
          }
          value={selectedDate}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">
          Events on{" "}
          {selectedDate.toDateString()}
        </h2>

        {selectedEvents.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          selectedEvents.map(
            (event) => (
              <div
                key={event.id}
                className="bg-white p-4 rounded shadow mb-3"
              >
                <h3 className="text-xl font-bold">
                  {event.title}
                </h3>

                <p>
                  📍 {event.venue}
                </p>

                <p>
                  🏷️ {event.category}
                </p>
              </div>
            )
          )
        )}
      </div>
    </main>
  );
}