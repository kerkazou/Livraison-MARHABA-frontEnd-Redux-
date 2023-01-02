import { React } from 'react';
import '../../App.css';

function Manager() {

  return (
    <div>
      <Nav />
      <div className='m-5 pt-5'>Bonjour {localStorage.getItem('username')}, votre role et: {localStorage.getItem('role')}.</div>
    </div>
  );
}

export default Manager;