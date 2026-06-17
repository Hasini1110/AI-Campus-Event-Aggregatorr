"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
const getEventStatus = (event: any) => {
  const now = new Date();

  const start = new Date(
    `${event.start_date}T${event.start_time}`
  );

  const end = new Date(
    `${event.end_date}T${event.end_time}`
  );

  if (now < start) {
    return {
      text: "🟢 Upcoming",
      color: "text-green-600",
    };
  }

  if (now > end) {
    return {
      text: "🔴 Completed",
      color: "text-red-600",
    };
  }

  return {
    text: "🟡 Ongoing",
    color: "text-yellow-600",
  };
};


export default function EventList({
  events,
}: {
  events: any[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] =
  useState("");
  const [role, setRole] = useState("");
  const [eventList, setEventList] = useState(events);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] =
    useState("");
  const [editVenue, setEditVenue] = useState("");

  const [editStartDate, setEditStartDate] =
    useState("");
  const [editEndDate, setEditEndDate] =
    useState("");

  const [editStartTime, setEditStartTime] =
    useState("");
  const [editEndTime, setEditEndTime] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");

  useEffect(() => {
    const storedRole =
      localStorage.getItem("userRole") || "";

    setRole(storedRole);
  }, []);

  const handleDelete = async (
    eventId: number
  ) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const { data, error } = await supabase
  .from("events")
  .delete()
  .eq("id", eventId)
  .select();

console.log("Deleted:", data);
console.log("Error:", error);

    if (error) {
      alert("Failed to delete event");
      return;
    }

    alert("Event deleted successfully");

    setEventList(
      eventList.filter(
        (event) => event.id !== eventId
      )
    );
  };

  const startEditing = (event: any) => {
    setEditingId(event.id);

    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditVenue(event.venue);

    setEditStartDate(
      event.start_date || ""
    );

    setEditEndDate(
      event.end_date || ""
    );

    setEditStartTime(
      event.start_time || ""
    );

    setEditEndTime(
      event.end_time || ""
    );

    setEditCategory(event.category);
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("events")
      .update({
        title: editTitle,
        description: editDescription,
        venue: editVenue,

        start_date: editStartDate,
        end_date: editEndDate,

        start_time: editStartTime,
        end_time: editEndTime,

        category: editCategory,
      })
      .eq("id", editingId);

    if (error) {
      alert("Failed to update event");
      return;
    }

    alert("Event updated successfully");

    setEventList(
      eventList.map((event) =>
        event.id === editingId
          ? {
              ...event,
              title: editTitle,
              description: editDescription,
              venue: editVenue,

              start_date: editStartDate,
              end_date: editEndDate,

              start_time: editStartTime,
              end_time: editEndTime,

              category: editCategory,
            }
          : event
      )
    );

    setEditingId(null);
  };

  const filteredEvents = eventList.filter(
  (event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "" ||
      event.category === category;

    const matchesDate =
      selectedDate === "" ||
      event.start_date === selectedDate ||
      event.end_date === selectedDate;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate
    );
  }
);



  return (
    <>
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 border rounded mb-4 text-black"
      />

      <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="w-full p-3 border rounded mb-6 text-black"
>
  <option value="">
    All Categories
  </option>

  <option value="Workshop">
    Workshop
  </option>

  <option value="Hackathon">
    Hackathon
  </option>

  <option value="Placement">
    Placement
  </option>

  <option value="Seminar">
    Seminar
  </option>

  <option value="Sports">
    Sports
  </option>

  <option value="Club Event">
    Club Event
  </option>
</select>

<input
  type="date"
  value={selectedDate}
  onChange={(e) =>
    setSelectedDate(e.target.value)
  }
  className="w-full p-3 border rounded mb-6 text-black"
/>

      <div className="grid gap-4">
        {filteredEvents.map(
          (event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded shadow"
            >
              {editingId === event.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <input
                    value={editVenue}
                    onChange={(e) =>
                      setEditVenue(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <input
                    type="date"
                    value={editStartDate}
                    onChange={(e) =>
                      setEditStartDate(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <input
                    type="date"
                    value={editEndDate}
                    onChange={(e) =>
                      setEditEndDate(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <input
                    type="time"
                    value={editStartTime}
                    onChange={(e) =>
                      setEditStartTime(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <input
                    type="time"
                    value={editEndTime}
                    onChange={(e) =>
                      setEditEndTime(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  />

                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(
                        e.target.value
                      )
                    }
                    className="w-full border p-2 rounded mb-2 text-black"
                  >
                    <option value="Workshop">
                      Workshop
                    </option>

                    <option value="Hackathon">
                      Hackathon
                    </option>

                    <option value="Placement">
                      Placement
                    </option>

                    <option value="Seminar">
                      Seminar
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Club Event">
                      Club Event
                    </option>
                  </select>

                  <button
                    onClick={saveChanges}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                 {event.poster_url && (
  <img
    src={event.poster_url}
    alt={event.title}
    className="w-83 h-83 object-contain border rounded mb-4 mx-auto"
  />
)}

<h2 className="text-xl font-semibold text-black">
  {event.title}
</h2>

                  <p className="text-gray-600">
                    Start:
                    {" "}
                    {event.start_date}
                    {" "}
                    {event.start_time}
                  </p>

                  <p className="text-gray-600">
                    End:
                    {" "}
                    {event.end_date}
                    {" "}
                    {event.end_time}
                  </p>

                  <p className="text-gray-600">
                    Venue:
                    {" "}
                    {event.venue}
                  </p>

                  <p className="text-gray-700 mt-2">
  {event.description}
</p>

{event.ai_summary && (
  <div className="mt-3 p-3 bg-blue-50 border rounded">
    <p className="font-semibold text-blue-700">
      AI Summary
    </p>

    <p className="text-gray-700 text-sm">
      {event.ai_summary}
    </p>
  </div>
)}

<p className="text-blue-600 mt-2 font-medium">
  {event.category}
</p>

<p
  className={`mt-2 font-semibold ${
    getEventStatus(event).color
  }`}
>
  {getEventStatus(event).text}
</p>

                  {role === "Admin" && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() =>
                          startEditing(
                            event
                          )
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit Event
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            event.id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete Event
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}