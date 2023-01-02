import axios from 'axios'
import Logo from './logo.png';

function Nav() {
  const onClick = () => {
    axios.get('http://localhost:9000/api/auth/logout')
      .then(() => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/login')
      })
      .catch(() => { console.log('Error') })
  }

  return (
    <nav className="navbar navbar-light bg-light position-fixed top-0 w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="logo" className="w-25"></img>
        </a>
        <button onClick={onClick} type="submit" className="border-0 fw-bold h5 bg-light">Logout</button>
      </div>
    </nav>
  );
}

export default Nav;