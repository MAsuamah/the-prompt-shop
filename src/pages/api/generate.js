export const getPromptResponses = (promptInput) => {

  const data = {
    prompt: promptInput,
    temperature: 0.5,
    max_tokens: 64,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };

  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify(data),
   });;
};

