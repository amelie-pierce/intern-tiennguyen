
import {createRoot } from "react-dom/client";
// import Pet from "./Pet";    JSX
import SearchParams from "./SearchParams";
  
  const App = () => {

    // JSX
    // <div>
    //   <h1>Adopt Me!</h1>
    //   <Pet name="Luna" animal="dog" breed="Havanese" />
    //   <Pet name="Pepper" animal="bird" breed="Cockatiel" />
    //   <Pet name="Doink" animal="cat" breed="Mixed" />
    // </div>

    return (
      <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
    );
  };

    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<App />);