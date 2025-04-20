import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [photourl, setPhotourl] = useState(user.photourl || "");
  const [about, setAbout] = useState(user.about || "");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (skills.length > 20) {
      newErrors.skills = "You can add only up to 20 skills.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSaveChange = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(
        BASE_URL + "/profile/edit",
        { photourl, about, skills },
        { withCredentials: true }
      );
      setError({});
      // Optionally show success message or close modal
    } catch (err) {
      setError({
        general: err.response?.data?.ErrorMessage || "Edit Profile failed",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

      <form className="space-y-4">
        {/* Profile Picture */}
        <div className="form-control">
          <label className="label font-semibold">Profile Picture</label>
          <input
            type="text"
            value={photourl}
            placeholder="Paste PhotoUrl"
            className="input input-bordered w-full"
            onChange={(e) => setPhotourl(e.target.value)}
          />
        </div>

        {/* About */}
        <div className="form-control">
          <label className="label font-semibold">About</label>
          <textarea
            placeholder="Tell us about yourself"
            value={about}
            className="textarea textarea-bordered w-full"
            rows={4}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label font-semibold">Skills</label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter a skill"
              className="input input-bordered w-full"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline"
              disabled={skills.length >= 20}
              onClick={handleAddSkill}
            >
              Add
            </button>
          </div>

          {error.skills && (
            <p className="text-red-500 text-sm mt-1">{error.skills}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="badge badge-primary gap-1">
                {skill}
                <button
                  type="button"
                  className="ml-1 text-white"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* General Error */}
        {error.general && (
          <div className="alert alert-error text-sm">{error.general}</div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary px-6"
            onClick={handleSaveChange}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
