import {React, useState, useEffect} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Logoauth from './components/Logoauth'
import Input from './components/Input'
import Label from './components/Label'
import Error from './components/Error'
import Button from './components/Button'

function Login() {
  const [login, setLogin] = useState({
    email: localStorage.getItem('email'),
    password: localStorage.getItem('password')
  })

  const onChange = (e) => {
    const value = e.target.value;
    setLogin({...login, [e.target.name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    axios.post('http://localhost:9000/api/auth/login', login)
        .then(e=>{
            if(e.data.role) {
              localStorage.setItem('token', e.data.token)
              localStorage.setItem('role', e.data.role)
              localStorage.setItem('username', e.data.username)
              console.log(e.data.data)
              window.location.replace(`http://localhost:3000/${e.data.role}`)
            }
            else toastr.warning(e.data, {positionClass: "toast-bottom-left"})
        })
        .catch(()=>{ console.log('Error') })
  }

  return (
    <section className="d-flex justify-content-center align-items-center">
      <form onSubmit={onSubmit} className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-1 py-5">
          <Logoauth />
          <div className="text-muted h5">Have an account ?</div>
          <div className="form-floating text-muted col-10">
              <Input type="text" name='email' value={login.email} id="floatingInput" placeholder="Email" onChange={onChange}/>
              <Label htmlFor="floatingInput" label="Email address" />
              <Error id='email' />
          </div>
          <div className="form-floating text-muted col-10">
              <Input type="password" name='password' value={login.password} id="floatingPassword" placeholder="Password" onChange={onChange}/>
              <Label htmlFor="floatingPassword" label="Password" />
              <Error id='password' />
          </div>
          <div className="col-10 d-flex justify-content-between align-items-center mt-3">
              <a className="text-dark">Forgot Password</a>
              <a className="text-dark" href="register">Register</a>
          </div>
          <div className="w-50 form-group d-flex justify-content-center position-relative">
              <Button button='Login' />
          </div>
      </form>
    </section>
  );
}

export default Login;