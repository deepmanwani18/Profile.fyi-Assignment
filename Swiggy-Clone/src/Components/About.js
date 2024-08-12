import React from "react";
import { User } from "./User";
import UserClass from "./UserClass";

// export const About = () => {
//   return (
//     <div>
//       <User name={"Deepesh Function"} />
//       <UserClass name={"Deepesh Class"} />
//     </div>
//   );
// };
export class About extends React.Component {
  constructor() {
    super();
    
    console.log("constructor parent");
  }
  componentDidMount() {
    console.log("did mount parent");
  }
  render() {
    console.log("render parent");
    return (
      <div>
        {/* <User name={"Deepesh Function"} /> */}
        <UserClass name={"First"} />
        <UserClass name={"Second"} />
        <UserClass name={"Third"} />
        <UserClass name={"Fourth"} />
      </div>
    );
  }

//   React batches the rendering of child components,
//   that's why for all four components, constructor and render will be called,
//   and once the initial render is completed, for all four components, did mount
//   will be called and after that for parent didMount hook will be called
}
