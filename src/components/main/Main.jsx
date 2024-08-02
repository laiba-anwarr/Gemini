import React, { useContext } from 'react';
import "./main.css";
import { context } from '../../context/ContextProvider';
import { assets } from '../../assets/assets';

const Main = () => {
  const { input, setInput, sent, showResult, loading, recentPrompt, result ,
    
  } = useContext(context);

  return (
    <div className='Main'>
      <div className='nav'>
        <p>Gemini</p>
        <img 
        className='user'
        src={assets.user_icon} alt="User Icon" />
      
      </div>
      <div className="maincontainer">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you Today?</p>
            </div>
            <div className="cards">
              {["Write a thank you note to my colleague", "What is React JS?", "Explain the following code step by step", "Tell me about key concepts of React Native"].map((text, index) => (
                <div key={index} className='card' onClick={() => setInput(text)}>
                  <p>{text}</p>
                 
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loading">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: result }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="main-bottom">
        <div className="search">
          <input 
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sent();
              }
            }}
            placeholder='Enter a prompt here'
            value={input}
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img onClick={sent} src={assets.send_icon} alt="Send Icon" />
          </div>
        </div>
        <p className='bottom-info'>
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
        </p>
      </div>
    </div>
  );
};

export default Main;
