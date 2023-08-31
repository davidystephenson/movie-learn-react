import { useState, useEffect } from 'react'
import { evolve, predictMovies } from './service'

export default function useNetwork () {
  const [movies, setMovies] = useState([
    { title: 'Mad Max: Fury Road', year: 2015, minutes: 120, target: 1 }, // good?
    { title: 'Inception', year: 2010, minutes: 135, target: 1 },
    { title: 'The Force Awakens', year: 2015, minutes: 135, target: 0 },
    { title: 'The Godfather', year: 1972, minutes: 177, target: 1 },
    { title: 'The Wizard of Oz', year: 1939, minutes: 102, target: 0 },
    { title: 'Wolf of Wall Street', year: 2013, minutes: 180, target: 1 },
    { title: 'E.T.', year: 1982, minutes: 114, target: 0 },
    { title: 'Back to the Future', year: 1985, minutes: 116, target: 0 },
    { title: 'Grease', year: 1978, minutes: 110, target: 0 },
    { title: 'Gone With the Wind', year: 1939, minutes: 221, target: 0 }
  ])
  const [network, setNetwork] = useState(() => {
    const network = localStorage.getItem('network')
    if (network == null) {
      return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }
    return JSON.parse(network)
  })
  const [steps, setSteps] = useState(1) 
  const [loss, setLoss] = useState(0)
  useEffect(() => {
    if (steps == 0 || steps === 1000) {
      return
    }
    const { loss, predictions } = predictMovies(network, movies)
    setLoss(loss)
    setMovies(predictions)
    const offspring = evolve(network)
    const { loss: offspringLoss } = predictMovies(offspring, movies)
    const improvement = loss - offspringLoss
    if (improvement > 0) {
      setNetwork(offspring)
      localStorage.setItem('network', JSON.stringify(offspring))
      setSteps(1)
    } else {
      setSteps(steps + 1)
    }
  }, [steps, network, movies])
  function addMovie (title, year, minutes, target) {
    const movie = {
      title,
      year: parseInt(year),
      minutes: parseInt(minutes),
      target: parseInt(target)
    }
    setMovies(results => [...results, movie])
  }
  function train() {
    setNetwork([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    setSteps(1)
  }

  return { movies, addMovie, network, steps, loss, train }
}