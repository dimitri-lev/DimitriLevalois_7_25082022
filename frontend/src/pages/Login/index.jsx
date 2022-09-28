import { useEffect } from 'react';

function Signup() {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' }),
    };
    fetch('http://localhost:3000/api/auth/login', requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  }, []);
  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" />
      </div>
      <button>SIGNUP</button>
    </form>
  );
}

export default Signup;
