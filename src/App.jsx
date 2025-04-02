import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./componet/NavBar";
import Footer from "./componet/Footer";
import Home from "./pages/Home";
import PokemonDetalle from "./componet/PokemonDetalle";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokemonShiny" element={<Home />} />
        <Route path="/PokemonDetalle/:name" element={<PokemonDetalle />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
