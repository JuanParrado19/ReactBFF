import { Container, Row, Col, InputGroup, InputGroupText, Input } from 'reactstrap'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import TarjetaPoke from '../components/TarjetaPoke.jsx'

const index = () => {
    const [pokemones, setPokemones] = useState([]);
    const [Allpokemones, setAllPokemones] = useState([]);
    const [listado, setListado] = useState([]);
    const [filtro, setFiltro] = useState('');

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    useEffect(() => {
        getPokemones(offset)
        getAllPokemones()
    }, [])
    const getPokemones = async (o) => {
        const liga = '/api/pokemon?limit='+limit+'&offset='+o;
        axios.get(liga).then(async (response) => {
            const respuesta = response.data;
            setPokemones(respuesta.results);
            setListado(respuesta.results);
        })
    }
    const getAllPokemones = async () => {
        const liga = '/api/pokemon-search/pokemon';
        axios.get(liga).then(async (response) => {
            const respuesta = response.data;
            setAllPokemones(respuesta.results);
        })
    }
    const buscar = async (e) => {
        if (e.keyCode === 13) {
            if (filtro.trim() != '') {
                setListado([]);
                setTimeout(() => {
                    setListado(Allpokemones.filter(p => p.name.includes(filtro)))
                },100)
            }
        }else if(filtro.trim() == ''){
            setListado([]);
            setTimeout(() => {
                setListado(pokemones);
            },100);
        }

    }

    return (
        <Container className='shadow bg-white-transparent mt-3'>
            <Row>
                <h1 className='text-center'>POKEDEX BFF</h1>
            </Row>
            <Row className='animate__animated animate__bounce'>
                <Col>
                    <InputGroup className='mt-3'>
                        <InputGroupText><i className='fa-solid fa-search mr-1' />  Buscar</InputGroupText>
                        <Input value={filtro} onChange={(e) => { setFiltro(e.target.value) }} onKeyUpCapture={buscar} placeholder='Nombre del pokemon' />
                    </InputGroup>
                </Col>
            </Row>
            <Row className='mt-3'>
                {listado.map((pok, i) => (
                    <TarjetaPoke poke={pok} key={i} />
                ))}
            </Row>
        </Container>
    )
}

export default index
