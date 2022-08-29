import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ReqResListado {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        Usuario[];
  support:     Support;
}

interface Usuario {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

interface Support {
  url:  string;
  text: string;
}

export const App = () => {

  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const reqResApi = axios.create({
    baseURL: 'https://reqres.in/api'
  })

  const cargarUsuarios = async( page ) => {
    const resp = await reqResApi.get<ReqResListado>(`/users?page=${page}`)
    setUsuarios( resp.data.data)
      // .then( resp => setUsuarios(resp.data.data))
      // .catch( console.log )
  };

  useEffect(() => {
    cargarUsuarios(1)
  }, [])

  return (
    <>
      <div className='container'>
        <h1 className='text-primary'>Tablas con Typescript</h1>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map( usuario => (
                <tr key={usuario.id}>
                  <td><img src={usuario.avatar} alt={usuario.first_name} className='usuarioFoto' /></td>
                  <td>{usuario.first_name} {usuario.last_name}</td>
                  <td>{usuario.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button className='btn btn-primary' onClick={ () => cargarUsuarios(1) }>Anteriores</button>
        <button className='btn btn-primary mx-1' onClick={ () => cargarUsuarios(2) }>Siguientes</button>
      </div>
    </>
  );
};