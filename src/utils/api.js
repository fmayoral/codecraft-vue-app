import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions ";
const API_KEY = process.env.VUE_APP_OPENAI_API_KEY;
const openTagRegex = /<\s*([a-zA-Z]+)/g;
const closeTagRegex = /<\s*\/\s*([a-zA-Z]+)/g;

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  
  function isCompleteHTML(html) {
    if (html.endsWith("END-OF-WEBSITE")) {
        return true;
    }
    
    const openTags = [];
    const closeTags = [];
    let match;
  
    while ((match = openTagRegex.exec(html)) !== null) {
      openTags.push(match[1]);
    }
  
    while ((match = closeTagRegex.exec(html)) !== null) {
      closeTags.push(match[1]);
    }
  
    return openTags.length === closeTags.length;
  }
  
  function removeNonHTMLContent(html) {
    const startTag = html.indexOf("<");
    const endTag = html.lastIndexOf(">");
    return html.slice(startTag, endTag + 1);
  }
  
  export async function callChatGPT(prompt) {
    const messages = [{ role: "system", content: "You are a helpful assistant that translates text descriptions into website code." }];
    let output = "";
    let done = false;
    let continuationPrompt = prompt;
    const maxAPICalls = 10; // Set a maximum number of API calls
    let apiCallCount = 0;
  
    while (!done && apiCallCount < maxAPICalls) {
      messages.push({ role: "user", content: continuationPrompt });
  
      try {
        const response = await axios.post(
          API_URL,
          {
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 3000,
            n: 1,
            stop: null,
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          },
          { headers }
        );
  
        const assistantResponse = response.data.choices[0].message.content.trim();
        output += assistantResponse;
  
        if (isCompleteHTML(output)) {
          done = true;
        } else {
          continuationPrompt = "Continue generating the website.";
        }
  
        apiCallCount++;
      } catch (error) {
        console.error("Error calling ChatGPT:", error);
        throw error;
      }
    }
  
    return removeNonHTMLContent(output);
  }