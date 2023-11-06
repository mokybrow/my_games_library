import React, { FC, useContext, useState } from 'react'
import './addreview.css'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../..'
import ModalWindow from '../modalwindow/modal-window'

// export interface addReviewProps {
//     active: boolean,
//     setActive: any,
//     children: any
// }

const AddReview: FC = () => {
    const [actvie, setModalActive] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comment, setComment] = useState<string | null>(null);
    const [isOpen, setOpen] = useState(false);
    const { slug } = useParams<string>();
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    let navigate = useNavigate();

    const isOpenMove = () => {
        setOpen(!isOpen)
        if (Number(games_store.userGrade?.grade)) {
            setRating(Number(games_store.userGrade?.grade))
        } else {
            setRating(0)
        }
        if (Number(games_store.userGrade?.grade)) {
            setHover(Number(games_store.userGrade?.grade))
        } else {
            setHover(0)
        }
    }
    return (
        <>
            {
                !auth_store.isAuth ? null :
                    <>
                        {games_store?.userGrade?.grade > 0 ?
                            <div onClick={() => { isOpenMove() }} className='game-profile-grade'>
                                <span>Ваша оценка {games_store.userGrade.grade}</span>
                            </div> :

                            <div onClick={() => { { isOpenMove() } { setOpen(true) } { setComment(null) } }} className='game-profile-grade'>
                                <span>Оценка</span>
                            </div>}
                        <ModalWindow active={isOpen} setActive={setOpen}>
                            <div className={`grade-numbers ${isOpen ? 'active' : ''}`}>
                                {[...Array(10)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <span
                                            id='rate-numbers'
                                            key={index}
                                            className={index <= (hover || rating) && index < 5 ? "red-rate" : index <= (hover || rating) && index <= 6 ? "gray-rate" : index <= (hover || rating) && index >= 6 ? "green-rate" : "off"}
                                            onClick={() => { { setRating(index) } }}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}

                                        >{index}
                                        </span>
                                    );
                                })}
                            </div>
                            <textarea className='comment-area'
                                placeholder='Опишите ваш игровой опыт... (400 символов максимум)'
                                onChange={e => { { setComment(e.target.value) } { games_store.userGrade.comment = e.target.value } }} maxLength={400} value={games_store.userGrade.comment != undefined ? String(games_store.userGrade.comment) : undefined} />


                            {rating === undefined || hover === undefined ? null : <button className='action-button' onClick={() => { { setOpen(!isOpen) } { games_store.addReview(games_store.gameProfile.id, rating, comment, String(slug)) } { setComment(null) } }} disabled={rating == 0 ? true : false}>Оставить отзывы</button>
                            }

                            {games_store.userGrade?.grade > 0 || games_store.userGrade?.grade != null ?
                                <button onClick={() => { { games_store.deleteReview(games_store.gameProfile.id, String(slug)) } { setComment(null) } { setOpen(!isOpen) } { setRating(0) } }}
                                    className={`action-button ${isOpen ? 'active' : ''}`}>
                                    <span>Удалить Оценку</span>
                                </button> : null}
                        </ModalWindow>

                    </>
            }
        </>
    )
}

export default observer(AddReview);

