import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Membuat aplikasi CV sederhana dengan React Native expo</Text>
           <Text>Nama: Avis Budiman Tauladani</Text>
            <Text>NIM: 2488010002</Text>
            <Text>Asal sekolah : Man 1 cirebon</Text>
            <Text>Cita-cita : menjadi seorang programmer handal</Text>
            <Text>Rencana Menggapai cita-cita : belajar dengan giat dan tekun, mengikuti kursus pemrograman, dan terus berlatih membuat proyek-proyek kecil untuk meningkatkan kemampuan coding</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
