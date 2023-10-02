import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GameService from '../service/GameService';
import { GameProfileResponse, GamesResponse, PlatformPlatform } from '../models/response';

export const GameProfile = () => {
    const { slug } = useParams<string>();
    const [game, setGames] = useState<GameProfileResponse>();
    const getGames = async () => {
        try {
            const response = await GameService.get_game_by_slug(String(slug));
            setGames(response.data)
            console.log(game)
        } catch (error) {

        }
    }

    useEffect(() => {
        getGames();
    }, [])
    return (
        <div>
            {game?.title}
            {game?.platform.map(x=><div key={x.platform.id}>{x.platform.name}</div>)}
            {game?.genre.map(y=> <div key={y.id}>{y.name}</div>)}
        </div>
    )
}
