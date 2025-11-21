import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // backgroundColor: "rgba(255, 255, 255, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.37)",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    borderColor: "#34ff01ff",
    borderWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27646B",
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#27646B",
    marginBottom: 10,
  },
  accessBox: {
    borderWidth: 1,
    borderColor: "#27646B",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  user: {
    color: "#333",
    marginBottom: 4,
  },
  fileOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pdfButton: {
    backgroundColor: "#27646B",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  docxButton: {
    backgroundColor: "#27646B",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ccc",
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeText: {
    textAlign: "center",
    color: "#000",
  },
});
