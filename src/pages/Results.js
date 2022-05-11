import React from "react"

const Results = (props) => {

  return (
    <>
      <div>{props.prompt}</div>
      <div>{props.result}</div>
    </>
  );
}

export default Results;
