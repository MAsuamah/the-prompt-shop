import { useState } from "react";
import { getPromptResponses } from "../pages/api/generate"
import Results from "./Results"; 

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
  
     const response = await getPromptResponses(promptInput)
     const res = await response.json()
     console.log(res)
  
     setResults([...results, {id:res.id, prompt:promptInput, result:res.choices[0].text}]);
     console.log(results)
     setPromptInput("");
  }

  return (
    <div>
        <h1>The Prompt Shop</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a Prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate Results" />
        </form>

        {results.map(res => {
            return (
              <Results 
                key={res.key}
                prompt={res.prompt}
                result={res.result}   
              />
            )
          })
        }

    </div>
  );
}

export default Prompts;
