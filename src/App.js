import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const data = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

function App() {
  const [list, setList] = useState(data);
  const [text, setText] = useState("");
  const [targetItemId, setTargetItemId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({isActivated: false, type: "danger", text: ""});

  const handleCreateNewItem = (e) => {
    e.preventDefault();
    if (text && !isEditing) {
      showAlert(true, "success", "You just created an Element!")
      const newItem = {
        id: Date.now().toString(),
        text: text
      }
      setList(oldList => [...oldList, newItem]);
      setText("");
  
    }
    else if (text && isEditing) {
      setList(prevList => prevList.map(item => {
        if (item.id === targetItemId) {
          return {...item, text: text}
        }
        else {
          return item
        }
      })
      )
      showAlert(true, "success", "You just edited an Element!")
      setIsEditing(false);
      setTargetItemId(null);
      setText("");

    }
    else {
      showAlert(true, "danger", "Write a text!");
    }
  }
  const handleEditItem = (id) => {
    setIsEditing(true);
    setTargetItemId(id);
    setText(list.find(item => item.id === id).text)

  }
  const handleDeleteItem = (id) => {
    setList(prevList => (
      prevList.filter(item => item.id !== id)
    ));
    showAlert(true, "danger", "You just deleted an Element")
  }
  const showAlert = (isActivated = false, type = "", text = "") => {
    setAlert({isActivated: isActivated, type: type, text: text})
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

  return (
    <section className="section-center">
      <form onSubmit={handleCreateNewItem} className="grocery-form">
        {alert.isActivated && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input type="text" placeholder="e.g. eggs" value={text} onChange={(e) => setText(e.target.value)}/>
          <button type="submit" className="submit-btn">{isEditing ? "Edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 &&
      <div className="grocery-container">
        <List items={list} onEdit={handleEditItem} onDelete={handleDeleteItem}/>
        <button type="button" className="clear-btn" onClick={() => setList([])}>clear items</button>
      </div>
      }
    </section>
  )
}

export default App
