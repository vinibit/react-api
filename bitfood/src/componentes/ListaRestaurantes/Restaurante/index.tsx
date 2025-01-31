import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import IPrato from '../../../interfaces/IPrato';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import axios from 'axios';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {

  const [pratos, setPratos] = useState<IPrato[]>(restaurante.pratos ?? [])

  useEffect(() => {
    axios.get<IPrato[]>(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then(res => {        
        setPratos(res.data)
      })
      .catch(error => console.log(error))
  }, [restaurante.id])

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {        
        pratos.length == 0 
          ? <p>Por enquanto está desértico aqui...</p>
          : pratos.map(item => <Prato prato={item} key={item.id} />)
      }
    </div>
  </section>)
}

export default Restaurante