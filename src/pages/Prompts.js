import { useState, useEffect } from "react";
import { getPromptResponses } from "./api/generate"
import Results from "./Results";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Prompts = () => {

  const [promptInput, setPromptInput] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [results, setResults] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("results");
    const savedResults = JSON.parse(saved);
    return savedResults || [];
  });

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
      setResults([{id:res.id, prompt:promptInput, result:res.choices[0].text}, ...results]);
      console.log(results)
      setPromptInput("");
    }

    catch(err) {
      console.log(err)
    }
  }

  const clearResults = () => {
    localStorage.clear();
    setResults([])
  }

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);
  

  return (
    
      <Row className="row-style">
        <Col md={5} id="summary-bg" className="res-scroll">
          <header>
            <h1 className="bg-opacity headers">The Prompt Shop</h1>
          </header>
          <div className="bg-opacity sum-box" >
            <summary id="sum">
              Welcome to The Prompt Shop! Enter a prompt and receive fun responses from the <a href="https://beta.openai.com/" target="_blank" rel="noreferrer">OpenAI</a> API. Click on a preset example prompt below to see a response or try your own!
            </summary>
            <form onSubmit={onSubmit} id="prompt-form">
              <input className="gen-btn" type="submit" onClick={(e) => setPromptInput(e.target.value)}value="How does a telescope work?"></input> 
              <input className="gen-btn" type="submit" onClick={(e) => setPromptInput(e.target.value)}value="Write a poem about a dog wearing skis"></input>
              <textarea
                placeholder="Enter a Prompt"
                form="prompt-form"
                name="prompt"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows="4" 
                cols="32"
              />
              <input className="gen-btn" type="submit" value="Generate Results" />
            </form>
            {errorMessage && (
              <div>
                <p className="error-text">{errorMessage}</p>
              </div>           
            )}
            <button onClick={() => clearResults()} className="gen-btn" id="clear">Clear Results</button>
          </div>
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
