"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AddEventPage() {
  const [authorized, setAuthorized] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");

  const [posterFile, setPosterFile] =
    useState<File | null>(null);

  const [extracting, setExtracting] =
  useState(false);  
  const [posterUrl, setPosterUrl] =
  useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role !== "Admin") {
      window.location.href = "/dashboard";
    } else {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const aiResponse = await fetch(
        "/api/ai-summary",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            description,
          }),
        }
      );
const aiData =
  await aiResponse.json();

let posterUrl = "";

if (posterFile) {
  const fileName =
    `${Date.now()}-${posterFile.name}`;

  const { error: uploadError } =
    await supabase.storage
      .from("event-posters")
      .upload(
        fileName,
        posterFile
      );

  if (uploadError) {
  console.log(uploadError);

  alert(
    JSON.stringify(uploadError)
  );

  return;
}

  const { data } =
    supabase.storage
      .from("event-posters")
      .getPublicUrl(fileName);

  posterUrl =
    data.publicUrl;
}

const { error } = await supabase
  .from("events")
  .insert([
          {
            title,
            description,

            start_date: startDate,
            end_date: endDate,

            start_time: startTime,
            end_time: endTime,

            venue,
            category,
            poster_url:
                posterUrl,

            ai_summary:
              aiData.summary || "",
          },
        ]);

      if (error) {
        alert("Error adding event");
        console.log(error);
        return;
      }

      alert(
        "Event added successfully!"
      );

      setTitle("");
      setDescription("");

      setStartDate("");
      setEndDate("");

      setStartTime("");
      setEndTime("");

      setVenue("");
      setCategory("");

      setPosterFile(null);
    } catch (err) {
      console.log(err);
      alert(
        "Failed to generate AI summary"
      );
    }
  };

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Checking permissions...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Add New Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg"
      >
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
          required
        />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-3 border rounded text-black"
          required
        />

        <label className="font-semibold text-black">
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(
              e.target.value
            )
          }
          className="w-full p-3 border rounded text-black"
          required
        />

        <label className="font-semibold text-black">
          End Date
        </label>

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(
              e.target.value
            )
          }
          className="w-full p-3 border rounded text-black"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) =>
              setStartTime(
                e.target.value
              )
            }
            className="w-full p-3 border rounded text-black"
            required
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) =>
              setEndTime(
                e.target.value
              )
            }
            className="w-full p-3 border rounded text-black"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) =>
            setVenue(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full p-3 border rounded text-black"
          required
        >
          <option value="">
            Select Category
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

          <option value="Club Event">
            Club Event
          </option>

          <option value="Sports">
            Sports
          </option>
        </select>

        <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setPosterFile(file);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from("event-posters")
        .upload(fileName, file);

    if (error) {
      console.log(error);
      alert("Upload failed");
      return;
    }

    const { data } =
      supabase.storage
        .from("event-posters")
        .getPublicUrl(fileName);

    setPosterUrl(
      data.publicUrl
    );

    alert(
      "Poster uploaded successfully!"
    );
  }}
  className="w-full p-3 border rounded text-black"
/>

    <button
  type="button"
  disabled={
    extracting || !posterUrl
  }
  onClick={async () => {
    try {
      setExtracting(true);

      const response =
        await fetch(
          "/api/extract-poster",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              imageUrl:
                posterUrl,
            }),
          }
        );

      const data =
        await response.json();

      const jsonText =
        data.result
          .replace("```json", "")
          .replace("```", "")
          .trim();

      const extracted =
        JSON.parse(jsonText);

      setTitle(
        extracted.title || ""
      );

      setDescription(
        extracted.description || ""
      );

      setVenue(
        extracted.venue || ""
      );

      setCategory(
        extracted.category || ""
      );

      setStartDate(
        extracted.start_date || ""
      );

      setEndDate(
        extracted.end_date || ""
      );

      setStartTime(
        extracted.start_time || ""
      );

      setEndTime(
        extracted.end_time || ""
      );

      alert(
        "Fields auto-filled successfully!"
      );
    } catch (err) {
      console.log(err);

      alert(
        "Extraction failed"
      );
    } finally {
      setExtracting(false);
    }
  }}
  className="bg-green-600 text-white px-6 py-3 rounded"
>
  {extracting
    ? "Extracting..."
    : "Extract Details"}
</button>

<button
  type="submit"
  className="bg-blue-600 text-white px-6 py-3 rounded ml-3"
>
  Add Event
</button>

</form>
    </main>
  );
}