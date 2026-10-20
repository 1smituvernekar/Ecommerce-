
import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {

  const [Login, setLogin] = useState('SignUp')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword,setShowPassword] = useState(false)
const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate()

  const onsubmitHandler = async (e) => {

    e.preventDefault()

    try {

      // ================= LOGIN =================

      if (Login === 'Login') {

        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          {
            email: email,
            password: password
          }
        )

        console.log(data)

        if (data.success) {
          localStorage.setItem('token', data.token)
          console.log('Login successful')
          navigate('/')
        }

      }
      

      // ================= SIGN UP =================

      else {

        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          {
            name: name,
            email: email,
            password: password
          }
        )

        console.log(data)

        if (data.success) {
          localStorage.setItem('token', data.token)
          console.log('Registration successful')
          navigate('/')
        }

      }

    } catch (error) {

      console.log(error)

      if (error.response) {
        console.log(error.response.data)
      }

    }
  }

  return (
    <div className="form">

      <div className="login">

        <h2>{Login}</h2>

        <form onSubmit={onsubmitHandler}>

          {Login === 'Login'
            ? 'Login Form'
            : 'SignUp Form'
          }

          {/* NAME - Only SignUp */}
          {Login === 'SignUp' && (
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          {/* PASSWORD */}
          <div className='pw'>
            <input
            type={showPassword ? 'text' :'password'}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            
          />
          <span onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? "🙈" : "👁️"}
  </span>

          </div>
          
          
          

          <div>

            {/* Go to Login */}
            <p onClick={() => setLogin('Login')}>
              Already have an account?
            </p>

            {/* Go to SignUp */}
            <p onClick={() => setLogin('SignUp')}>
              Create an account
            </p>

          </div>

          <button type="submit">
            {Login === 'Login' ? 'Login' : 'Sign Up'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login
