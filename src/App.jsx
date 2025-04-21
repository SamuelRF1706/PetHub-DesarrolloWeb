import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './Footer'
import RegisterPage from './RegisterPage'
import axios from 'axios'
import LoginPage from './LogInPage'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  const [todos, setTodos] = useState()

  // const api = 'https://jsonplaceholder.typicode.com/'
  // const getTodos = async () => {
  //   const Response = await axios.get(`${api}todos/1`)
  //   console.log(Response.data) 
  //   setTodos(Response.data)
  // }

  // const getPost = async () => {
  //   const Response = await axios.get(`${api}posts/1`)
  //   console.log(Response.data)
  //   setTodos(Response.data)
  // }

  // const getPhotos = async () => {
  //   const Response = await axios.get(`${api}photos/1`)
  //   console.log(Response.data)
  //   setTodos(Response.data)
  // }

  // const getComments = async () => {
  //   const Response = await axios.get(`${api}comments/1`)
  //   console.log(Response.data)
  //   setTodos(Response.data)
  // }

  // useEffect(() => {
  //   getTodos()
  //   getPost()
  //   getPhotos()
  //   getComments()
  // }, [])

  return (
    <>
      <div class="d-grid gap-2">
      </div>
      <LoginPage/>
        
    </>
  )
}

export default App
