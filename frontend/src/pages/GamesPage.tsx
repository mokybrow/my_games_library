import React, { useEffect, useState } from 'react'
import GameService from '../service/GameService';
import { useParams } from 'react-router-dom';
import { GamesResponse } from '../models/response';

export const GamesPage = () => {
  const { id } = useParams<string>();
  const [games, setGames] = useState<GamesResponse[]>([]);
  const getGames = async () =>{

    try {
      const response = await GameService.get_games(Number(id));
      setGames(response.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getGames();
    console.log(games)
  }, [])

  return (
      <>
      {games.map(game => <div key={game.id}>{game.title}{<img src={game.cover}/>}</div>)}

      </>
  )
}

