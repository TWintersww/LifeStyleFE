import { Link } from "react-router-dom"

const BarItem = ({title, to}) => {

  return (
    <h3>
      <Link to={to}>
        {title}
      </Link>
    </h3>
  )
}

export default BarItem
