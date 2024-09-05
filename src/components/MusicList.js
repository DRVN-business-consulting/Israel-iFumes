import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const MusicList = ({
  setScreen,
  setSelectedSong,
  musicData,
  setCurrentSongIndex,
}) => {
  const { theme, toggleTheme, primaryColor, changePrimaryColor } =
    useContext(ThemeContext);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  // Define available colors
  const availableColors = ["red", "blue", "green"];

  const handleColorSelect = (color) => {
    changePrimaryColor(color);
    setColorPickerVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={musicData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedSong(item);
              setCurrentSongIndex(index);
              setScreen("player");
            }}
            style={[styles.itemContainer, { borderLeftColor: primaryColor }]}
          >
            <Image source={{ uri: item.image }} style={styles.albumArt} />
            <View style={styles.textContainer}>
              <Text style={[styles.songTitle, { color: primaryColor }]}>
                {item.title}
              </Text>
              <Text style={[styles.artistName, { color: primaryColor }]}>
                {item.artist}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: theme.background === "#121212" ? "#FFF" : "#000",
            },
          ]}
        />
      </TouchableOpacity>

      {/* Primary Color Selector */}
      <TouchableOpacity
        onPress={() => setColorPickerVisible(true)}
        style={[styles.themeButton, { backgroundColor: primaryColor }]} // Set the background color to primaryColor
      >
        <Text style={[styles.themeButtonText, { color: theme.background }]}>
          Theme
        </Text>
      </TouchableOpacity>

      {/* Color Picker Modal */}
      <Modal
        transparent={true}
        visible={colorPickerVisible}
        onRequestClose={() => setColorPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.colorPickerContainer}>
            {availableColors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => handleColorSelect(color)}
                style={[styles.colorButton, { backgroundColor: color }]} // Color button background
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 5,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: 10,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artistName: {
    fontSize: 14,
  },
  themeToggleButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  themeButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 80,
  },
  themeButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  colorPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MusicList;
