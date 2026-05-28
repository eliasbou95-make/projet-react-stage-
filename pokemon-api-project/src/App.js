import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
function App() {
    const [name, setName] = useState(null);
    const [sprite, setSprite] = useState(null);
    const [pokedex, setPokedex] = useState(null);
    const [stats, setStats] = useState(null);
    const [types, setTypes] = useState(null);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["ditto"],
        queryFn: async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=2000");
            return response.data.results;
        }
    });
    async function getStats(name) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setStats(res.data.stats[0].base_stat);
    }
    async function getSprite(name) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const genV = res.data.sprites.versions["generation-v"]["black-white"].front_default;
        setSprite(genV || res.data.sprites.front_default);
    }
    async function getTypes(name) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setTypes(res.data.types[0].type.name);
    }
    async function getPokedex(name) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        setPokedex(res.data.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text);
    }
    return (_jsxs("div", { style: { display: "flex", alignItems: "flex-start" }, children: [_jsx("ul", { className: 'pokemon-list', children: data && data.map((obj) => (_jsx("li", { onClick: () => { setName(obj.name); getSprite(obj.name); getTypes(obj.name); getStats(obj.name); getPokedex(obj.name); }, children: obj.name }, obj.name))) }), _jsx("div", { style: {
                    padding: "20px", width: "30%", position: "sticky", top: 0, marginLeft: "auto"
                }, children: _jsxs(Card, { style: { backgroundImage: "url('https://i.pinimg.com/originals/62/39/4d/62394d753859943e6a1a36443ef78795.gif')" }, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [" ", name, " "] }) }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [sprite && _jsx("img", { src: sprite, style: { width: "200px" } }), types && _jsx("img", { src: `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${types}.svg`, style: { width: "50px" } })] }), stats && _jsxs("p", { children: [stats, " de puissance "] }), pokedex && _jsx("p", { style: { fontSize: "16px" }, children: pokedex })] }) })] }));
}
export default App;
