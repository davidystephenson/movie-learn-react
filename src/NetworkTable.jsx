export default function NetworkTable (props) {
  const rows = props.network.map((axons, index) => {
    const cells = axons.map((axon, index) => {
      return (
        <td key={index}>{axon.toFixed(5)}</td>
      )
    })

    return (
      <tr key={index}>
        {cells}
      </tr>
    )
  })
  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}