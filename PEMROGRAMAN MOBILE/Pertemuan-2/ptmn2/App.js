import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView, // <-- Tugas Pengembangan (1)
  Animated,     
  Linking,    
  Image,    // <-- Tugas Pengembangan (3)
} from "react-native";

// ============================================
// TUGAS WAJIB (1): Data Pribadi
// ============================================
const PROFILE = {
  name: "Avis Budiman Tauladani",
  title: "S1 Informatika | Web & Mobile Developer",
  email: "avisbudiman@gmail.com",
  phone: "083152127708",
  location: "Cirebon, Indonesia",
  bio: "Mahasiswa Informatika UIN Siber Syekh Nurjati yang tertarik pada Web Development, Kriptografi, dan Forensik Digital. Memiliki pengalaman manajemen profil bisnis dan aktif dalam project kolaboratif.",
  avatar: "D:\\APK Mobile\\materi_kulaih_SMTR5B\\PEMROGRAMAN MOBILE\\Pertemuan-2\\ptmn2\\assets\\pp .jpg",
};

// ============================================
// TUGAS WAJIB (2): Tambah 3 Skill Baru (PHP, MySQL, Bootstrap)
// ============================================
const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#9CE5FB' }, // Disesuaikan ke tone pastel
  { id: '2', name: 'JavaScript',   level: 88, color: '#FCEE82' },
  { id: '3', name: 'PHP',          level: 85, color: '#B7BBE5' },
  { id: '4', name: 'MySQL',        level: 80, color: '#9AC2E0' },
  { id: '5', name: 'Bootstrap',    level: 85, color: '#BFA5ED' },
  { id: '6', name: 'Firebase',     level: 82, color: '#FFE494' },
  { id: '7', name: 'Flutter',      level: 75, color: '#88C0ED' },
  { id: '8', name: 'Node.js',      level: 70, color: '#9ED39E' },
];

// ============================================
// TUGAS WAJIB (3): Tambah Pengalaman & Pendidikan Baru
// ============================================
const SECTIONS = [
  {
    title: '💼 Pengalaman & Proyek',
    data: [
      {
        id: 'e1',
        role: 'Manajer Profil Bisnis',
        company: 'UD Mulya Mandiri',
        period: 'April 2026 - Juli 2026',
        desc: 'Mengelola dan memverifikasi profil bisnis online untuk produsen manufaktur lokal agar lebih mudah dijangkau pelanggan.',
      },
      {
        id: 'e2',
        role: 'Kriptografi Kolaborator',
        company: 'Proyek SafePass (GitHub)',
        period: 'Mei 2026',
        desc: 'Berpartisipasi dalam penyusunan laporan dan repository untuk proyek keamanan aplikasi SafePass.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan & Sertifikasi',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'UIN Siber Syekh Nurjati Cirebon',
        period: '2024 - 2029',
        desc: 'Fokus pada Kriptografi, Forensik Digital, Pengembangan Mobile, serta algoritma Euclidean.',
      },
      {
        id: 'd2',
        role: 'Sertifikasi Web & AI',
        company: 'Dicoding Indonesia',
        period: '2024',
        desc: 'Menyelesaikan kelas dasar-dasar Front-End Web Development dan pengantar Artificial Intelligence.',
      },
    ],
  },
];

const SOCIAL = [
  {
    id: 's1',
    label: 'Instagram',
    image: require('./assets/ig.jpg'),
    url: 'https://instagram.com/mpiss_budi',
  },
  {
    id: 's2',
    label: 'GitHub',
    image: require('./assets/gitgub.jpg'),
    url: 'https://github.com/Viss-budi',
  },
  {
    id: 's3',
    label: 'TikTok',
    image: require('./assets/tiktok.jpg'),
    url: 'https://www.tiktok.com/@viss_budi',
  },
];
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color }
        ]}
      />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)} activeOpacity={0.7}>
    <View style={styles.timelineLeft}>
      <View style={styles.timelineDot} />
      <View style={styles.timelineLine} />
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
    </View>
    <View style={styles.timelineAction}>
      <Text style={styles.timelineHint}>❯</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  // State untuk Tab Navigasi
  const [activeTab, setActiveTab] = useState('Info');
  
  // Animasi Skala Avatar
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // TUGAS PENGEMBANGAN (3): Animated API saat komponen dimuat
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

const handleSend = () => {
  // Cek form kosong
  if (!senderName.trim() || !message.trim()) {
    Alert.alert(
      'Peringatan',
      'Nama Lengkap dan pesan harus diisi terlebih dahulu.'
    );
    return;
  }

  // Mulai loading
  setSending(true);

  // Loading selama 2 detik
  setTimeout(() => {
    setSending(false);

    Alert.alert(
      'Berhasil 🎉',
      'Pesan kamu berhasil dikirim!'
    );

    // Kosongkan form setelah berhasil
    setSenderName('');
    setMessage('');
  }, 2000);
};

