import { FaTrash } from "react-icons/fa";

const IconButton = () => {
  return (
      <div className="rounded-circle" style={{
          width: 32,
          height: 32,
          margin: "8px auto",
          backgroundColor: "white",
      }}><FaTrash color="var(--bs-danger"/></div>
  )
}

export default IconButton