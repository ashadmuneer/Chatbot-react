import { createContext, useState } from "react";
import run from "../config/gemini";

// Create the context
const Context = createContext();

// Context provider component
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    const response = await run(prompt);  // Assuming `run` makes an API call
    setResultData(response);
    setLoading(false);
    setInput("");  // Clear input after sending
  };

  // Context value to be shared across components
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  // Return the context provider component that wraps children
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

// Export Context and ContextProvider separately
export { Context, ContextProvider };
