import GetPosts from '../../components/GetPosts';
import Logo from '../../components/Logo';

function Posts() {
  //Vérification sur le Token existe ?
  //Si non retoruner sur la page login

  //axion get allPost (headers : autorization TOKEN)
  //Si ok -> afficher le post
  //Catch -> redirection login/404

  //HTML afficher tous les posts via composant post (image, text, j'aime)

  return (
    <div>
      <div>
        <Logo />
      </div>
      <div>
        <GetPosts />
      </div>
    </div>
  );
}

export default Posts;
