export default function MovieTable (props) {
  const rows = props.movies.map(movie => {
    return (
      <tr key={movie.title}>
        <td>{movie.title}</td>
        <td>{movie.year}</td>
        <td>{movie.minutes}</td>
        <td>{movie.target}</td>
        <td>{movie.prediction?.toFixed(5)}</td>
        <td>{movie.error?.toFixed(5)}</td>
      </tr>
    )
  })
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Minutes</th>
          <th>Target</th>
          <th>Prediction</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}