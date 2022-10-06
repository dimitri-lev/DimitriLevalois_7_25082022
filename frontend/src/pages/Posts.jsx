import GetPosts from '../components/GetPosts/GetPosts';
import Logo from '../components/Logo';
import { Navigate } from 'react-router-dom';

function Posts() {
  //Vérification sur le Token existe ?
  //Si non retoruner sur la page login

  //axion get allPost (headers : autorization TOKEN)
  //Si ok -> afficher le post
  //Catch -> redirection login/404

  //HTML afficher tous les posts via composant post (image, text, j'aime)

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <Logo />
      </div>
      <div>
        <GetPosts token={token} />
      </div>
    </div>
  );
}

export default Posts;
