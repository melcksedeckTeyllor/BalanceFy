import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <>
        <div className="container-register">
            <h1>Balance<span>Fy</span></h1>
            <div className='form-register'>
                <form action="">
                    <div className='form-group-register'>
                        <label htmlFor="">E-mail</label>
                        <input type="text"required />
                    </div>
                    <div className='form-group-register'>
                        <label htmlFor="">Nome</label>
                        <input type="text"required />
                    </div>
                    <div className='form-group-register'>
                        <label htmlFor="">Senha</label>
                        <input type="password" required/>
                    </div>
                    <div className='form-group-register'>
                        <label htmlFor="">Número de Celular</label>
                        <input type="text"required />
                    </div>
                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Register