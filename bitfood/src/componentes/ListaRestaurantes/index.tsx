import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(res => {
        setRestaurantes(res.data.results)
        setProximaPagina(res.data.next)
      })
      .catch(error => console.log(error))
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(res => {
        setRestaurantes([...restaurantes, ...res.data.results])
        setProximaPagina(res.data.next)
      })
      .catch(error => console.log(error))
    }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && 
      <a href='#' onClick={verMais}>
        Ver mais
      </a>
    }
  </section>)
}

export default ListaRestaurantes