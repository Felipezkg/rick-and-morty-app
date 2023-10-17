
import React, { useState, useEffect } from 'react';

import axios from "axios";

import { Link } from "react-router-dom";

import '../styles/Home.css'

export default function Home() {

  const API = "https://rickandmortyapi.com/api/character/?status=alive"

  const [listaDePersonagens, setListaDePersonagens] = useState();

  const [buscarPersonagem, setBuscarPersonagem] = useState();

  const [status, setStatus] = useState('Alive');


  useEffect(() => {
    axios.get(`${API}`)
      .then(response => {
        setListaDePersonagens(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }, [])

  const buscarPesquisa = (event) => {
    setBuscarPersonagem(event.target.value);
  };

  const mudarNome = (nome) => {

    const ENDPOINT = `https://rickandmortyapi.com/api/character/?name=${nome}&status=${status}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setListaDePersonagens(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  }

  const mudarStatus = (event) => {
    setStatus(event.target.value);
    const ENDPOINT = `https://rickandmortyapi.com/api/character/?status=${event.target.value}`
    axios.get(`${ENDPOINT}`)
      .then(response => {
        setListaDePersonagens(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching API URLs:', error);
      });
  };

  return (
    <div className='corpo-app'>
      <div className='lista-personagem'>
        <div className='informacoes'>
          <a>Lista de Personagens</a>
          <div className='informacoes-input'>
            <input
              type="text"
              placeholder="Pesquisar Por Nome"
              value={buscarPersonagem}
              onChange={buscarPesquisa}
            />
            <button onClick={() => mudarNome(buscarPersonagem)}>Pesquisar</button>
            <select value={status} onChange={mudarStatus}>
              <option value="Alive">Alive</option>
              <option value="Unknown">Unknown</option>
              <option value="Dead">Dead</option>
            </select>
          </div>
        </div>
        <div>
          {listaDePersonagens && Object.values(listaDePersonagens).map((personagem, index) => (
            <div key={index} className='card-personagem'>
              <img
                src={personagem.image}
              />
              <div className='text-align'>
                <a>{personagem.name}</a>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}


