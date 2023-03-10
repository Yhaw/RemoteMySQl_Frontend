import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch('https://kdeebackendenpoint.onrender.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://kdeebackendenpoint.onrender.com/input_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        number,
        amount,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setName('');
        setNumber('');
        setAmount('');
        setShowAlert(true); // show alert on successful registration
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Number:
          <input type="text" value={number} onChange={event => setNumber(event.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" value={amount} onChange={event => setAmount(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {showAlert && (
        <div className="alert alert-success" role="alert">
          Registration successful!
        </div>
      )}

      <h2>Users:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
