import React, { useState } from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import MusicList from "./src/components/MusicList";
import MusicPlayer from "./src/components/MusicPlayer";

const App = () => {
  const [screen, setScreen] = useState("list");
  const [selectedSong, setSelectedSong] = useState(null); // Initialize with null
  const [musicData, setMusicData] = useState([
    {
      id: "1",
      title: "Erika",
      artist: "Herms Niel",
      image:
        "https://static.wikia.nocookie.net/anthems/images/6/60/Erika.jpeg/revision/latest?cb=20231214115818",
      fileName: "song1.mp3",
    },
    {
      id: "2",
      title: "Strawberry Rush",
      artist: "Chuu",
      image: "https://i.scdn.co/image/ab67616d0000b273cc681b43015ca45cd52e4625",
      fileName: "song2.mp3",
    },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % musicData.length;
    setSelectedSong(musicData[nextIndex]);
    setCurrentSongIndex(nextIndex);
  };

  const previousSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + musicData.length) % musicData.length;
    setSelectedSong(musicData[prevIndex]);
    setCurrentSongIndex(prevIndex);
  };

  return (
    <ThemeProvider>
      {screen === "list" ? (
        <MusicList
          setScreen={setScreen}
          setSelectedSong={setSelectedSong}
          musicData={musicData}
          setCurrentSongIndex={setCurrentSongIndex}
        />
      ) : (
        <MusicPlayer
          setScreen={setScreen}
          selectedSong={selectedSong}
          nextSong={nextSong}
          previousSong={previousSong}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
