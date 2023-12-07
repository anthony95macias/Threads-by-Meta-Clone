import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Header from './components/Header';
import Feed from './components/Feed';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState([]);

  const userId = "665c2c2f-9e1e-4ecd-9737-7854c1446348";

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`);
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter((thread) => thread.reply_to === null) || [];
      setFilteredThreads(standAloneThreads);
    } else {
      const replyThreads = threads?.filter((thread) => thread.reply_to !== null) || [];
      setFilteredThreads(replyThreads);
    }
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  return (
    <>
      {user && (
        <div className='app'>
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            filteredThreads={filteredThreads}
          />
        </div>
      )}
    </>
  );
};

export default App;
