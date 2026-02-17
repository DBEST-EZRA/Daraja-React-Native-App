import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#0B3D2E", "#ffffff"]}
      locations={[0.4, 0.9]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello Ezra 👋</Text>
            <View style={styles.headerIcons}>
              <Ionicons name="search" size={22} color="white" />

              <View style={styles.notificationWrapper}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="white"
                  style={{ marginLeft: 15 }}
                />

                {/* Badge */}
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>5</Text>
                </View>
              </View>
            </View>
          </View>

          {/* WALLET CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Main Wallet</Text>
            <Text style={styles.accountNumber}>25471240517201</Text>

            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.cardBtn}>
                <Text style={styles.cardBtnText}>Statement</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cardBtn}>
                <Text style={styles.cardBtnText}>Deposit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* QUICK ACTIONS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.grid}>
              {[
                "Send",
                "Withdraw",
                "Pay Till",
                "E-citizen",
                "Buy Tokens",
                "Mpesa Bank",
                "Buy Airtime",
                "Remit",
              ].map((item, index) => (
                <TouchableOpacity key={index} style={styles.actionItem}>
                  <View style={styles.circle}>
                    <Ionicons name="wallet-outline" size={22} color="#fff" />
                  </View>
                  <Text style={styles.actionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* NOTICES SECTION */}
          <View style={styles.noticeSection}>
            <Text style={styles.sectionTitle}>Latest Notices</Text>

            {[
              {
                title: "System Upgrade",
                content:
                  "Our platform will undergo maintenance tonight from 11PM.",
                date: "17 Feb 2026",
                time: "09:45 AM",
              },
              {
                title: "Loan Offer",
                content:
                  "You are pre-approved for a personal loan up to KES 50,000.",
                date: "16 Feb 2026",
                time: "02:10 PM",
              },
              {
                title: "New Feature",
                content: "Investments section now supports treasury bonds.",
                date: "15 Feb 2026",
                time: "11:30 AM",
              },
              {
                title: "Security Alert",
                content: "Never share your PIN with anyone for safety reasons.",
                date: "14 Feb 2026",
                time: "08:15 AM",
              },
              {
                title: "Cashback Reward",
                content: "Earn 5% cashback when paying bills this week.",
                date: "13 Feb 2026",
                time: "04:20 PM",
              },
            ].map((notice, index) => (
              <View key={index} style={styles.noticeCard}>
                <View style={styles.noticeHeader}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <Text style={styles.noticeDate}>
                    {notice.date} • {notice.time}
                  </Text>
                </View>

                <Text style={styles.noticeContent}>{notice.content}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#145A32",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  cardTitle: {
    color: "#C8E6C9",
    fontSize: 16,
  },

  accountNumber: {
    color: "white",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
  },

  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cardBtn: {
    borderWidth: 1,
    borderColor: "#A5D6A7",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  cardBtnText: {
    color: "white",
  },

  section: {
    backgroundColor: "#fff",
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1B5E20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  actionText: {
    fontSize: 12,
    textAlign: "center",
  },

  noticeSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  noticeCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  noticeHeader: {
    marginBottom: 6,
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1B5E20",
  },

  noticeDate: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
  },

  noticeContent: {
    fontSize: 13,
    color: "#444",
  },

  notificationWrapper: {
    position: "relative",
    marginLeft: 15,
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
