import { useEffect, useState } from "react"
import './Style/galleryPokemon.css'
import CardPokemon from './CardPokemon'

function GalleryApp({tipoShiny}){
     const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'  
     const [pokemon, setPokemon] = useState([]);
     //Usestate funcion que devuleve dos estados
  //const estado = useState(null);
  //const pokemon = estado[0];
  //const setPokemon = estado[1];
     const [limite, setLimite] = useState(10); // mostrar 12 inicialmente (3 filas si hay 4 por fila)

     useEffect(()=>{
         async function apiAll(id) {

            try{
                 const respose = await fetch(`${BASE_URL}${id}`); // llamada a la API
                 const  datos = await respose.json();
                 console.log(datos);
                 return datos; //devuelve el resultado

            }
            catch(e){
                 console.error(e);
                 
            }
            
         }

         async function pokemonGet(){
                let pokemonAll=[];
                for (let i=1;i<=limite;i++){
                  const pokemon =  await apiAll(i);
                  pokemonAll.push(pokemon);//Añadir pokemones al Arreglo
                  console.log(pokemon);
                }
                setPokemon(pokemonAll) //Añadir pokemones
                

         }
         pokemonGet();

     },[limite])

     function cargarMasPokemones(){
      setLimite((prev)=> prev +5) //añade 1 filas más
     }

    return(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Pokemon</h1>
        </div>
         
        <section className ="galleryPokemon">
           
            {pokemon.map((pokemon)=>(
                <CardPokemon  key={pokemon.id} pokemon={pokemon} tipoShiny={tipoShiny}></CardPokemon>
              ))}     
         </section>
         <div style={{display:'flex', justifyContent:'center', margin:'20px'}}>
          <button onClick={cargarMasPokemones} style={{padding:'10px 20px', fontSize:'16px'}}>
             Cargar mas.
          </button>
        </div>         
        </>
       
    )
}

export default GalleryApp