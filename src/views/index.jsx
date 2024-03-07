import{ Container,Row,Col,InputGroup,InputGroupText,Input } from 'reactstrap'
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import TarjetaPoke from '../components/TarjetaPoke.jsx'

const index = () => {
    const [pokemones,setPokemones] = useState([]);
    const [offset,setOffset] = useState(0);
    const [limit,setLimit] = useState(20);
    useEffect( () =>{
        getPokemones(offset)
        
    },[])
    const getPokemones = async(o) =>{
        const liga = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+o;
        axios.get(liga).then( async(response) =>{
            const respuesta = response.data;
            setPokemones(respuesta.results);    
        })
    }
    
  return (
    <Container className='shadow bg-white-transparent mt-3'>
        <Row className='mt-3'>
            { pokemones.map((pok,i) =>(
                <TarjetaPoke poke={pok} key={i} />
            ))}
        </Row>
    </Container>
  )
}

export default index
