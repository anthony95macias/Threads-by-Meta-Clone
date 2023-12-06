import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
// import PopUp from './components/PopUp';
import Feed from './components/Feed';
import './App.css';

const App =()=>  {
  const [user, setUser] = useState(null)
  const userId = "665c2c2f-9e1e-4ecd-9737-7854c1446348"

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
      const data = await response.json() 
      setUser(data[0])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  console.log(user)

    return (
      <>
        {user && <div className='app'>
          <Nav url={user.instagram_url}/>
          <Header 
              user = {user}
          />
          <Feed />
          {/* <PopUp/> */}
        </div>}
      </>
    )
  }

export default App;
