export const getPromptResponses = () => {
  
  const data = {
    prompt: "Say this is a test",
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

