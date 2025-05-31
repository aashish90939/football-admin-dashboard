import React, { useEffect, useState } from "react";
import PlayerProfileModal from "./PlayerProfileModal";

const ProfileView = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    jersey_number: "",
    position: "",
    sub_role: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const token = localStorage.getItem("authToken");

  const fetchPlayerProfile = async () => {
    try {
      const res = await fetch(`/api/player_profiles/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jerseyNum = Number(formData.jersey_number);
    if (!jerseyNum || jerseyNum < 1 || jerseyNum > 40) {
      alert("Jersey number must be between 1 and 40.");
      return;
    }

    const form = new FormData();
    form.append("jersey_number", formData.jersey_number);
    form.append("position", formData.position);
    if (formData.sub_role) form.append("sub_role", formData.sub_role);
    form.append("photo", formData.photo);

    try {
      const res = await fetch("/api/player_profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const contentType = res.headers.get("content-type");

      if (res.ok) {
        const created = await res.json();
        setProfile(created.profile);
        setModalOpen(false);
      } else if (contentType?.includes("application/json")) {
        const error = await res.json();
        alert(error.error || "Failed to save profile.");
      } else {
        const errorText = await res.text();
        alert(errorText || "Unexpected error from server.");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (user?.membership_type === "player" && !profile) {
      fetchPlayerProfile();
    }
  }, [user, profile]);

  if (!user) {
    return <div className="p-6 text-red-600">Please log in first.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        👤 Membership Profile
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
        {profile?.photo_base64 ? (
          <img
            src={`data:image/jpeg;base64,${profile.photo_base64}`}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
          />
        ) : (
          <img
            src="/assets/default-user.png"
            alt="Default"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow"
          />
        )}
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Name: {user.name}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Email: {user.email}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Membership Type: {user.membership_type}
          </p>
        </div>
      </div>

      {user.membership_type === "player" && (
        <div className="mt-6">
          {profile ? (
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Player Details</h2>
              <p>
                <strong>Jersey:</strong> {profile.jersey_number}
              </p>
              <p>
                <strong>Position:</strong> {profile.position}
              </p>
              {profile.sub_role && (
                <p>
                  <strong>Sub-role:</strong> {profile.sub_role}
                </p>
              )}
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Create Player Profile
            </button>
          )}
        </div>
      )}

      <PlayerProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
      />
    </div>
  );
};

export default ProfileView;
