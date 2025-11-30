import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#757575c7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  contenedor: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#27646B",
    borderWidth: 3,
    paddingVertical: 30,
    paddingHorizontal: 34,
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#27646B",
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxWidth: "80%",
  },

  logo: {
    width: 250,
    height: 80,
    resizeMode: "contain",
    marginTop: 25,
    marginBottom: 10,
  },

  nuevo_usuario: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  input: {
    height: 40,
    fontSize: 16,
    color: "#000",
  },

  contenedor_inputs: {
    backgroundColor: "#91ACB0",
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 10,
  },

  texto_olvido: {
    color: "#000",
    fontWeight: "600",
  },

  contenedor_contrasena: {
    marginTop: 10,
    alignItems: "flex-end",
    width: "100%",
  },

  boton_registrarse: {
    color: "#27646B",
    fontWeight: "bold",
  },

  boton_ingresar: {
    marginTop: 25,
    backgroundColor: "#27646B",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  texto_boton: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  nuevo_usuario: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  boton_registrarse: {
    color: "#27646B",
    fontWeight: "bold",
  },
});