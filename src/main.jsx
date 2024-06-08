import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="font-poppins">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
