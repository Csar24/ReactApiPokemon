
import PokemonHome from "../componet/PokemonHome";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
  } from 'recharts'


function PokemonDetalle(){
    const {name} = useParams()
    const [pokemon,setPokemon] = useState([]);
    const [pokemonAPI2, setPokemonAPI2]=useState([]);
    const [tipo,setTipo ]=useState([]);
    const BASE_URL='https://pokeapi.co/api/v2/pokemon/';
    const BASE_URL_API2='https://pokeapi.co/api/v2/pokemon-species/';
    const [searchParams] = useSearchParams();
    const tipoShiny = searchParams.get("shiny") === "true";

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        async function obtenerPokemon(name) {
            try{
                const res = await  fetch(`${BASE_URL}${name}`);
                const datos = await res.json();
                setPokemon(datos);

                   //TRaduccion 
                   const tiposTraducidos = await Promise.all(
                    datos.types.map(async(t)=>{
                        const res = await fetch(t.type.url);
                        const tipoData= await res.json();
                        const nombreES= tipoData.names.find(n => n.language.name==="es")?.name|| t. type.name;
    
                        return nombreES;
                    })) 

                    
                    setTipo(tiposTraducidos);
    
            }
            catch(e){
    
            }
            
        }
    
        async function apiDetalles(name) {
            try{
                 const res= await fetch(`${BASE_URL_API2}${name}`);
                 const detallePokemon  = await res.json();
    
                 setPokemonAPI2(detallePokemon);
                
    
            }
            catch(e){
    
            }
            
        }
        obtenerPokemon(name);
        apiDetalles(name);

    },[name])

    const urlimg = tipoShiny
    ? pokemon?.sprites?.other?.dream_world?.front_shiny || pokemon?.sprites?.other?.['official-artwork']?.front_shiny
    : pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.['official-artwork']?.front_default;
    
 
    const entry = pokemonAPI2?.flavor_text_entries?.find( (entry) => entry.language.name === "es");
    //Stadisticas

    const estadisticas = pokemon?.stats?.map(stat => ({
        stat: stat.stat.name.toUpperCase(),
        value: stat.base_stat,
      }))



    return(



        <section className="container">
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
              <p  style={{textAlign:"start"}}>DESCRIPCION: {entry ? entry.flavor_text : "Cargando..."}</p>



            </section>
            
            <section style={{ width: '100%', height: 200, marginBottom: "200px"}}>
                <h3 style={{ textAlign: 'center' }}>Estadísticas Base</h3>
                {estadisticas && estadisticas.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={estadisticas}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar
                        name="Base Stats"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        />
                    </RadarChart>
                    </ResponsiveContainer>
                )}
            </section>
            
            
        </section>
        
        
    )
        
    
}
export  default PokemonDetalle