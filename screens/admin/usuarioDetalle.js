import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function UsuarioDetalle({ user }) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/img/logo.png")}
        style={styles.logoFondo}
      />

      <View style={styles.header}>
        <Text style={styles.username}>
          {user.username} ({user.rol})
        </Text>
        <Text style={styles.idText}>ID: {user.id}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{user.username}</Text>

              <Text style={styles.label}>Apellido Paterno:</Text>
              <Text style={styles.value}>{user.paterno}</Text>

              <Text style={styles.label}>Apellido Materno:</Text>
              <Text style={styles.value}>{user.materno}</Text>

              <Text style={styles.label}>Correo Electrónico:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.colRight}>
              <Text style={styles.label}>CURP:</Text>
              <Text style={styles.value}>{user.curp}</Text>

              <Text style={styles.label}>RFC:</Text>
              <Text style={styles.value}>{user.rfc}</Text>

              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{user.telefono}</Text>

              <Text style={styles.label}>Departamento:</Text>
              <Text style={styles.value}>{user.departamento}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
