/* 
<div id="parent">
    <div id="child">
        <h1> Hello World! </h1>
        <h2> Some Subheading. </h2>
    </div>
     <div id="child2">
        <h1> Hello World! </h1>
        <h2> Some Subheading. </h2>
    </div>
</div>     
*/
import React from 'react';
import ReactDOM  from 'react-dom/client';

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "heading"),
    React.createElement("h2", {}, "Some Subheading"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "heading"),
    React.createElement("h2", {}, "Some Subheading"),
  ]),
]);

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello World from React!"
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
