import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items, onEdit, onDelete}) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <article className="grocery-item">
            <p className="title">{item.text}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={() => onEdit(item.id)}>
                <FaEdit />
              </button>
              <button type="button" className="delete-btn" onClick={() => onDelete(item.id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default List
