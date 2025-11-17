import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 25,
    justifyContent: "flex-start",
  },

  container_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    backgroundColor: "#07394A",
    width: "100%",
    maxWidth: 400,
  },

  header: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    maxWidth: "100%",
  },

  menu: {
    width: 30,
    height: 30,
    marginLeft: 15,
    tintColor: "#fff",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 60,
    marginLeft: 10,
    paddingVertical: 10,
    width: 250,
    elevation: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
  },

  container_busqueda: {
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 18,
    width: "100%",
  },

  lupa: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },

  container_textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 6,
  },

  container_inputs: {
    borderWidth: 2,
    borderColor: "#27646B",
    borderRadius: 10,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 7,
  },

  container_options: {
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 18,
    width: "100%",
  },

  container_option: {
    borderWidth: 2,
    borderColor: "#27646B",
    borderRadius: 10,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  picker: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  container_button_principal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: 20,
  },

  container_button: {
    marginTop: 25,
    backgroundColor: "#27646B",
    borderRadius: 10,
    width: "50%",
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  container_tabla: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    elevation: 3,
  },

  header_tabla: {
    flexDirection: "row",
    backgroundColor: "#27646B",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  tabla_header_text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },

  body_tabla: {
    maxHeight: 400,
  },

  text_tabla: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },

  acciones_tabla: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  fila_tabla: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },

  logo: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },

  container_text_mensajeria: {
    marginTop: 20,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#c6c6c6ff",
    paddingLeft: 30,
  },

  text_mensajeria: {
    flex: 1,
    fontSize: 14, //16
    color: "#000",
  },

  container_for: {
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 18,
    width: "100%",
  },

  container_descripcion: {
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#27646B",
    borderRadius: 10,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 7,
  },

  container_textDescripcion: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textAlignVertical: "top",
    paddingVertical: 10,
  },

  container_button_group: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
  },

  button_descripcion: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },

  buttonBorrar: {
    backgroundColor: "#8f0000ff",
  },

  buttonEnviar: {
    backgroundColor: "#27646B",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
