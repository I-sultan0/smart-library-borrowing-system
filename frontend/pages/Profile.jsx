import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Loader from "../components/Loader";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Profile</h1>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                "
              >
                {profile.name[0].toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>

                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="text-gray-500">Active Borrows</h3>

                <p className="text-3xl font-bold">{profile.activeBorrows}</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg">
                <h3 className="text-gray-500">Total Borrows</h3>

                <p className="text-3xl font-bold">{profile.totalBorrows}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
