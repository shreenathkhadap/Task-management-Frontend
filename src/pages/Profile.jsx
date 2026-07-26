import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/profileService";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-br from-slate-50 to-gray-100">
        <Navbar />

        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {user.name}
                </h2>

                <p className="text-gray-500">{user.email}</p>

                <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Active User
                </span>
              </div>
            </div>

            <hr className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Email Address</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Account Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>

              <div>
                <p className="text-gray-500">Member Since</p>
                <p className="text-lg font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
                Edit Profile
              </button>

              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
