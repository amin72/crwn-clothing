import React from 'react'
import './menu-item.scss'
import { Link } from 'react-router-dom'

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    return (
        <div to={linkUrl} className={`${size} menu-item`}>
            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="content">
                <Link to={linkUrl} className='link'>
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">SHOP NOW</span>
                </Link>
            </div>
        </div>
    )
}
    

export default MenuItem
