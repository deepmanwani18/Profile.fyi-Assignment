import React from "react";

class UserClass extends React.Component {
  // constructor(props) {
  // }
  constructor() {
    super();
    this.state = {
      count: 0,
      count2: 2,
    };
  }
  render() {
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        <h1>Count2: {count2}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 + 1,
            });
          }}
        >
          Increment
        </button>
        <h1>{this.props.name}</h1>
        <h2>Software Engineer</h2>
        <p>Looking for Jobs</p>
        <p>From Sikar, Rajasthan</p>
      </div>
    );
  }
}

export default UserClass;
