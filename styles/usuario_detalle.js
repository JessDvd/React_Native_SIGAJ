import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card: {
    borderWidth: 5,
    borderColor: "#0A4F5F",
    borderRadius: 15,
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
    marginLeft: 18,
  },
  logoFondo: {
    position: "absolute",
    width: "90%",
    height: "90%",
    top: "10%",
    left: "5%",
    opacity: 0.1,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    color: "#27646B",
    fontWeight: "bold",
  },
  idText: {
    fontSize: 16,
  },
  content: {
    flexDirection: "row",
  },
  infoContainer: { flex: 1, },
  row: {
    flexDirection: "row",
    textAlign: "center",
  },
  colLeft: { width: "48%" },
  colRight: { width: "48%" },
  label: { fontWeight: "bold", fontSize: 14, marginTop: 6 },
  value: { fontSize: 14, marginBottom: 4 },
});