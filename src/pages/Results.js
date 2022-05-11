import React from "react"

const Results = (props) => {
  return (
    <div key={props.key}>
      <div>{props.prompt}</div>
      <div>{props.result}</div>
    </div>
  );
}

export default Results;
