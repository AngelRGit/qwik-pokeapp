import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const getFunFactAboutPokemon = async( pokemonName: string):Promise<string> => {
        
        const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": `Dame una frase motivadora de 60 caracteres en base al pokemon: ${pokemonName}.`
                }
              ]
            }
          ],       
        temperature: 1,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
            "type": "text"
        },
        });

        //console.log(response);
    return response.choices[0].message.content || `No tengo nadasobre ${pokemonName}`;
}