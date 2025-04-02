import React, { useState } from 'react';
import '../assets/font/pokemonFont.css'
import { Link } from 'react-router-dom';

function CardPokemon({pokemon,tipoShiny}){
   
    const [hovered, setHovered] = useState(false); 
    /*? si esta vasio devuelve null o undefine*/
   

    const cardStyle={
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center',
        maxWidth: '200px',
        margin: '10px',
        backgroundColor: '#fff',
        width: '200px',
        transform: hovered ? 'scale(1.15)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: hovered ? '0 4px 10px rgba(0,0,0,0.2)' : 'none',
        

    }

    const urlimg = tipoShiny
    ? pokemon?.sprites?.other?.dream_world?.front_shiny || pokemon?.sprites?.other?.['official-artwork']?.front_shiny
    : pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.['official-artwork']?.front_default;
    

    

    return(
        <Link to={`/PokemonDetalle/${pokemon.name}?shiny=${tipoShiny}`} style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                       
            <section  style={{backgroundColor:'#fff'}} >
                <h2 style={{color:'#000' ,fontFamily: 'PokemonHollow' ,letterSpacing: '2px'}} >{pokemon?.name}</h2>  
                <img src={urlimg} style={{ width: '100px', height: '100px' }}></img>
                <p style={{color:'#000'}}> id : {pokemon.id}</p>
            </section>
        </Link>
    )
}

export default CardPokemon;