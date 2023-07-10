import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Class from "./pages/Class";
import Login from "./admin/Login";
import Protected from "./admin/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import ClassPhotos from "./components/PhotoComponents/ClassPhotos";
import { LangContext } from "./context/LangContext";
import { useState } from "react";
import {default as HomeENG} from "./languages/ENG/Home.jsx"
import {default as HomeNL} from "./languages/NL/Home.jsx"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });

  const [lang, setLang] = useState(localStorage.getItem("lang") || "ESP")

  return (
    <main className="App">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>      
          <BrowserRouter>
          <LangContext.Provider value={{lang, setLang}}>
            {
              // lang === 'ESP' &&
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/class/:id" element={<Class />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Protected />} />
                <Route path="/foto" element={<ClassPhotos />} />
              </Routes>
            }
            {/* {
              lang === 'ENG'&& 
              <Routes>
                <Route path="/" element={<HomeENG />}/>
              </Routes>
            }
               {
              lang === 'NL'&& 
              <Routes>
                <Route path="/" element={<HomeNL />}/>
              </Routes>
            } */}
           
            </LangContext.Provider>
          </BrowserRouter>      
        </AuthContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
