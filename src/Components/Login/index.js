// import {Component} from 'react'
import { useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
//   state = {username: '', password: '', showSubmitError: false, errorMsg: ''}
const [username, setUserName] = useState("")
const [password, setPassword] = useState("")
const [showSubmitError, setShowSubmitError] = useState(false) 
const [errorMsg, setErrorMsg] = useState('')

const navigate = useNavigate();
// const location = useLocation();

  const onChangeUsername = event => {
    // this.setState({username: event.target.value})
    setUserName(event.target.value)

  }

  const onChangePassword = event => {
    // this.setState({password: event.target.value})
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    // const {history} = this.props
    navigate("/", {replace: true})
    
    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
    })
    
  }
  
  const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Navigate to="/" />
    }

  const onSubmitFailure = errorMsg => {
    // this.setState({errorMsg, showSubmitError: true})
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
     onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }


    // const {username, password, showSubmitError, errorMsg} = this.state
    
    
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-website-logo"
            alt="website logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="username-input-field"
              onChange={onChangeUsername}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="password-input-field"
              onChange={onChangePassword}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }

export default Login



