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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"




function App() {
  const [name, setName] = useState<string | null>(null)
  const [sprite , setSprite] = useState<string | null> (null) 
  const [pokedex, setPokedex] = useState<string | null>( null)
  const [stats, setStats] = useState<number | null> (null)
  const [types, setTypes] = useState<string | null> (null)
  const [moves, setMoves] = useState<string[] | null>(null)
  const [lvl_moves, setLvlmoves] = useState<string[] | null>(null)
  const [stats2, setStats2] = useState<Record<string, number> | null>(null)

  const {data, isLoading, isError} = useQuery<{name : string, url: string}[]>({
    queryKey: ["ditto"],
    queryFn: async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20000")
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

async function getLvl (name : string ){
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const simpleLvl = res.data.moves.map((m: any) => m.version_group_details[0].level_learned_at);
  setLvlmoves(simpleLvl)
}

async function getAllStats(name: string) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const statsObject = res.data.stats.reduce((acc: any, s: any) => {
    acc[s.stat.name] = s.base_stat;
    return acc;
  }, {});

  setStats2(statsObject);
}





return (
  <div className="flex">
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
    <ul className="pokemon-list h-screen overflow-y-auto">
      {data && data.map((obj) => (
        <li
          key={obj.name}
          onClick={() => {
            getAllStats(obj.name);
            getLvl(obj.name);
            getMoves(obj.name);
            setName(obj.name);
            getSprite(obj.name);
            getTypes(obj.name);
            getStats(obj.name);
            getPokedex(obj.name);
          }}
        >
          {obj.name}
        </li>
      ))}
    </ul>
    </ScrollArea>

    <div className="flex flex-col flex-1 p-4 h-screen">
      <div className="flex gap-4 justify-center h-[440px]">
        <Card
          className="w-[300px] p-4 bg-cover bg-center overflow-y-auto"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/62/39/4d/62394d753859943e6a1a36443ef78795.gif')",
          }}
        >
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>

          {sprite && <img src={sprite} className="w-[150px]" />}
          {types && (
            <img
              src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${types}.svg`}
              className="w-[50px]"
            />
          )}

          {stats && <p>{stats} de puissance</p>}
          {pokedex && <p className="text-sm">{pokedex}</p>}
        </Card>

        <Card
          className=" p-4 bg-cover bg-center h-[screen] overflow-y-auto w-[300px]"
          style={{
            backgroundImage:
              "url('https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUycHo1ZHk1cGRlNDF3NHRuaDRoZ3V3YTQydG5kZGQ0ZGs1YmxqcTY5aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CxCsN7IWwoucw/source.gif')",
          }}
        >
          {stats2 && (
            <div className="text-white">
              <p>HP : {stats2.hp}</p>
              <p>Attack : {stats2.attack}</p>
              <p>Defense : {stats2.defense}</p>
              <p>Sp. Attack : {stats2["special-attack"]}</p>
              <p>Sp. Defense : {stats2["special-defense"]}</p>
              <p>Speed : {stats2.speed}</p>
            </div>
          )}
        </Card>
      </div>

      <Card
        className="mt-4 w-full min-h-[300px] p-4 bg-cover bg-center overflow-y: auto "
        style={{
          backgroundImage:
            "url('https://64.media.tumblr.com/586097ea810a24bfa440a14ecf3ef1d4/tumblr_nmqi95bduu1rjrskmo2_r1_400.gif')",
        }}
      >
        <div className="flex flex-wrap gap-2 h-screen overflow-y-auto">
          {moves &&
            moves.map((m, index) => (
              <p key={m} className="bg-white/20 px-2 py-1 rounded">
                {m} - lvl {lvl_moves && lvl_moves[index]}
              </p>
            ))}
        </div>
      </Card>

    </div>
  </div>
);
  }


export default App 
