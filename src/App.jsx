import { useState } from 'react'
import Main from './components/Main'
import Header from './components/Header'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  )
}