import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const STORAGE_KEY = "church_notes";

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNotes = async (newNotes) => {
    setNotes(newNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
  };

  const handleSave = () => {
    if (!topic.trim() || !content.trim()) {
      Alert.alert("Missing Fields", "Please enter topic and content");
      return;
    }

    if (editingNote) {
      const updated = notes.map((n) =>
        n.id === editingNote.id ? { ...n, topic, content } : n,
      );
      saveNotes(updated);
    } else {
      const newNote = {
        id: Date.now().toString(),
        topic,
        content,
        createdAt: Date.now(),
      };
      saveNotes([newNote, ...notes]); // latest first
    }

    setTopic("");
    setContent("");
    setEditingNote(null);
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          const filtered = notes.filter((n) => n.id !== id);
          saveNotes(filtered);
        },
      },
    ]);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setTopic(note.topic);
    setContent(note.content);
    setModalVisible(true);
  };

  const openView = (note) => {
    setEditingNote(note);
    setViewModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.noteCard} onPress={() => openView(item)}>
      <Text style={styles.noteTopic}>{item.topic}</Text>
      <Text numberOfLines={2} style={styles.notePreview}>
        {item.content}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEdit(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      {/* include horizontal lines */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingNote ? "Edit Note" : "Add Note"}
          </Text>

          <TextInput
            placeholder="Topic"
            value={topic}
            onChangeText={setTopic}
            style={styles.topicInput}
          />

          <TextInput
            placeholder="Write your note..."
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.linedInput}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setEditingNote(null);
              setTopic("");
              setContent("");
            }}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* View Full Note Modal */}
      {/* Make scrollable when note content is long */}
      <Modal visible={viewModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{editingNote?.topic}</Text>
          <Text style={styles.fullContent}>{editingNote?.content}</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setViewModalVisible(false)}
          >
            <Text style={styles.saveText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  noteCard: {
    backgroundColor: "#f4f6f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  noteTopic: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B3D2E",
    marginBottom: 6,
  },

  notePreview: {
    color: "#504c4c",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  edit: {
    marginRight: 20,
    color: "#0B3D2E",
    fontWeight: "600",
  },

  delete: {
    color: "red",
    fontWeight: "600",
  },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0B3D2E",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  addText: {
    color: "#fff",
    fontSize: 30,
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0B3D2E",
    marginBottom: 20,
  },

  topicInput: {
    borderBottomWidth: 2,
    borderBottomColor: "#0B3D2E",
    marginBottom: 20,
    fontSize: 18,
  },

  linedInput: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 28,
    borderBottomWidth: 3,
    borderBottomColor: "#0B3D2E",
    paddingLeft: 10,
  },

  saveButton: {
    backgroundColor: "#0B3D2E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  cancel: {
    textAlign: "center",
    marginTop: 15,
    color: "#777",
  },

  fullContent: {
    fontSize: 16,
    lineHeight: 26,
    marginTop: 10,
  },
});
