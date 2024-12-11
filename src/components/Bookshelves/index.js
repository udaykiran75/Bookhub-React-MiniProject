import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Navbar from '../Navbar'
import Filters from '../Filters'
import BookCard from '../BookCard'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    booksList: [],
    activeBookshelfId: bookshelvesList[0].id,
    bookshelfName: bookshelvesList[0].value,
    bookshelfLabel: bookshelvesList[0].label,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksDetails()
  }

  getBooksDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {searchInput, bookshelfName} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        id: book.id,
        title: book.title,
        readStatus: book.read_status,
        rating: book.rating,
        authorName: book.author_name,
        coverPic: book.cover_pic,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTabItem = (tabId, value, label) => {
    this.setState(
      {activeBookshelfId: tabId, bookshelfName: value, bookshelfLabel: label},
      this.getBooksDetails,
    )
  }

  renderLoadingView = () => (
    <div className="loading-spin-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookshelvesList = () => {
    const {activeBookshelfId} = this.state
    return (
      <div className="bookshelves-left-navbar">
        <h1 className="heading-bookshelves">BookShelves</h1>
        <ul className="bookshelves-options">
          {bookshelvesList.map(eachItem => (
            <Filters
              tabItemsDetails={eachItem}
              isActive={eachItem.id === activeBookshelfId}
              key={eachItem.id}
              onClickTabItem={this.onClickTabItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterInputKey = event => {
    if (event.key === 'Enter') {
      this.getBooksDetails()
    }
  }

  onClickSearchBtn = () => {
    this.getBooksDetails()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          value={searchInput}
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterInputKey}
          type="search"
        />
        <button
          className="search-button"
          type="button"
          onClick={this.onClickSearchBtn}
          testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  desktopHeadSearch = () => {
    const {bookshelfLabel} = this.state
    return (
      <div className="desktop-head-search-container">
        <h1 className="desktop-bookshelf-name">{bookshelfLabel} Books</h1>
        {this.renderSearchInput()}
      </div>
    )
  }

  renderNoBooksView = () => {
    const {searchInput} = this.state
    return (
      <div className="noBooksView-container">
        <img
          src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668777219/Asset_1_1_rkyftd.png"
          alt="no books"
          className="no-books-img"
        />
        <p className="noBooksView-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksLists = () => {
    const {booksList} = this.state
    const emptyView = booksList.length === 0
    return (
      <>
        {emptyView ? (
          this.renderNoBooksView()
        ) : (
          <>
            <ul className="books-list-container">
              {booksList.map(eachBook => (
                <BookCard bookDetails={eachBook} key={eachBook.id} />
              ))}
            </ul>
            <Footer />
          </>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failureView-container">
      <img
        src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668774835/Group_7522_mcny6j.png"
        alt="failure view"
        className="failure-image-bf"
      />
      <p className="failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        className="tryAgain-button"
        type="button"
        onClick={this.getBooksDetails}
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
        return this.renderBooksLists()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelves-container">
        <Navbar activeTab="Bookshelves" />
        <div className="desktop-bookShelf-container">
          <div className="bookshelves-main-container">
            <div className="mobile-search-container">
              {this.renderSearchInput()}
            </div>
            {this.renderBookshelvesList()}
          </div>
          <div className="desktop-bookShelf-div">
            {this.desktopHeadSearch()}
            {this.renderApiStatusView()}
          </div>
        </div>
      </div>
    )
  }
}
export default Bookshelves
