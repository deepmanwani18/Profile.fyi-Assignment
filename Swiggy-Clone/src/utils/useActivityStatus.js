import { useState } from "react";

const useActivityStatus = () => {
  const [activityStatus, setActivityStatus] = useState(true);

  window.addEventListener("offline", () => {
    setActivityStatus(false);
  });

  window.addEventListener("online", () => {
    setActivityStatus(true);
  });
  return activityStatus;
};

export default useActivityStatus;
