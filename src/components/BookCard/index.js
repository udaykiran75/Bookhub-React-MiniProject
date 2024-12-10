import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookCard = props => {
  const {bookDetails} = props
  const {authorName, coverPic, title, rating, readStatus, id} = bookDetails

  return (
    <Link to={`/books/${id}`} id="link">
      <li className="bookList-item">
        <img src={coverPic} className="coverPic" alt={title} />
        <div className="bookDetails-container">
          <h1 className="book-title">{title}</h1>
          <p className="book-authorName">{authorName}</p>
          <div className="rating-container">
            <p className="ratingHeading">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
          <div className="status-container">
            <p className="statusHeading">Status :</p>
            <p className="readStatus">{readStatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default BookCard
