import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // allows crop
      aspect: [1, 1], // square crop
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-outline" size={40} color="#999" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>John Doe</Text>

        <View style={styles.statusContainer}>
          <View style={styles.activeDot} />
          <Text style={styles.statusText}>Active Member</Text>
        </View>
      </View>

      {/* PERSONAL INFO CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        <InfoRow label="Membership No." value="CH-2024-0012" />
        <InfoRow label="Phone" value="+254 712 345 678" />
        <InfoRow label="Email" value="john@example.com" />
        <InfoRow label="Department" value="Media Department" />
        <InfoRow label="Ministry" value="Youth Ministry" />
        <InfoRow label="Birthday" value="12 March 1998" />
      </View>

      {/* ATTENDANCE CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Attendance Report</Text>

        <View style={styles.attendanceRow}>
          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceNumber}>24</Text>
            <Text style={styles.attendanceLabel}>This Year</Text>
          </View>

          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceNumber}>3</Text>
            <Text style={styles.attendanceLabel}>This Month</Text>
          </View>

          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceNumber}>85%</Text>
            <Text style={styles.attendanceLabel}>Rate</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#0B3D2E",
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },

  placeholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginTop: 12,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#88c244",
    marginRight: 6,
  },

  statusText: {
    color: "#fff",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },

  infoRow: {
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: "#777",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  attendanceBox: {
    alignItems: "center",
  },

  attendanceNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3c51a1",
  },

  attendanceLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
