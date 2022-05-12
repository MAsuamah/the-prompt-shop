import { useState } from "react";
import { getPromptResponses } from "../pages/api/generate"
import Results from "./Results";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();

    if(!promptInput) {
      return false
    }

    try {
      const response = await getPromptResponses(promptInput)

      if(!response.ok) {
        throw new Error('something went wrong!')
      } 

      const res = await response.json()
      console.log(res)
      setResults([...results, {id:res.id, prompt:promptInput, result:res.choices[0].text}]);
      console.log(results)
      setPromptInput("");
    }

    catch(err) {
      console.log(err)
    }
  }

  return (
    <Row>
      <Col md={5} id="result-bg">
        <header>
          <h1 className="bg-opacity">The Prompt Shop</h1>
        </header>
        <summary className="bg-opacity">
          Welcome to the Prompt Shop! Enter a prompt and receive fun responses from the <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI</a> API. Click on a preset example prompt below to see a response or try your own!
        </summary>
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
      </Col>

      <Col md={7} >
        {results.map(res => {
            return (
              <Card key={res.id}>
                <Card.Body>      
                  <Results 
                    prompt={res.prompt}
                    result={res.result}   
                  />
                </Card.Body>
              </Card>
            )
          })
        }
      </Col>
    </Row>
  );
}

export default Prompts;
