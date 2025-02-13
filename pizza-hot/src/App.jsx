import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import ThemeSelector from "./components/ThemeSelector.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {

  return (
    <ThemeProvider>
      <Header />
      <ThemeSelector />
      <div className="container my-4">
        <PizzaList />
      </div>
    </ThemeProvider>
  );
}

export default App
