/* import { useEffect } from 'react'; */

function Signup() {
  /* const aEnvoyer = {
    firstName: inputFistName.value,
    lastName: inputLastName.value,
    password: inputPassword.value,
    email: inputEmail.value,
  };
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aEnvoyer }),
    };
    fetch('http://localhost:3000/api/auth/login', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []); */
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
      <button>LOGIN</button>
    </form>
  );
}

export default Signup;
