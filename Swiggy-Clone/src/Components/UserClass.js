import React from "react";

class UserClass extends React.Component {
  // constructor(props) {
  // }
  constructor(props) {
    super(props);
    console.log(this.props.name, "constructor child");
    this.state = {
      count: 0,
      count2: 2,
      userInfo: {},
    };
  }
  async componentDidMount() {
    const userInfo = await fetch("https://api.github.com/users/deepmanwani18");
    const userInfoJSON = await userInfo.json();
    this.setState({ userInfo: userInfoJSON });
  }

  render() {
    const { name, login, avatar_url } = this.state.userInfo;
    console.log(this.props.name, "render child");
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
        <h1>Github Data</h1>
        <h2>name: {login || name}</h2>
        <img style={{ borderRadius: "50%", height: "100px" }} src={avatar_url} />
      </div>
    );
  }
}

export default UserClass;
