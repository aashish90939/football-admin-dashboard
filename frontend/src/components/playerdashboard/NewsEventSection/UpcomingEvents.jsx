import React from "react";
import { useDashboardContext } from "../../../context/DashboardContext";

const UpcomingEvents = () => {
  const { getPostsByType, loading } = useDashboardContext();
  const events = getPostsByType("event");
  //console.log("Events from context:", events);

  return (
    <div>
      <h2 className="text-lg font-bold text-blue-700 mb-4">Upcoming Events</h2>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-xl shadow bg-white border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">
                  {event.title}
                </h3>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-600 rounded-full capitalize">
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                📅 {new Date(event.start_date).toLocaleDateString()}
                {event.end_date &&
                  ` - ${new Date(event.end_date).toLocaleDateString()}`}
              </p>
              {event.body && (
                <p className="text-sm text-gray-500">{event.body}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No events scheduled at the moment. Stay tuned!
        </p>
      )}
    </div>
  );
};

export default UpcomingEvents;
