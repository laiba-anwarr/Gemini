import React, { useState, createContext } from 'react';
import run from '../config/gemini';

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [cardtext, setcardtext] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousprompts, setPreviousPrompts] = useState([]);
  const newchat=()=>{
    setLoading(false)
    setShowResult(false)
  }

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResult(prev => prev + nextWord);
    }, 10 * index);
  };

  const sent = async () => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const response = await run(input);

    let responseArray = response.split("**");
    let newResponse = "";
    
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let response2 = newResponse.split("*").join("</br>");
    let newResponseArray = response2.split('');

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord);
    }

    setLoading(false);
    setPreviousPrompts((prev) => [...prev, { prompt: input,response2 }]);

    setInput("");
  };

  const showPreviousResponse = (prompt,response2) => {
    setInput(prompt);
    setResult( response2);
    setShowResult(true);
    setRecentPrompt(prompt);
    document.title = prompt.slice(0, 20);
  };

  const contextVal = {
    input,
    setInput,
    sent,
    showResult,
    setShowResult,
    result,
    cardtext,
    setcardtext,
    recentPrompt,
    loading,
    previousprompts,
    setPreviousPrompts,
    showPreviousResponse,
    newchat
  };

  return (
    <context.Provider value={contextVal}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;
