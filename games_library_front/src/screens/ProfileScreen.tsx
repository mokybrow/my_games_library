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
          // const data = response.data
          // console.log(response.data[0].username)

          setUserName(response.data[0].username)
          if (response2.data.username == username) {
            console.log('aaa')
          }

        } catch (err) {
          console.log("login error");
        }
      })
      ()
  })

  return (
    <div>ProfileScreen {userName}</div>
  )
}
