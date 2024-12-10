import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668503294/Rectangle_1467_xopszv.jpg"
          className="LoginImageDesktop"
          alt="website login"
        />
        <img
          src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668522135/Ellipse_99_ukjnyz.png"
          alt="website login"
          className="website-login-image"
        />
        <img
          src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668503427/Group_7731_vgjmxi.png"
          alt="login website logo"
          className="logo-image"
        />
        <div className="login-desktop-container">
          <form onSubmit={this.onSubmitForm} className="form-container">
            <img
              src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668503427/Group_7731_vgjmxi.png"
              alt="login website logo"
              className="logo-image-desktop"
            />
            <div className="inputs-container">
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input-element"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="inputs-container">
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input-element"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div>
              {errorMsg && <p className="error-msg text-danger">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginRoute
