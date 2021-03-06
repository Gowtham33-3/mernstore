import React from "react";
import { API } from "../../backend";

function ImageHelper({ product }) {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/693865/pexels-photo-693865.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
}

export default ImageHelper;
