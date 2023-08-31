import { useState } from 'react'
import MovieTable from './MovieTable'
import NetworkTable from './NetworkTable'
import useNetwork from './useNetwork'

function App() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [minutes, setMinutes] = useState('')
  const [target, setTarget] = useState('')
  const { network, loss, movies, addMovie, train, steps } = useNetwork()
  function handleSubmit(event) {
    event.preventDefault()
    addMovie(title, year, minutes, target)
    setTitle('')
    setYear('')
    setMinutes('')
    setTarget('')
  }

  return (
    <>
      <h1>MovieLearn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={event => setYear(event.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={event => setMinutes(event.target.value)}
        />
        <input
          type="number"
          placeholder="Target"
          value={target}
          onChange={event => setTarget(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <MovieTable movies={movies} />
      <h2>Steps: {steps}</h2>
      <h2>Loss: {loss.toFixed(20)}</h2>
      <NetworkTable network={network} />
      <button onClick={train}>Train</button>
    </>
  )
}

export default App
