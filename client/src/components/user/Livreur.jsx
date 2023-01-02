import {React} from 'react';
import Nav from './components/Nav';

function Livreur() {

  return (
    <div>
      <Nav />
      <div className='m-5 pt-5'>Bonjour {localStorage.getItem('username')}, votre role et: {localStorage.getItem('role')}.</div>
    </div>
  );
}

export default Livreur;