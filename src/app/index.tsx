import React, { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "../routes";

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
};
