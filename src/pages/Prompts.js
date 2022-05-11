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
      <Col md={5}>
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
      </Col>

      <Col md={7} id="result-bg">
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
