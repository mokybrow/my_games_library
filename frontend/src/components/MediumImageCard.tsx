import React, { FC, useState } from 'react'
import './styles/medium-image-container.css'
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl'
import { Link } from 'react-router-dom'
import { ModalWindow } from './ModalWindow'

export interface ImageCardProps {
    src: string,
    title: string,
    username: string,
    comment: string,
    img: string,
    grade: number,
    slug: string,
    columnSpan: number,
    created_at: Date
}


export const MediumImageCard: FC<ImageCardProps> = ({ src, title, username, comment, img, grade, slug, columnSpan, created_at }) => {
    var parse = require('html-react-parser');
    const [actvie, setModalActive] = useState(false);

    return (
        <>
            <div className="medium-card-container" style={{ gridColumnEnd: `span ${columnSpan}` }}>
                <div className="img-container">
                    <img src={src} alt='' width="150" height="150" />
                </div>
                <div className="text-container">
                    <div className="text-container-header" >
                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :

                            <img className="user-mini-img" src={`data:image/jpeg;base64,${img}`} width={100} height={100} />}
                        <Link to={'/' + username}><h3>{username}</h3></Link>
                        <div className="user-grade-container">
                            {grade <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : grade >= 6 && grade >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                            {grade !== null ? <span className='grade-number-container'><FormattedNumber
                                value={grade}
                            /></span> : <span className='grade-number-container'><FormattedMessage id="content.gameprofile.nodata" /></span>}
                        </div>

                    </div>
                    <div className="text-container-body">
                        <Link to={'/game/' + slug}><h4>{title}</h4></Link>
                        <div className='text-container-body-not-modal' onClick={() => setModalActive(true)} >{parse(comment)}</div>
                    </div>
                </div>
            </div>
            <ModalWindow active={actvie} setActive={setModalActive}>
                <div className="text-container">
                    <div className="text-container-header" >
                        {img === null || img === '' ? <img className="user-mini-img" src={require('../icons/user.png')} /> :

                            <img className="user-mini-img" src={`data:image/jpeg;base64,${img}`} width={100} height={100} />}
                        <Link to={'/' + username}><h3>{username}</h3></Link>
                        <span className='game-profile-release'>
                            <FormattedDate
                                value={created_at}
                                year='numeric'
                                month='long'
                                day='numeric'
                            />
                        </span>
                        <div className="user-grade-container">
                            {grade <= 5 ? <span className='rate-star' style={{ color: "#FF0000" }}>&#9733;</span> : grade >= 6 && grade >= 8 ? <span className='rate-star' style={{ color: "#1349C9" }}>&#9733;</span> : null}
                            {grade !== null ? <span className='grade-number-container'><FormattedNumber
                                value={grade}
                            /></span> : <span className='grade-number-container'><FormattedMessage id="content.gameprofile.nodata" /></span>}
                        </div>

                    </div>
                    <div className="text-container-body">
                        <Link to={'/game/' + slug}><h2>{title}</h2></Link>
                        <div className='text-container-body-modal'>{parse(comment)}</div>
                    </div>
                </div>


            </ModalWindow>
        </>
    )
}
