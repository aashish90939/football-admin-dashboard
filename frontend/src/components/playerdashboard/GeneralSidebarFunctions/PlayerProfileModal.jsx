import React from "react";

const PlayerProfileModal = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  photoPreview,
  setPhotoPreview,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          📝 Create Player Profile
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="number"
            min="1"
            max="40"
            placeholder="Jersey Number (1–40)"
            value={formData.jersey_number}
            onChange={(e) =>
              setFormData({ ...formData, jersey_number: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={formData.position}
            onChange={(e) =>
              setFormData({
                ...formData,
                position: e.target.value,
              })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Position</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfield">Midfield</option>
            <option value="Forward">Forward</option>
          </select>

          <input
            type="text"
            placeholder="Sub-role (optional)"
            value={formData.sub_role}
            onChange={(e) =>
              setFormData({ ...formData, sub_role: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Photo</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({ ...formData, photo: file });

                  const reader = new FileReader();
                  reader.onloadend = () => setPhotoPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="flex-1 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-none file:cursor-pointer text-sm text-gray-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerProfileModal;
