export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Campus Events Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-3 border rounded mb-6 text-black"
      />

      <div className="grid gap-4">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-black">
            AI Workshop
          </h2>
          <p className="text-gray-600">
            June 20, 2026 • Main Auditorium
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-black">
            Hackathon
          </h2>
          <p className="text-gray-600">
            June 25, 2026 • Innovation Lab
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-black">
            Placement Drive
          </h2>
          <p className="text-gray-600">
            June 30, 2026 • Seminar Hall
          </p>
        </div>

      </div>
    </main>
  );
}