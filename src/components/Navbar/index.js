import {useState} from 'react'
import {MdMenu} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

function Navbar(props) {
  const {activeTab} = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(true)
  }

  const closeToggleMenu = () => {
    setIsOpen(false)
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const home = activeTab === 'Home' ? 'addColor' : ''
  const shelf = activeTab === 'Bookshelves' ? 'addColor' : ''

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668503427/Group_7731_vgjmxi.png"
            alt="login website logo"
            className="website-logo"
          />
        </Link>
        <ul className="destop-nav-listitems">
          <li>
            <Link to="/">
              <button className={`destop-nav-item ${home}`} type="button">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/shelf">
              <button className={`destop-nav-item ${shelf}`} type="button">
                Bookshelves
              </button>
            </Link>
          </li>
          <li>
            <button
              className="destop-logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <button className="icon" onClick={toggleMenu} type="button">
          <MdMenu />
        </button>
      </nav>
      {isOpen && (
        <ul className="mobile-nav-list-items">
          <li>
            <Link to="/">
              <button className={`mobile-nav-btn ${home}`} type="button">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/shelf">
              <button className={`mobile-nav-btn ${shelf}`} type="button">
                Bookshelves
              </button>
            </Link>
          </li>
          <li>
            <button
              className="mobile-logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
          <button
            className="close-icon"
            type="button"
            onClick={closeToggleMenu}
          >
            <AiOutlineClose />
          </button>
        </ul>
      )}
    </>
  )
}

export default withRouter(Navbar)
