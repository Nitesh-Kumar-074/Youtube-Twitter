import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='text-3xl bg-green-700 text-white m-4 p-4 rounded-lg'>A mern stack project of youtube - tweeter</div>
    </>
  )
}

export default App
