import { GoogleGenerativeAI } from '@google/generative-ai';s
const genAI = new GoogleGenerativeAI(
    "API KEY"
);
const getResponseForGivenPrompt= async () => {
try{
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(inputValue);

}
catch(error){
  console.log("Something Went Wrong");
}
  }
