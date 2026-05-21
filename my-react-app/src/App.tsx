import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function ConfirmDel({ onConfirm, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Supprimer ? Tu es sûr ? 🧟‍♀️😡</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Non je suis désolé 💕</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Supprimer 😱
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


  function Todolist_tab({ tab }) {
  return (
    <TableRow>
      <TableCell>{tab.id}</TableCell>
      <TableCell>{tab.nom}</TableCell>
      <TableCell>{tab.date}</TableCell>
      <TableCell>{tab.final_date}</TableCell>
    </TableRow>
  )
}



function App() {
  
  const [texte, setTexte] = useState("")
  const [todolist, setTodolist] = useState([])

  function ajouterTodo(input) {
    if (input.trim() === "" ) {
      return
    }

    setTodolist([...todolist, { id: todolist.length + 1, nom: input ,date: new Date().toLocaleDateString(), final_date:1 }])
    setTexte("")
  }

 function supprimerTodo(id) {
  setTodolist(todolist.filter(function(todo) {
    return todo.id !== id
  }))
}

  function reinitialiser() {
    setTodolist([])
  }


  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Ajouter des choses à faire 😁😁😁
      </h1>
      
      <Input value={texte} onChange={function(e){ setTexte(e.target.value) }} onKeyDown={function(e){ if(e.key === "Enter"){ ajouterTodo(texte) }}}/>
      <ConfirmDel onConfirm = {() => reinitialiser()}><Button>RÉINITIALISATION</Button></ConfirmDel>
      <p className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"> {todolist.length} {todolist.length > 1 ? "taches restantes" : "tache restante"} </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Tâche</TableHead>
            <TableHead>Date début</TableHead>
            <TableHead>Date fin</TableHead>
            <TableHead>Supprimer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todolist.map(function(todo) {
            return <Todolist_tab key={todo.id} tab={todo} />
          })}
        </TableBody>
    </Table>
    </div>
  )
}

export default App
