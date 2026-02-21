import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";

export default function LiveScreen() {
  // 🔴 Change this to false to simulate "No Live"
  const [isLive] = useState(true);

  // Replace with your real YouTube Live video ID
  const liveVideoId = "dQw4w9WgXcQ"; // dummy ID

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Live Service</Text>

      {isLive ? (
        <View style={styles.videoContainer}>
          {/* GREEN LIVE BADGE */}
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE NOW</Text>
          </View>

          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${liveVideoId}?autoplay=1&modestbranding=1&rel=0`,
            }}
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator size="large" color="#2e7d32" />
            )}
          />
        </View>
      ) : (
        <View style={styles.noLiveContainer}>
          <Text style={styles.noLiveTitle}>No Live Service Currently</Text>
          <Text style={styles.noLiveSub}>
            Please check back later for our next service.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f8f4",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 15,
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  liveBadge: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 10,
    backgroundColor: "#2e7d32",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
  },
  noLiveContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noLiveTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b5e20",
    marginBottom: 10,
  },
  noLiveSub: {
    fontSize: 14,
    color: "#4caf50",
    textAlign: "center",
  },
});
