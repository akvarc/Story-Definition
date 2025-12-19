import { createContext, useState } from "react";

const TriggerContext = createContext();

export function ToggleContext({ children }) {
  const [trigger, setTrigger] = useState("click"); // "click" | "hover"

  return (
    <TriggerContext.Provider value={{ trigger, setTrigger }}>
      {children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
