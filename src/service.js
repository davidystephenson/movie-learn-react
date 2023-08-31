function sigma (x) {
  return 1 / (1 + Math.exp(-x))
}

function perceptron (axons, a, b) {
  const [weightA, weightB, bias] = axons

  const feelingA = a * weightA
  const feelingB = b * weightB

  const opinion = feelingA + feelingB + bias
  const prediction = sigma(opinion)

  return prediction
}

export function predictMovie (network, normalYear, normalMinutes) {
  const neuron1 = perceptron(network[0], normalYear, normalMinutes)
  const neuron2 = perceptron(network[1], normalYear, normalMinutes)
  const neuron3 = perceptron(network[2], neuron1, neuron2)

  return neuron3
}


export function getError (prediction, movie) {
  return Math.abs(prediction - movie.target)
}

export function getLoss (movies) {
  const predictions = movies.filter(movie => movie.error != null)
  return predictions.reduce((sum, movie) => sum + movie.error, 0) / movies.length
}

export function predictMovies (network, movies) {
  const averageYear = movies.reduce((sum, movie) => sum + movie.year, 0) / movies.length
  const averageMinutes = movies.reduce((sum, movie) => sum + movie.minutes, 0) / movies.length
  const predictions = movies.map((movie) => {
    const normalYear = movie.year - averageYear
    const normalMinutes = movie.minutes - averageMinutes
    const prediction = predictMovie(network, normalYear, normalMinutes)
    const error = getError(prediction, movie)
    return { ...movie, prediction, error }
  })
  const loss = getLoss(predictions)
  return { loss, predictions }
}

function mutate (number) {
  const chaos = Math.random()
  const upOrDown = chaos - 0.5

  return number + upOrDown
}

export function evolve (network) {
  return network.map(axons => axons.map(mutate))
}
