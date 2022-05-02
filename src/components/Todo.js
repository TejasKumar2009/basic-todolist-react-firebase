import React from 'react'
import Typography from "@material-ui/core/Typography";
import deleteIcon from "../delete_icon.svg"

const Todos = (props) => {
  return (
    <>
    <div>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" comp
          ponent="div">{props.todo.todo}</Typography>

          <img name={props.todo.id} onClick={props.deleteTodo} style={{cursor: "pointer"}} height="25" width="25" className="deleteIcon" src={deleteIcon} alt="Hiiiiiiii" />
    </div>

    </>


  )
}

export default Todos