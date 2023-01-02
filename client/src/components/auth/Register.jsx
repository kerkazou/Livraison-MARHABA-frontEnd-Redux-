import {React, useState} from 'react';
import axios from 'axios'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Logoauth from './components/Logoauth'
import Input from './components/Input'
import Label from './components/Label'
import Error from './components/Error'
import Button from './components/Button'

function Register() {
    const [register, setRegister] = useState({})

    const onChange = (e) => {
        const value = e.target.value;
        setRegister({...register, [e.target.name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/auth/register', register)
            .then(e=>{
                if(e.data.message) {
                    toastr.success(e.data.message, {positionClass: "toast-bottom-left"})
                    localStorage.setItem('email', e.data.email)
                    localStorage.setItem('password', e.data.password)
                    window.location.replace(`http://localhost:3000/login`)
                }
                else toastr.warning(e.data, {positionClass: "toast-bottom-left"})
            })
            .catch(error=>{ console.log(error) })
    }

  return (
    <section className="d-flex justify-content-center align-items-center">
        <form onSubmit={onSubmit} className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-1 py-5">
            <Logoauth />
            <div className="text-muted h5">have't an account ?</div>
            <div className="form-floating text-muted col-10">
                <Input type="text" name='username' id="floatingUsername" placeholder="Username" onChange={onChange}/>
                <Label htmlFor="floatingInput" label='Username' />
                <Error id='username' />
            </div>
            <div className="form-floating text-muted col-10">
                <Input type="text" name='email' id="floatingInput" placeholder="Email" onChange={onChange}/>
                <Label htmlFor="floatingInput" label='Email address' />
                <Error id='email' />
            </div>
            <div className="form-floating text-muted col-10">
                <Input type="password" name='password' id="floatingPassword" placeholder="Password" onChange={onChange}/>
                <Label htmlFor="floatingPassword" label='Password' />
                <Error id='password' />
            </div>
            <div className="form-floating text-muted col-10">
                <Input type="password" name='cofirm_password' id="floatingPassword" placeholder="Confirm Password" onChange={onChange}/>
                <Label htmlFor="floatingPassword" label='Confirm Password' />
                <Error id='cofirm_password' />
            </div>
            <div className="col-10 d-flex justify-content-between align-items-center mt-3">
                <a className="text-dark" href="login">Login</a>
            </div>
            <div className="w-50 form-group d-flex justify-content-center position-relative">
                <Button button='Register' />
            </div>
        </form>
    </section>
  );
}

export default Register;