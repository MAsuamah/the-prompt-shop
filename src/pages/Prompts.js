import { useState } from "react";
import { getPromptResponses } from "../pages/api/generate"

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
  
     const response = await getPromptResponses()

     const { choices } = await response.json()
  
     console.log(choices[0].text);
     setResult(choices[0].text);
     setPromptInput("");
  }

  return (
    <div>
        <h3>The Prompt Shop</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a Prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate Results" />
          <div>{result}</div>
        </form>
    </div>
  );
}

export default Prompts;
