import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  contenido: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  contenido_contacto:{
    width: "90%",
    maxWidth: 400,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 2,
    borderColor: "#27646B",
    borderRadius: 15,
    padding: 20,
  },
  header:{
    backgroundColor: "#27646B",
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },
  headerTitle:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  descripcion:{
    textAlign: "center",
    fontSize: 14,
    color: "#27646B",
  },
});
