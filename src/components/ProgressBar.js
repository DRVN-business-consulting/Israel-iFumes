import React, { useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ProgressBar = ({ progress, duration }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { primaryColor, theme } = useContext(ThemeContext);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: (progress / duration) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, duration]);

  // Helper function to format time in minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: primaryColor, 
            },
          ]}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: primaryColor }]}>
          {formatTime(progress)}
        </Text>
        <Text style={[styles.timeText, { color: primaryColor }]}>
          /{formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    width: "100%", 
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#404040", 
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
  },
});

export default ProgressBar;
