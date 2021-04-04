import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>Oppss!!</h1>
      <p>We lost too far!</p>
      <Link to="/">Back to HomePage</Link>
    </>
  );
};

export default NotFound;
