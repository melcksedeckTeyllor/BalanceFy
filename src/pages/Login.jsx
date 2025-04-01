import React from 'react'
import "./Login.css"
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  return (
    <>
        <div className='container-login'>
            <div className='logo-login'>
                <h1>Balance<span>Fy</span> <span className='span-login'>Login</span></h1>
            </div>
            <div className='form-login'>
                <form action="">
                    <div>
                        <label htmlFor="">E-mail</label>
                        <input type="text" placeholder='Digite seu e-mail' required />
                    </div>
                    <div>
                        <label htmlFor="">Senha</label>
                        <input type="password" placeholder='Digite sua senha'  required/>
                    </div>
                </form>
                <a className='password-recover' href="">Esqueceu sua senha?</a>
                <button className='btn-login'>Entrar</button>
                <button className='btn-register'> <FontAwesomeIcon icon={faGoogle} width={50} height={50} color='#F03D3D' /> Conecte-se usando o Google</button>
                <p>Não possui conta? <a href="">Cadastre-se</a></p>
            </div>
        </div>
    </>
  )
}

export default Login
