import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393939c7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#27646B",
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15,
  },
  container_for: {
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container_button_group: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  container_button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonEnviar: {
    backgroundColor: "#27646B",
  },
  buttonBorrar: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});