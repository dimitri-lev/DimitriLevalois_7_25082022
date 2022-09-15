import Log from '../../components/Log';
import Logo from '../../components/Logo';
/* import Log from '../../components/Log';
import { useEffect } from 'react'; */

function Home() {
  /*   useEffect(() => {
    fetch(`http://localhost:3000/api/posts`).then((response) =>
      response
        .json()
        .then(({ data }) => console.log(data))
        .catch((error) => console.log(error))
    );
  }, []); */
  return (
    <div>
      <div>
        <Logo />
      </div>
      <div>
        <Log />
      </div>
    </div>
  );
}

export default Home;
