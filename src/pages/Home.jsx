
import PokemonHome  from "../componet/PokemonHome" ;
import GalleryPokemon from "../componet/GalleryPokemon"
import { useSearchParams } from "react-router-dom";

function Home(){

    const [serchParams]=useSearchParams();
    const tipoShiny= serchParams.get("shiny")=="true";
    return(
        <div>
           <PokemonHome tipoShiny={tipoShiny} ></PokemonHome>
           <GalleryPokemon tipoShiny={tipoShiny}></GalleryPokemon> 
        </div>
    );

}
export default Home