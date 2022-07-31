import React from "react";
import "../../styles/substyles/loadinginfo.css";

export default function LoadingInfo({ statusLoading, statusError }) {
  return (
    <div className="loadingInfo">
      {statusLoading === "loading" && (
        <svg className="spinner">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      )}
      {statusError && <h3>Приносим извинения. {statusError}</h3>}
    </div>
  );
}
