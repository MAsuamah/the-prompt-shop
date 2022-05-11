export const getPromptResponses = (promptInput) => {
  
  const data = {
    prompt: promptInput,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };

  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer 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',
    },
    body: JSON.stringify(data),
   });;
};

