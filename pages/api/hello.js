import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function(req,res){
  // console.log(req.body.message);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content: generatePrompt(req.body.message||"Hi")}]
  });
  console.log(completion.data.choices[0].message.content);
  console.log(process.env.OPENAI_API_KEY);
  res.status(200).json({ result: completion.data.choices[0].message.content });
}
function generatePrompt(message)
{
  return `${message}`;
}