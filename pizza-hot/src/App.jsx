import { useContext } from "react";
import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import ThemeSelector from "./components/ThemeSelector.jsx";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {

  const { mode } = useContext(ThemeContext);

  return (
    <div className={mode === "dark" ? "bg-dark text-white" : "bg-light text-black"}>
      <Header />
      <ThemeSelector />
      <div className="container my-4">
        <PizzaList />
        <Cart />
        <Checkout />
      </div>
    </div>
  );
}

export default App
