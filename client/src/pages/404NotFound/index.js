import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col mt-12 mx-80 text-gray-500">
      <p>We lost too far!</p>
      <h1 className="text-6xl">404 NOT FOUND</h1>
      <Link to="/" className="text-gray-500 self-end">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
