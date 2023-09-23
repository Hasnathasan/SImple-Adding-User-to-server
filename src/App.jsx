import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef()
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const newUsers = [...users, data]
      setUsers(newUsers)  
    });
    
    console.log(nameRef.current.value);
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" required/>
        <br />
        <input type="text" name="email" id="" required/>
        <br />
        <input type="submit" value="Submit data" />
        <input type='text'  ref={nameRef} placeholder='name'/>
      </form>
      <h1>Total User: {users.length}</h1>
    </div>
  );
};

export default App;
