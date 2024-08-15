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
class About extends React.Component {
  constructor() {
    super();

    console.log("constructor parent");
  }
  componentDidMount() {
    console.log("did mount parent");
  }
  render() {
    return (
      <>
        <div className="bg-skin text-center">
          <div className="flex justify-center mb-16 pt-16">
            <img style={{borderRadius: '50%'}} src={require('../../Public/Deepesh-picture.png')} alt="Image" />
          </div>

          <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
            Deepesh Manwani
          </h6>

          <h1 className="font-normal text-gray-900 text-4xl md:text-4xl leading-none mb-8">
            Software Engineer
          </h1>

          <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
            I have a passion for software. I enjoy creating tools that make life
            easier for people.
          </p>

          <button onClick={() => {
            window.open('https://drive.google.com/file/d/10fkhfJwH4suPjX1HnGetFZnRrF-7RKzt/view?usp=sharing')
          }} className="m-4 border px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-orange text-md rounded-md hover:bg-orange hover:text-white transition ease-linear duration-500">
          Get my CV
        </button>
        </div>
      </>
    );
  }


}

export default About;
