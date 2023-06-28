import { createContext, useState } from "react";

const SelectedComponentContext = createContext();

const SelectedComponentProvider = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const updateSelectedComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <SelectedComponentContext.Provider value={{ selectedComponent, updateSelectedComponent }}>
      {children}
    </SelectedComponentContext.Provider>
  );
};

export { SelectedComponentContext, SelectedComponentProvider };