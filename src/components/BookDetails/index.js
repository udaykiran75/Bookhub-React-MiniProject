import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'
import Navbar from '../Navbar'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getFormattedData = book => ({
    id: book.id,
    authorName: book.author_name,
    coverPic: book.cover_pic,
    aboutBook: book.about_book,
    rating: book.rating,
    readStatus: book.read_status,
    title: book.title,
    aboutAuthor: book.about_author,
  })

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.book_details)
      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-spinner-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getBookDetails()
  }

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

  renderBookDetails = () => {
    const {bookData} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookData
    return (
      <div className="detailsCard-container">
        <div className="details-container">
          <img src={coverPic} alt={title} className="coverPic-image" />
          <div className="bookDescription-container">
            <h1 className="title-heading">{title}</h1>
            <p className="authorName-book">{authorName}</p>
            <div className="ratings-container">
              <p className="heading-rating">Avg Rating</p>
              <BsFillStarFill className="icon-star" />
              <p className="book-rating">{rating}</p>
            </div>
            <div className="readStatus-container">
              <p className="headingStatus">Status:</p>
              <p className="read-status">{readStatus}</p>
            </div>
          </div>
        </div>
        <hr className="horizantal-line" />
        <h1 className="about-author">About Author</h1>
        <p className="author-description">{aboutAuthor}</p>
        <h1 className="about-book">About Book</h1>
        <p className="book-description">{aboutBook}</p>
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderBookDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {bookData} = this.state
    console.log(bookData)
    return (
      <div className="bookDetails-main-container">
        <Navbar />
        {this.renderApiStatusView()}
        <Footer />
      </div>
    )
  }
}
export default BookDetails
