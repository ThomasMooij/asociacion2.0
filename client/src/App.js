import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Class from './pages/Class';


function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity }}
});
  
  return (
    <main className="App">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>   
        <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/class/:id' element={<Class />} /> 
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </main>
  );
}

export default App;
