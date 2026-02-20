import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";

const dummyBooks = [
  {
    id: "1",
    title: "Walking in Faith",
    author: "John Doe",
    cover: "https://picsum.photos/200/300",
    pdf: "https://example.com/book1.pdf",
  },
  {
    id: "2",
    title: "Power of Prayer",
    author: "Mary Smith",
    cover: "https://picsum.photos/201/300",
    pdf: "https://example.com/book2.pdf",
  },
  {
    id: "3",
    title: "Grace & Truth",
    author: "James Paul",
    cover: "https://picsum.photos/202/300",
    pdf: "https://example.com/book3.pdf",
  },
  {
    id: "4",
    title: "Christian Living",
    author: "Sarah King",
    cover: "https://picsum.photos/203/300",
    pdf: "https://example.com/book4.pdf",
  },
];

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const filteredBooks = dummyBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  // 📖 READER VIEW
  if (selectedBook) {
    return (
      <SafeAreaView style={styles.readerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedBook(null)}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.readerTitle}>{selectedBook.title}</Text>
        <Text style={styles.readerAuthor}>{selectedBook.author}</Text>

        <View style={styles.pdfPlaceholder}>
          <Text style={{ color: "#2e7d32" }}>PDF Reader will appear here</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 📚 LIBRARY VIEW
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Library</Text>

      <TextInput
        placeholder="Search by title or author..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#666"
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedBook(item)}
          >
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 15,
    color: "#1b5e20",
  },
  search: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "48%",
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cover: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1b5e20",
  },
  author: {
    fontSize: 12,
    color: "#4caf50",
    marginTop: 2,
  },

  // Reader styles
  readerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  backButton: {
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "600",
  },
  readerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b5e20",
  },
  readerAuthor: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 20,
  },
  pdfPlaceholder: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
