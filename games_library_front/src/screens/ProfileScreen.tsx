import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useParams } from 'react-router-dom';


export const ProfileScreen = () => {
  const [userName, setUserName] = useState('')
  const { username } = useParams<{ username: string }>()

  useEffect(() => {
    (
      async () => {
        try {
          const response = await api.User(String(username))
          const response2 = await api.getUser()
          setUserName(response.data.username)
          if (response2.data.username == username) {
            console.log('aaa')
          }
          else{
            setUserName('Такого чувака нет')
          }

        } catch (err) {
          setUserName('Такого чувака нет')
          console.log("login error");
          console.log(err)
        }
      })
      ()
  })

  return (
    <div>ProfileScreen {userName}</div>
  )
}
