import {useEffect, useState,useRef } from "react"
import "./Style/pokemonHome.css"
import '../assets/font/pokemonFont.css';
import { Await } from "react-router-dom";

function PokemonHome({tipoShiny}){

    const [pokemon,setPokemon] = useState([]);
    const [pokemonAPI2, setPokemonAPI2]=useState([]);
    const [tipo,setTipo ]=useState([]);
    const BASE_URL='https://pokeapi.co/api/v2/pokemon/';
    const BASE_URL_API2='https://pokeapi.co/api/v2/pokemon-species/';
    const contador = useRef(1); // mantiene el valor entre clics

    
    async  function obtenerPokemon(id){
            try{
                const respose = await fetch(`${BASE_URL}${id}`);
                const data =  await respose.json()
                setPokemon(data);
                console.log(data);
                return data;
            }
            catch(e){
                console.log(e)
            }
            
    }
    async function obtenerPokemonAPI2(id) {
          try{
            const datos =  await obtenerPokemon(id);
            const URLNAME= datos.name;
            console.log(datos);
            const respose =await fetch(`${BASE_URL_API2}${URLNAME}`);
            const data = await respose.json();            
            setPokemonAPI2(data);

            //TRaduccion 
            const tiposTraducidos = await Promise.all(
                datos.types.map(async(t)=>{
                    const res = await fetch(t.type.url);
                    const tipoData= await res.json();
                    const nombreES= tipoData.names.find(n => n.language.name==="es")?.name|| t. type.name;

                    return nombreES;
                })
                 
            )
            setTipo(tiposTraducidos);
          }
          catch(e){
            console.log(e)
          }
                        
    }
    useEffect(()=>{
        obtenerPokemonAPI2(1);
    },[])  
    
    function cambiarPokemon(){
        
        contador.current++;
        if (contador.current > 150) contador.current = 1; // volver a empezar
        obtenerPokemonAPI2(contador.current);

    }
    

    const urlimg = tipoShiny
    ? pokemon?.sprites?.other?.dream_world?.front_shiny || pokemon?.sprites?.other?.['official-artwork']?.front_shiny
    : pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.['official-artwork']?.front_default;
    

    const entry = pokemonAPI2?.flavor_text_entries?.find(
        (entry) => entry.language.name === "es"
      );
   
    
      

    return(
        <section className="container"  onClick={cambiarPokemon}>
            <section className="imgPokemon">
                 <img  src={urlimg} alt="" />
            </section>
            <section className="containerDetalle">
              <p style={{textTransform:"uppercase", fontWeight: "bold", fontSize: "1.1rem"}}>NOMBRE: {pokemon.name}</p>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>ID: {pokemon.id}</p>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>ALTURA: {pokemon.height}0cm</p>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}> TIPOS: {
                tipo?.map((nombre,index)=>(
                    <span  className={`tipo tipo-${nombre.toLowerCase()}`} key={index} >
                        {nombre}{index <tipo.length -1? "":""}
                    </span>
                   
                ))
                }

              </p>
              <section className="descripcionPokemon">
                    <p>
                        <span className="descripcionTitulo">Descripción:</span> {entry ? entry.flavor_text : "Cargando..."}
                    </p>
              </section>


            </section>
            
            
        </section>
    )
}
export default PokemonHome