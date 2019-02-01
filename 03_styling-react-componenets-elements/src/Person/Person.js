import React from "react";
import "./Person.css";

const person = props => {
  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>
        I'm a {props.name} and I am a {props.age}!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.change} value={props.name} />
    </div>
  );
};

export default person;
