import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




function App() {
  const [name, setName] = useState<string | null>(null)
  const [sprite , setSprite] = useState<string | null> (null) 
  const [pokedex, setPokedex] = useState<string | null>( null)
  const [stats, setStats] = useState<number | null> (null)
  const [types, setTypes] = useState<string | null> (null)
  const [moves, setMoves] = useState<string[] | null>(null)

  const {data, isLoading, isError} = useQuery<{name : string, url: string}[]>({
    queryKey: ["ditto"],
    queryFn: async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20")
      return response.data.results
    }
  })

async function getStats(name: string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  setStats(res.data.stats[0].base_stat)
}

async function getSprite(name: string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const genV = res.data.sprites.versions["generation-v"]["black-white"].front_default
  setSprite(genV || res.data.sprites.front_default)
}

async function getTypes(name : string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  setTypes(res.data.types[0].type.name)
}

async function getPokedex(name : string){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  setPokedex(res.data.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text)
}

async function getMoves(name: string) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const simpleMoves = res.data.moves.map((m: any) => m.move.name);
  setMoves(simpleMoves);
}

  return (
  <div style={{display:"flex", alignItems:"flex-start"}}>
    <ul className='pokemon-list'>
      {data && data.map((obj) => (
        <li onClick={() => {getMoves(obj.name) ; setName(obj.name) ;  getSprite(obj.name); getTypes(obj.name); getStats(obj.name);  getPokedex(obj.name)}}key={obj.name}>{obj.name}</li>
        ))}
    </ul>
    <div style={{
      padding: "30px", width: "30%", marginLeft : "auto" 
      }}>


    <Card style={{ backgroundImage: "url('https://i.pinimg.com/originals/62/39/4d/62394d753859943e6a1a36443ef78795.gif')" }}>
      <CardHeader>
        <CardTitle> AAAAA </CardTitle>
      </CardHeader>
      <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
    {sprite && <img src={sprite} style={{width:"200px"}} />}
    {types && <img src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${types}.svg`} style={{width:"50px"}}/>}
    </div>
    {stats && <p>{stats} de puissance </p>}
    {pokedex && <p style={{fontSize: "16px"}}>{pokedex}</p>}
    </Card>
    <Card>
    {moves && moves.map((m) => (
  <p key={m}>{m}</p>
))}
    </Card>
  </div>
  </div>
)}





export default App 