// Fungsi untuk membuka sosial media
const openSocial = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Gagal', 'Tidak dapat membuka link.');
  }
};
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F4EFFF" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, openToWork && { color: COLORS.accent }]}>
            {openToWork ? 'Hire Me' : 'Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#E2D9F3', true: '#D4C4FB' }}
            thumbColor={openToWork ? COLORS.accent : '#A592C4'}
          />
        </View>
      </View>

      {/* TUGAS PENGEMBANGAN (2): Tab Navigasi Sederhana */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {['Info', 'Skills', 'Kontak'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TUGAS PENGEMBANGAN (1): KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
 <ScrollView
  style={styles.scroll}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}
>

  {/* TAB 1: INFO (Profil & Riwayat) */}
  {activeTab === 'Info' && (
    <>
      <View style={styles.profileSection}>

        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <Animated.Image
            source={require('./assets/pp .jpg')}
            style={[
              styles.avatar,
              { transform: [{ scale: scaleAnim }] }
            ]}
          />

          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Open to Work
              </Text>
            </View>
          )}
        </View>

        {/* KONTAK */}
        <View style={styles.contactContainer}>

          {/* EMAIL */}
          <TouchableOpacity
            style={styles.contactPill}
            onPress={() => {
              Linking.openURL(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`
              );
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.contactText}>
              ✉️ {PROFILE.email}
            </Text>
          </TouchableOpacity>

          {/* LOKASI */}
          <TouchableOpacity
            style={styles.contactPill}
            onPress={() => {
              const address = encodeURIComponent(
                PROFILE.location
              );

              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${address}`
              );
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.contactText}>
              📍 {PROFILE.location}
            </Text>
          </TouchableOpacity>

        </View>

        {/* SOSIAL MEDIA */}
        <View style={styles.socialRow}>
          {SOCIAL.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.socialBtn}
              onPress={() => openSocial(s.url)}
              activeOpacity={0.8}
            >
              <Image
                source={s.image}
                style={styles.socialImage}
              />
            </TouchableOpacity>
          ))}
        </View>

      </View>

      {/* EXPERIENCE & EDUCATION */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>
          📑 Experience & Education
        </Text>

        <SectionList
          sections={SECTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TimelineCard
              item={item}
              onPress={(item) => {
                setSelectedItem(item);
                setModalVisible(true);
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>
              {title}
            </Text>
          )}
          scrollEnabled={false}
          SectionSeparatorComponent={() => (
            <View style={{ height: 16 }} />
          )}
        />
      </View>
    </>
  )}

  {/* TAB 2: SKILLS */}
  {activeTab === 'Skills' && (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>
        🛠️ Tech Stack
      </Text>

      <FlatList
        data={SKILLS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard item={item} />
        )}
        scrollEnabled={false}
      />
    </View>
  )}

  {/* TAB 3: KONTAK */}
  {activeTab === 'Kontak' && (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>
        💬 Get In Touch
      </Text>

      {/* NAMA */}
      <TextInput
        style={styles.textInput}
        placeholder="Nama Lengkap"
        placeholderTextColor="#A592C4"
        value={senderName}
        onChangeText={setSenderName}
        multiline
        textAlignVertical="top"
        editable={!sending}
      />

      {/* PESAN */}
      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="Diskusikan web development, tugas kriptografi, atau proyek AI di sini..."
        placeholderTextColor="#A592C4"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        editable={!sending}
      />

      {/* TOMBOL KIRIM / LOADING */}
      {sending ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator
            size="large"
            color={COLORS.accent}
          />

          <Text style={styles.loadingText}>
            Mengirim pesan...
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Text style={styles.sendBtnText}>
            Kirim Pesan Sekarang
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )}

</ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalSubtitle}>{selectedItem.company}</Text>
                <View style={styles.modalBadge}>
                  <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                </View>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)} activeOpacity={0.8}>
              <Text style={styles.modalCloseText}>Tutup Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================
