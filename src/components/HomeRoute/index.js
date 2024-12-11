import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  intial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {bookList: [], apiStatus: apiStatusConstants.intial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const getBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const response = await fetch(getBooksUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        id: book.id,
        title: book.title,
        authorName: book.author_name,
        coverPic: book.cover_pic,
      }))
      this.setState({
        bookList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSlider = () => {
    const {bookList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {bookList.map(eachBook => {
            const {id, authorName, coverPic, title} = eachBook
            return (
              <Link to={`/books/${id}`} className="slick-item">
                <li className="slick-item" key={id}>
                  <img className="cover-pic" src={coverPic} alt="title" />
                  <h6 className="title">{title}</h6>
                  <p className="authorName">{authorName}</p>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Puff" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView-container">
      <img
        src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668774835/Group_7522_mcny6j.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        className="tryAgain-button"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {bookList} = this.state
    console.log(bookList)
    return (
      <div className="homepage-container">
        <Navbar activeTab="Home" />
        <div className="home-content-div">
          <h2>Find Your Next Favorite Books?</h2>
          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf">
            <button className="find-button" type="button">
              Find Books
            </button>
          </Link>
        </div>
        <div className="top-ratedBooks-container">
          <div className="heading-and-button-div">
            <h3 className="desktop-head">Top Rated Books</h3>
            <Link to="/shelf" className="fnd-link">
              <button className="desktop-button" type="button">
                Find Books
              </button>
            </Link>
          </div>
          {this.renderApiStatusView()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default HomeRoute
