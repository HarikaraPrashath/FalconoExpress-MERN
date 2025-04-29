import React from 'react';

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isBot ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-black'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;