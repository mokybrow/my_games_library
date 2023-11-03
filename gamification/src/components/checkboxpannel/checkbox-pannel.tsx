import React, { FC, useContext, useState } from 'react'
import { Context } from '../..';
import GameService from '../../services/game-service';
import { useNavigate, useParams } from 'react-router-dom';
import ModalWindow from '../modalwindow/modal-window';
import './checkbox-pannel.css'
import { observer } from 'mobx-react-lite'

export interface CheckboxPannelProps {
    inPassed: number
    inLiked: number
    inWishlist: number
}

const CheckboxPannel: FC<CheckboxPannelProps> = ({inPassed, inLiked, inWishlist}) => {
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [actvie, setModalActive] = useState(false);
    let navigate = useNavigate();

    const addGameToPassed = async () => {
        if (auth_store.isAuth) {
            await GameService.operationWithPassed(games_store.gameProfile.id);
        }
        else {
            navigate('/login')
        }
    }

    const addGameToLiked = async () => {
        if (auth_store.isAuth) {
            await GameService.operationWithLiked(games_store.gameProfile.id);
        } else {
            navigate('/login')
        }
    }

    const addGameToWantPlay = async () => {
        if (auth_store.isAuth) {
            await GameService.operationWithWanted(games_store.gameProfile.id);
        } else {
            navigate('/login')
        }
    }

    const addGameToList = async (list_id: string) => {
        if (auth_store.isAuth) {
            await games_store.addGameToUserList(list_id)
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="checkbox-card-body-mobile">
            <ModalWindow active={actvie} setActive={setModalActive}>
                <h1>Добавить игру в свой список</h1>
                {games_store.userLists.length > 0 ? games_store.userLists?.map(list =>
                    <button key={list.list_id} className='action-button' onClick={() => addGameToList(list.list_id)}
                        style={list.in_list == 1 ? { background: '#00A000' } : { background: '#FF0000' }}>{list.title}</button>) : null}
            </ModalWindow>
            <div className="check-box-panel">
                <div className="checkbox">
                    <input onClick={addGameToPassed} className="custom-checkbox check" type="checkbox" id="color-5" name="color-5"  defaultChecked={inPassed== 1 ? true : false} />
                    <label htmlFor="color-5"></label>
                </div>
                <div className="checkbox">
                    <input onClick={addGameToLiked} className="custom-checkbox heart" type="checkbox" id="color-6" name="color-6"  defaultChecked={inLiked == 1 ? true : false} />
                    <label htmlFor="color-6"></label>
                </div>
                <div className="checkbox">
                    <input onClick={addGameToWantPlay} className="custom-checkbox clock" type="checkbox" id="color-7" name="color-7"  defaultChecked={inWishlist == 1 ? true : false} />
                    <label htmlFor="color-7"></label>
                </div>
                <div className="checkbox">
                    <input onClick={() => setModalActive(true)} className="custom-checkbox plus" type="button" id="color-8" name="color-8" />
                    <label htmlFor="color-8"></label>
                </div>
            </div>
        </div>
    )
}


export default observer(CheckboxPannel);