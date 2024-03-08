import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import TarjetaPoke from '../components/TarjetaPoke.jsx'
import { Badge, Card, CardBody, CardText, Col, Container, Progress, Row } from 'reactstrap';


function detalle() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitat, setHabitat] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [habilidades, setHabilidades] = useState([])
  const [tipos, setTipos] = useState([]);
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');
  const [estaditicas, setEstadisticas] = useState([]);
  
  useEffect(() => {
    getPokemon()

  }, [])
  const getPokemon = async () => {
    const liga = '/api/pokemon/' + id;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImagen(respuesta.sprites.other.dream_world.front_default)
      } else {
        setImagen(respuesta.sprites.other['official-artwork'].front_default)
      }
      await getTipos(respuesta.types);
      await getEspecie(respuesta.species.name)
      await getHabilidades(respuesta.abilities)
      await getEstadisticas(respuesta.stats)
      setCardClass('')
      setLoadClass('d-none')

    })
  }
  const getEstadisticas = async (est) => {
    let listaEst = [];
    est.forEach((e) => {
      axios.get(e.stat.url).then(async (response) => {
        listaEst.push({ 'nombre': response.data.names[5].name, 'valor': e.base_stat })
        setEstadisticas(listaEst);

      })
    })
  }
  const getHabilidades = async (hab) => {
    let listaHabilidades = [];
    hab.forEach((h) => {
      axios.get(h.ability.url).then(async (response) => {
        listaHabilidades.push(response.data.names[5].name)
        setHabilidades(listaHabilidades);

      })
    })
  }
  const getTipos = async (tip) => {
    let listaTipos = [];
    tip.forEach((t) => {
      axios.get(t.type.url).then(async (response) => {
        listaTipos.push(response.data.names[5].name)
        setTipos(listaTipos);

      })
    })
  }
  const getEspecie = async (esp) => {
    const liga = '/api/pokemon-species/'+esp;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setEspecie(respuesta);
      if (respuesta.habitat != null) {
        await getHabitat(respuesta.habitat.url)
      }
      await getDescripcion(respuesta.flavor_text_entries);
      
    })
  }

  const getHabitat = async (hab) => {
    axios.get(hab).then(async (response) => {
      setHabitat(response.data.names[1].name)
    })
  }
  const getDescripcion = async (desc) => {
    let texto = ''
    desc.forEach((d) => {
      if (d.language.name == 'es') {
        texto = d.flavor_text
      }
      if (texto == '' && desc.length > 0) {
        texto = desc[0].flavor_text;
      }
    });
    setDescripcion(texto)
  }

  return (
    <Container className='bg-black mt-3'>
      <Row>
        <Col>
          <Card className='shadow mt-3 mb-3'>
            <CardBody className='mt-3'>
              <Row>
                <Col className='text-end'>
                  <Link to='/' className='btn btn-danger'><i className='fa-solid fa-home'></i> Inicio</Link>
                </Col>
              </Row>
              <Row className={loadClass}>
                <Col md='12'>
                  <img src='/img/simple_pokeball.gif' className='w-100'></img>
                </Col>
              </Row>
              <Row className={cardClass}>
                <Col md='6'>
                  <CardText className='h1 text-capitalize'>{pokemon.name}</CardText>
                  <CardText className='fs-3'>{descripcion}</CardText>
                  <CardText className='fs-5'>
                    Altura: <b>{(pokemon.height) / 10} m</b>
                    Peso: <b>{(pokemon.weight) / 10} kg</b>
                  </CardText>
                  <CardText className='fs-5'>
                    Tipo: {tipos.map((tip, i) => (
                      <Badge pill className='me-1' color='danger' key={i}>
                        {tip}
                      </Badge>
                    ))}
                  </CardText>
                  <CardText className='fs-5'>
                    Habilidades: {habilidades.map((hab, i) => (
                      <Badge pill className='me-1' color='dark' key={i}>
                        {hab}
                      </Badge>
                    ))}
                  </CardText>
                  <CardText className='fs-5 text-capitalize'>
                    Habitat: <b>{habitat}</b>
                  </CardText>
                </Col>
                <Col md='6' >
                  <img src={imagen} className='img-fluid'></img>
                </Col>
                <Col md='12 mt-3'>
                  <CardText className='fs-4 text center'><b>Estadísticas</b></CardText>
                </Col>
                {estaditicas.map((est, i) => (
                  <Row key={i}>
                    <Col xs='6' md='3'><b>{est.nombre}</b></Col>
                    <Col xs='6' md='9'>
                      <Progress className='my-2' value={est.valor}>{est.valor}</Progress>
                    </Col>
                  </Row>
                ))}
                
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default detalle
