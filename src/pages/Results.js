import React from "react"

const Results = (props) => {

  return (
    <>
      <div>Prompt: {props.prompt}</div>
      <div>Result: {props.result}</div>
    </>
  );
}

export default Results;
