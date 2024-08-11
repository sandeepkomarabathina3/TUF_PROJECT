import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
  const [banner, setBanner] = useState({
    description: '',
    timer: 0,
    link: '',
    visible: false
  });

  useEffect(() => {
    axios.get('/api/banner')
      .then(response => {
        setBanner(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleToggleBanner = () => {
    setBanner({ ...banner, visible: !banner.visible });
  };

  const handleUpdateBanner = (event) => {
    const { name, value } = event.target;
    setBanner({ ...banner, [name]: value });
  };

  const handleSaveBanner = () => {
    axios.post('/api/banner', banner)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Dynamic One-Page Website</h1>
      {banner.visible && (
        <div>
          <h2>{banner.description}</h2>
          <p>Countdown: {banner.timer} seconds</p>
          <a href={banner.link} target="_blank">Click here</a>
          <Countdown timer={banner.timer} />
        </div>
      )}
      <Dashboard
        banner={banner}
        onToggleBanner={handleToggleBanner}
        onUpdateBanner={handleUpdateBanner}
        onSaveBanner={handleSaveBanner}
      />
    </div>
  );
}

function Countdown({ timer }) {
  const [count, setCount] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <p>Countdown: {count} seconds</p>
  );
}

function Dashboard({ banner, onToggleBanner, onUpdateBanner, onSaveBanner }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <label>
        Banner On/Off:
        <input
          type="checkbox"
          checked={banner.visible}
          onChange={onToggleBanner}
        />
      </label>
      <br />
      <label>
        Banner Description:
        <input
          type="text"
          value={banner.description}
          onChange={onUpdateBanner}
          name="description"
        />
      </label>
      <br />
      <label>
        Banner Timer:
        <input
          type="number"
          value={banner.timer}
          onChange={onUpdateBanner}
          name="timer"
        />
      </label>
      <br />
      <label>
        Banner Link:
        <input
          type="text"
          value={banner.link}
          onChange={onUpdateBanner}
          name="link"
        />
      </label>
      <
