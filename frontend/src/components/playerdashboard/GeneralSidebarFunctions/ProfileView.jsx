import React, { useEffect, useState } from "react";
import PlayerProfileModal from "./PlayerProfileModal";
import { usePlayers } from "../../../context/PlayersContext";

const ProfileView = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const { enrichedPlayers, loading } = usePlayers();

  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    jersey_number: "",
    position: "",
    sub_role: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!user || !enrichedPlayers?.length) return;
    const enrichedProfile = enrichedPlayers.find((p) => p.user_id === user.id);
    if (enrichedProfile) setProfile(enrichedProfile);
  }, [enrichedPlayers, user]);

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
    if (formData.photo) form.append("photo", formData.photo);

    const url =
      profile && isEditMode
        ? `/api/player_profiles/${profile.id}`
        : `/api/player_profiles`;

    const method = profile && isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const contentType = res.headers.get("content-type");

      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile || data);
        setModalOpen(false);
        setIsEditMode(false);
      } else if (contentType?.includes("application/json")) {
        const error = await res.json();
        alert(error.error || "Failed to save profile.");
      } else {
        const errorText = await res.text();
        alert(errorText || "Unexpected error from server.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!user) {
    return <div className="p-6 text-red-600">Please log in first.</div>;
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading player profile...</div>;
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
        👤 Membership Profile
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        {profile?.photo_base64 ? (
          <img
            src={`data:image/jpeg;base64,${profile.photo_base64}`}
            alt={user.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 shadow mx-auto sm:mx-0"
          />
        ) : (
          <img
            src="/assets/default-user.png"
            alt="Default"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-300 shadow mx-auto sm:mx-0"
          />
        )}
        <div className="text-center sm:text-left">
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
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-center sm:text-left">
                Player Details
              </h2>
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

              <div className="flex justify-center sm:justify-start">
                <button
                  onClick={() => {
                    setFormData({
                      jersey_number: profile.jersey_number,
                      position: profile.position,
                      sub_role: profile.sub_role || "",
                      photo: null,
                    });
                    setIsEditMode(true);
                    setModalOpen(true);
                  }}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  ✏️ Edit Player Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Create Player Profile
              </button>
            </div>
          )}
        </div>
      )}

      <PlayerProfileModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditMode(false);
        }}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ProfileView;
