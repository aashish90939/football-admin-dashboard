import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContactFormResponse = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await axios.get("/api/contact-responses");
        setResponses(data);
      } catch (err) {
        setError("Failed to fetch responses");
      } finally {
        setLoading(false);
      }
      console.log("Fetched responses:", responses);
    };

    fetchResponses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Contact Form Responses
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <span className="text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((res, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {res.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {res.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {res.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {res.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                    {res.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactFormResponse;
