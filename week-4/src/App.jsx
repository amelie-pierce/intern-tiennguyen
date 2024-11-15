
import {createRoot } from "react-dom/client";
// import Pet from "./Pet";    JSX
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  const App = () => {

    // JSX
    // <div>
    //   <h1>Adopt Me!</h1>
    //   <Pet name="Luna" animal="dog" breed="Havanese" />
    //   <Pet name="Pepper" animal="bird" breed="Cockatiel" />
    //   <Pet name="Doink" animal="cat" breed="Mixed" />
    // </div>

    return (
      <BrowserRouter>
        <QueryClientProvider client = {queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<App />);