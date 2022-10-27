import GetPosts from '../components/GetPosts/GetPosts';
import Logo from '../components/Logo';
import { Navigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost/CreatePost';
import Logout from '../components/Logout';

function Posts() {
  //Vérification sur le Token existe ?
  //Si non retoruner sur la page login

  //axion get allPost (headers : autorization TOKEN)
  //Si ok -> afficher le post
  //Catch -> redirection login/404

  //HTML afficher tous les posts via composant post (image, text, j'aime)

  const tokenData = JSON.parse(localStorage.getItem('token'));
  const token = tokenData.token;

  if (!token) {
    return <Navigate to="/" />;
  }

  //UseStat newpost false

  return (
    <div>
      <div>
        <Logout />
        <Logo />
      </div>
      <div>
        <CreatePost token={token} />
        <GetPosts token={token} />
      </div>
    </div>
  );
}

export default Posts;