// PALET WARNA & STYLES (PASTEL PURPLE THEME)
// ============================================
const COLORS = {
  bg: '#F4EFFF',          // Soft Lavender Background
  cardBg: '#FFFFFF',      // Clean White Cards
  textPrimary: '#4A3B69', // Deep Muted Purple
  textSecondary: '#7A6B9C', // Lighter Muted Purple
  accent: '#B28DFF',      // Pastel Purple
  accentLight: '#E8DEFF', // Very Light Pastel Purple
  inputBg: '#F9F7FF',     // Off-white Purple for inputs
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  headerBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 18, backgroundColor: COLORS.bg,
  },
  headerTitle: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '800' },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { color: COLORS.textSecondary, marginRight: 8, fontSize: 13, fontWeight: '700' },
  
  // TABS NAVIGATION STYLES
  tabWrapper: {
    paddingHorizontal: 20, paddingBottom: 10, backgroundColor: COLORS.bg,
  },
  tabContainer: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', 
    padding: 6, borderRadius: 30, elevation: 3, shadowColor: COLORS.accent, 
    shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  tabButton: {
    flex: 1, paddingVertical: 10, borderRadius: 24, alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent, shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  tabText: {
    color: COLORS.textSecondary, fontSize: 14, fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  scrollContent: { padding: 20, paddingBottom: 40 },
  
  profileSection: {
    alignItems: 'center', backgroundColor: COLORS.cardBg, borderRadius: 30, padding: 30, marginBottom: 24,
    elevation: 4, shadowColor: COLORS.accent, shadowOpacity: 0.15, shadowRadius: 15, shadowOffset: { width: 0, height: 8 },
  },
  avatarContainer: { position: 'relative', marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: COLORS.accentLight },
  badge: { 
    position: 'absolute', bottom: -8, alignSelf: 'center', backgroundColor: '#A7F3D0', 
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 3, borderColor: COLORS.cardBg 
  },
  badgeText: { color: '#065F46', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  profileName: { color: COLORS.textPrimary, fontSize: 24, fontWeight: '900', marginBottom: 6, textAlign: 'center' },
  profileTitle: { color: COLORS.accent, fontSize: 15, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  profileBio: { color: COLORS.textSecondary, textAlign: 'center', fontSize: 14, lineHeight: 24, marginBottom: 24 },
  contactContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 24 },
  contactPill: { backgroundColor: COLORS.inputBg, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.accentLight },
  contactText: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '600' },
  socialRow: { flexDirection: 'row', gap: 16 },
  socialBtn: { backgroundColor: COLORS.accentLight, width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
socialImage: {
  width: 28,
  height: 28,
  resizeMode: 'contain',
},
  
  sectionBox: { 
    backgroundColor: COLORS.cardBg, borderRadius: 30, padding: 24, marginBottom: 24,
    elevation: 3, shadowColor: COLORS.accent, shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }
  },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '900', marginBottom: 24 },
  sectionHeader: { color: COLORS.accent, fontSize: 14, fontWeight: '800', textTransform: 'uppercase', marginTop: 10, marginBottom: 16, letterSpacing: 1 },
  
  skillCard: { marginBottom: 18 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700' },
  skillPercent: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '800' },
  progressBg: { height: 8, backgroundColor: COLORS.inputBg, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  
  timelineCard: { 
    flexDirection: 'row', backgroundColor: COLORS.inputBg, padding: 18, borderRadius: 20, 
    marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.accentLight 
  },
  timelineLeft: { alignItems: 'center', marginRight: 16 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.accent, borderWidth: 3, borderColor: '#FFFFFF' },
  timelineLine: { width: 2, height: 45, backgroundColor: COLORS.accentLight, marginTop: 4 },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '800', marginBottom: 4 },
  timelineCompany: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 8 },
  timelinePeriod: { color: COLORS.accent, fontSize: 12, fontWeight: '700' },
  timelineAction: { paddingLeft: 10 },
  timelineHint: { color: COLORS.accent, fontSize: 20, fontWeight: 'bold' },
  
  textInput: { 
    backgroundColor: COLORS.inputBg, color: COLORS.textPrimary, paddingHorizontal: 20, 
    paddingVertical: 16, borderRadius: 16, marginBottom: 16, fontSize: 15, fontWeight: '500',
    borderWidth: 1, borderColor: COLORS.accentLight 
  },
  textArea: { height: 140, paddingTop: 16 },
  sendBtn: { 
    backgroundColor: COLORS.accent, paddingVertical: 16, borderRadius: 16, alignItems: 'center', 
    marginTop: 8, shadowColor: COLORS.accent, shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 
  },
  sendBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(74, 59, 105, 0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { 
    backgroundColor: COLORS.cardBg, width: '100%', borderRadius: 30, padding: 30, 
    elevation: 10, shadowColor: COLORS.textPrimary, shadowOpacity: 0.2, shadowRadius: 20 
  },
  modalTitle: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '900', marginBottom: 8 },
  modalSubtitle: { color: COLORS.textSecondary, fontSize: 16, marginBottom: 20, fontWeight: '600' },
  modalBadge: { alignSelf: 'flex-start', backgroundColor: COLORS.accentLight, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, marginBottom: 20 },
  modalPeriod: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800' },
  modalDesc: { color: COLORS.textSecondary, fontSize: 15, lineHeight: 24, marginBottom: 30 },
  modalCloseBtn: { backgroundColor: COLORS.inputBg, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  modalCloseText: { color: COLORS.textPrimary, fontWeight: '800', fontSize: 15 },

  loadingRow: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 15,
},

loadingText: {
  marginTop: 10,
  color: COLORS.accent,
  fontSize: 14,
  fontWeight: '600',
},
});