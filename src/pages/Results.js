import React from "react"

const Results = (props) => {

  return (
    <>
      <div className="headers" id="prompt">Prompt: {props.prompt}</div>
      <div>Result: {props.result}</div>
    </>
  );
}

export default Results;
