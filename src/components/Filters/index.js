import './index.css'

const Filters = props => {
  const {tabItemsDetails, onClickTabItem, isActive} = props
  const {id, label, value} = tabItemsDetails
  const activeBtn = isActive ? 'active-btn' : ''

  const onClickButton = () => {
    onClickTabItem(id, value, label)
  }

  return (
    <li className="tab-items-list">
      <button
        className={`list-item-btn ${activeBtn}`}
        type="button"
        onClick={onClickButton}
      >
        {label}
      </button>
    </li>
  )
}
export default Filters
