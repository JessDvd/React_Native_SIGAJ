import { useState } from "react";
import { View, FlatList } from "react-native";
import Styles from "../../styles/consulta.style";
import Header_User from "../../components/Header_Users";
import Input from "../../components/input_busqueda";
import UsuarioDetalle from "./usuarioDetalle";

export default function AdministradorScreen() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.66:3000/api/buscarUsuario?query=${encodeURIComponent(
          text
        )}`
      );

      const textResponse = await response.text();
      let data;

      try {
        data = JSON.parse(textResponse);
      } catch {
        console.error("Servidor NO devolvió JSON válido:", textResponse);
        setResults([]);
        return;
      }

      if (response.ok) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error buscando:", error);
    }
  };

  return (
    <View style={Styles.container}>
      <Header_User aviso="Gestión de Usuarios" />

      <View style={Styles.container_busqueda}>
        <Input
          title="Buscar por ID, nombre o usuario"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "95%", marginTop: 15 }}
        renderItem={({ item }) => <UsuarioDetalle user={item} />}
      />
    </View>
  );
}
