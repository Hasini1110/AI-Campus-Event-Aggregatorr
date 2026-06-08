export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
          Create Account
        </h1>

        <form className="flex flex-col gap-4">

          <div>
            <label className="block mb-1 font-medium text-black">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border p-3 rounded text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border p-3 rounded text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Role
            </label>
            <select className="w-full border p-3 rounded text-black">
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded"
          >
            Register
          </button>

        </form>
      </div>
    </main>
  );
}