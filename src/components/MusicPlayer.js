import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";
import { ThemeContext } from "../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";

const MusicPlayer = ({ setScreen, selectedSong, nextSong, previousSong }) => {
  const { theme, primaryColor } = useContext(ThemeContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(180);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    setProgress(0);
    nextSong();
  };

  const handlePreviousSong = () => {
    setProgress(0);
    previousSong();
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < duration) {
            return prev + 1;
          } else {
            clearInterval(interval);
            handleNextSong();
            return duration;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: selectedSong.image }} style={styles.albumArt} />
      <Text style={[styles.songTitle, { color: primaryColor }]}>
        {selectedSong.title}
      </Text>
      <Text style={[styles.artistName, { color: primaryColor }]}>
        {selectedSong.artist}
      </Text>
      <ProgressBar progress={progress} duration={duration} />
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handlePreviousSong}
          style={[styles.controlButton, { borderColor: primaryColor }]}
        >
          <AntDesign name="stepbackward" size={24} color={primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={[
            styles.controlButton,
            styles.playButton,

            { borderColor: primaryColor },
          ]}
        >
          <Text style={[styles.controlText, { color: "#fff" }]}>
            {isPlaying ? (
              <AntDesign name="pause" size={24} color={primaryColor} />
            ) : (
              <AntDesign name="caretright" size={24} color={primaryColor} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextSong}
          style={[styles.controlButton, { borderColor: primaryColor }]}
        >
          <AntDesign name="stepforward" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setScreen("list")}
        style={styles.backButton}
      >
        <Text style={[styles.backButtonText, { color: primaryColor }]}>◀︎</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  albumArt: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  artistName: {
    fontSize: 18,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  playButton: {},
  controlText: {
    fontSize: 32,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 32,
  },
});

export default MusicPlayer;
