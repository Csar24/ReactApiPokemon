

import { BrowserRouter,Routes,Route } from "react-router-dom";
import NavBar from "./componet/NavBar";
import Footer from "./componet/Footer";
import Home from"./pages/Home";
import PokemonDetalle from "./componet/PokemonDetalle";


function App() {
  
   
  return (
    
    
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
         <Route path="/" element={<Home></Home>}></Route>
         <Route path="/PokemonShiny" element={<Home></Home>}></Route>
         <Route path="/PokemonDetalle/:name" element={<PokemonDetalle></PokemonDetalle>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>          
    
  )
}

export default App
