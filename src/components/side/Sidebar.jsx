import React, { useState, useContext } from 'react';
import "./side.css";
import { assets } from "../../assets/assets";
import { context } from '../../context/ContextProvider';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { previousprompts, showPreviousResponse,newchat } = useContext(context);

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img 
          onClick={() => setExtended((prev) => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu Icon" 
        />
        <div className="newChat"
        onClick={()=>{
          newchat()
        }}
        >
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p>Recent</p>
            {previousprompts.map((item, i) => (
              <div 
                key={i} 
                className="recent-entry" 
                onClick={() => showPreviousResponse(item.prompt, item.response2)}
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.prompt.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
