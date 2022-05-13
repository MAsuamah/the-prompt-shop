import { useState } from "react";
import { getPromptResponses } from "./api/generate"
import Results from "./Results";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();

    if(!promptInput) {
      setErrorMessage('Please enter a prompt!')
      return false
    }

    try {
      setErrorMessage('')

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
      <Col md={5} id="summary-bg">
        <header>
          <h1 className="bg-opacity headers">The Prompt Shop</h1>
        </header>
        <summary className="bg-opacity" id="sum">
          Welcome to The Prompt Shop! Enter a prompt and receive fun responses from the <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI</a> API. Click on a preset example prompt below to see a response or try your own!
        </summary>
        <form onSubmit={onSubmit} id="prompt-form">
          <textarea
            placeholder="Enter a Prompt"
            form="prompt-form"
            name="prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}  
          />
          <input type="submit" value="Generate Results" />
          <input type="submit" onClick={(e) => setPromptInput(e.target.value)}value="Say this is a test"></input>
          <input type="submit" onClick={(e) => setPromptInput(e.target.value)}value="Write a poem about a dog wearing skis"></input>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>           
        )}
      </Col>

      <Col md={7} className="res-scroll">
        <h3 className="headers" id="res-header">Your Results</h3>
        {results.map(res => {
            return (
              <Card key={res.id} className="prompt-card">
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
