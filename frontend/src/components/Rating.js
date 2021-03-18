import React from 'react'

const Rating = props => {
    const { rating, numReviews, color } = props
    return (
        <div className="py-2">
            <span>
                <i style={{color}} className={rating >= 1 ? "fas fa-star" : rating >=0.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 2 ? "fas fa-star" : rating >=1.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 3 ? "fas fa-star" : rating >=2.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 4 ? "fas fa-star" : rating >=3.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i style={{color}} className={rating >= 5 ? "fas fa-star" : rating >=4.5 ? "fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span className="px-1">{rating} from {numReviews} reviews</span>
        </div>
    )
}

export default Rating
