import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Tell me a story of a historical figure in close combat with Genghis Khan. They should fight in a gladiator's arena. They will be given random weapons. The story should describe their strikes and parries. If possible, the aspect of their historical significance should factor into who wins the fight. The fight must have a randomly chosen winner, and result in the brutal death of the loser. The last line should be it's own paragraph, and simply say "Winner!" if Genghis Khan lost, and "Loser!" if Genghis Khan won.
Combatant:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.9,
    max_tokens: 600,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
//   const secondPrompt = 
//   `
//   Write a new cyberpunk story where multiple people are watching the simulated fight. Describe the fight. Describe how it is one of many fights in a tournament pitting all historical figures against one another, for entertainment. The main character should be one of the people watching the simulation. Some people are betting money on the outcome of the fight. Describe the cyberpunk world they're in. Build backstory on the tournament.

//   Previous fight: ${basePromptOutput.text}

//   Story:
//   `
  
//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.95,
// 		// I also increase max_tokens.
//     max_tokens: 800,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  //res.status(200).json({ output: secondPromptOutput });
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;