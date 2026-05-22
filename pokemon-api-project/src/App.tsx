import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function App() {
  const [sprite , setSprite] = useState<string | null> (null) 
  const [pokedex, setPokedex] = useState<string | null>( null)
  const [stats, setStats] = useState<number | null> (null)
  const [types, setTypes] = useState<string | null> (null)
  const {data, isLoading, isError} = useQuery<{name : string, url: string}[]>({
    queryKey: ["ditto"],
    queryFn: async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
      return response.data.results
    }
  })

async function getStats(name: string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  setStats(res.data.stats[0].base_stat)
}

async function getSprite(name: string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  setSprite(res.data.sprites.versions["generation-v"]["black-white"].front_default)
}

async function getTypes(name : string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  setTypes(res.data.types[0].type.name)
}

async function getPokedex(name : string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  setPokedex(res.data.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text)
}

  return (
  <div>

    {data && data.map((obj) => (
      <button onClick={() => { getSprite(obj.name); getTypes(obj.name); getStats(obj.name);  getPokedex(obj.name)}}key={obj.name}>{obj.name}</button>
      ))}
    {sprite && <img src={sprite} />}
    {types && <p>{types}</p>}
    {stats && <p>{stats}</p>}
    {pokedex && <p>{pokedex}</p>}
  </div>
) }


export default App 
