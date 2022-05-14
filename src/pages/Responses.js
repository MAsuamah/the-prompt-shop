import React from "react"

const Responses = (props) => {

  return (
    <>
      <div className="headers" id="prompt">Prompt: {props.prompt}</div>
      <div><span id="response">Response:</span> {props.response}</div>
    </>
  );
}

export default Responses;
