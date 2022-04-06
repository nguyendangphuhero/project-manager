import React from "react";
import { boardStyles } from "./styles";

// const address =
//   "https://images.unsplash.com/photo-1612689690865-2035b60c449b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

// const users = [
//   { name: "asd" },
//   { name: "asd" },
//   { name: "asd" },
//   { name: "asd" },
//   { name: "asd" },
//   { name: "asd" },
// ];

const Error = () => {
  const classes = boardStyles();
  return (
    <div className={classes.root}>
      Hello
    </div>
  );
};

export default Error;
