import { Link } from 'react-router-dom'

export default function ActionHeader({actiontext, actionlinktext, actionlink}) {
    return (
        <>
            <div className="action-header-inner-div">
                <h2>{actiontext}</h2>
                <div className="new-add-btn">
                    <Link to={actionlink}>
                        <button className='btn btn-light fw-semibold'>{actionlinktext}</button>
                    </Link>
                </div>
            </div>
            <hr />
        </>
    )
}
