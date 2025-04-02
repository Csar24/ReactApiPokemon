
import { Link,useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Style/navbar.css";


function NavBar(){
    const location = useLocation();
    const [busqueda,setBusqueda]= useState([]);
    const [listaPokemon, setListaPokemon] = useState([]);
    const navigate = useNavigate();
    const BASE_URL='https://pokeapi.co/api/v2/pokemon?limit=1000';
    const [searchParams, setSearchParams] = useSearchParams();

    const isShiny = searchParams.get("shiny") === "true";
    const estaEnDetalle = location.pathname.includes("/PokemonDetalle/");   

   useEffect(()=>{
       async function obtenerNombre() {
         
          const res = await fetch(`${BASE_URL}`);
          const data = await res.json();
          const nombre = data.results.map(p => p.name.toLowerCase());
          console.log(nombre);
          setListaPokemon(nombre);

    
       } 
       obtenerNombre();

   },[]) 



   const manejarBusqueda=()=>{
        const nombre = busqueda.trim().toLowerCase();
        if (nombre==="") return;

        if (listaPokemon.includes(nombre)){
            navigate(`/PokemonDetalle/${nombre}`);
        }
        else{
            alert(`❌ No se encontró ningún Pokémon con el nombre "${busqueda}"`);
        }
        
    };

    return(
        
        <div className="menuHome"> 
            <div className="iconoHome">
                <Link to="/" style={{display:"flex", flexDirection:"row" , justifyContent:"center", alignItems:"center"}}>
                    <div>
                        <img src="https://wafuu.com/cdn/shop/files/pokemon-master-ball-beach-ball-40cm-ahb-ma4-inflated-size-27cm-493948_540x.jpg?v=1721399691" alt="Pokébola" width="40" height="40" />
                        
                    </div>
                    <h2 style={{color:"black" ,paddingLeft:"5%"} }>
                        POKEDEX
                    </h2>
                </Link>
            </div>
            <nav className="menu">
                                                     
                <ul className="contenedorEnlaces">
                    
                        
                    <li className="enlaceMenu">
                        <input
                            type="text"
                            placeholder="Buscar Pokémon..."
                            className="input-busqueda"
                            value={busqueda}
                            onChange={(e)=> setBusqueda(e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key=="Enter"){
                                    manejarBusqueda();
                                }
                            }}
                        />
                    </li>
                    <li className="enlaceMenu">
                    <button
                        className="btnPokemonShiny"
                        onClick={() => setSearchParams({ shiny: (!isShiny).toString() })}
                        style={{
                        opacity: 1,
                        cursor: "pointer",
                        backgroundColor: isShiny ? "#000" : "#c39717",
                        transition: "background-color 0.3s ease",
                        fontWeight: "bold"
                        }}
                    >
                        {isShiny ? "✨ Ver Normal" : "✨ Ver Shiny"}
                    </button>
                    </li>

                                   
                </ul>
            </nav>
        </div>
       
            
        
    )
}
export default NavBar;