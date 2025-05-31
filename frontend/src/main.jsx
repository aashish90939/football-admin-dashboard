import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "./App.css";

import { PlayersProvider } from "./context/PlayersContext";
import { DashboardProvider } from "./context/DashboardContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayersProvider>
      <DashboardProvider>
        {" "}
        {/* ✅ Wrap entire app with Dashboard context */}
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-black text-yellow-400 rounded-lg shadow-md px-4 py-3"
          bodyClassName="text-sm font-medium"
          progressClassName="bg-yellow-400"
        />
      </DashboardProvider>
    </PlayersProvider>
  </StrictMode>
);
