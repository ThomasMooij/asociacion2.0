import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Class from "./pages/Class";
import Login from "./admin/Login";
import Protected from "./admin/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import ClassPhotos from "./components/PhotoComponents/ClassPhotos";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  });

  return (
    <main className="App">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/class/:id" element={<Class />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Protected />} />
              <Route path="/foto" element={<ClassPhotos />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
