import React from "react";
import { Routes, Route } from "react-router-dom";
import XSSPentestMethodology from "./PentestMethodology";

export default function XSSTasks() {
  return (
    <div className="xss-tasks">
      <Routes>
        <Route path="methodology" element={<XSSPentestMethodology />} />
      </Routes>
    </div>
  );
}
