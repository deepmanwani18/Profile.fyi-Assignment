import { useState } from "react";

export const User = (props) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <h1>Count2: {count2}</h1>

      <button
        onClick={() => {
          setCount(count + 1);
          setCount2(count2 + 1);
        }}
      >
        Increment Count
      </button>
      <h1>{props.name}</h1>
      <h2>Software Engineer</h2>
      <p>Looking for Jobs</p>
      <p>From Sikar, Rajasthan</p>
    </div>
  );
};
