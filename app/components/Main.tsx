"use client";
import { useEffect, useState } from 'react';
import { AiOutlineGithub } from 'react-icons/ai'; // Import GitHub icon from react-icons

const fetchData = async () => {
  try {
    const response = await fetch('/api/random-photo', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error fetching data:', error);
    return getRandomPastelColor(); // Return random pastel color on error
  }
};

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = 70 + Math.floor(Math.random() * 20); // Saturation between 70% and 90%
  const lightness = 80 + Math.floor(Math.random() * 10); // Lightness between 80% and 90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // HSL color format
};

const Main = () => {
  const [background, setBackground] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");

  const style = {
    background: background.startsWith('http')
      ? `url(${background}) no-repeat center/cover`
      : background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  useEffect(() => {
    const getData = async () => {
      const imageUrl = await fetchData();
      setBackground(imageUrl);
    };

    getData();
  }, []);

  const fetchRandomStrategy = async () => {
    try {
      const response = await fetch('/api/random-strategy', { cache: 'no-store' });
      const data = await response.json();
      setStrategy(data.strategy);
    } catch (error) {
      console.error('Error fetching random strategy:', error);
    }
  };

  useEffect(() => {
    fetchRandomStrategy();
  }, []);

  const handleCardClick = () => {
    fetchRandomStrategy();
  };

  return (
    <div style={style} className="relative">
      <div className="absolute top-4 right-4">
        <a
          href="https://github.com/iameddieyayaya/ObliqueStrategies-Next"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-800 hover:text-gray-600 text-white text-xl"
        >
          <AiOutlineGithub className="text-4xl mr-2" />
          <span className="text-2xl">View on GitHub</span>
        </a>
      </div>

      {/* CARD */}
      <div
        className="flex justify-center items-center w-[415px] h-[220px] text-center p-4 m-4 bg-white shadow-lg rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105 opacity-0 animate-fadeIn cursor-pointer"
        onClick={handleCardClick}
      >
        <h3 className="text-xl font-semibold text-black">{strategy}</h3>
      </div>
    </div>
  );
};

export default Main;
