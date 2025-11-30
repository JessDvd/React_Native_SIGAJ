import { View, Text, Image } from "react-native";
import styles from "../../styles/usuario_detalle";

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

