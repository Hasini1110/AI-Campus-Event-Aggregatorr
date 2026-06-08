export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Student Login
      </h1>

      <form className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}