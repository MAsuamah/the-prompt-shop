import { useState } from "react";
import { getPromptResponses } from "../pages/api/generate"

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
  
     const response = await getPromptResponses(promptInput)
     const res = await response.json()
  
     setResults([...results, {id:res.id, prompt:promptInput, result:res.choices[0].text}]);
     console.log(results)
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

          {results.map(res => {
            return (
            <div key={res.id}>
              <div>{res.prompt}</div>
              <div>{res.result}</div>
            </div>
            )
          })

          }
        </form>
    </div>
  );
}

export default Prompts;
