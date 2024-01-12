// StarRating.js

import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rank }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < rank ? "gold" : "gray"} />
  ));

  return <div className="flex sm:flex-wrap">{stars}</div>;
};

export default StarRating;
