# Laporan Praktikum  

## 📝 LANGKAH 1 — Import & Struktur Dasar ##


1. buka file App.js yanag ada di folder projek ptmn-2
2. immport Library dan Commponent yang diperlihatkan 
3. Konfirmasi Bukti 

 <img src = "image.png" width = "50%" >




## L📝 LANGKAH 2 — Menyiapkan Data (Objek & Array) ##


...
1. Buat Objek Array bernama PROFILE untuk wadah data profile
2. Masukan Data yang diperlukan
3. Konfirmasi Bukti
...


<img src = "image-1.png" width = "60%" >

// ============================================ // DATA SKILLS (array of objects) // → Akan ditampilkan dengan FlatList // ============================================


<img src = "image-2.png" width = "60%" >" width = "60%" >


// ============================================ // DATA RIWAYAT (sections) // → Akan ditampilkan dengan SectionList // ============================================


<img src = "image-3.png" width = "60%" >" width = "60%" >


## 📝 LANGKAH 3 — Sub-Components (SkillCard & TimelineCard) ##
Konsep: Komponen kecil yang bertugas merender satu item list. Ini adalah praktik component reuse.

Tambahkan kode berikut di antara data dan fungsi App():

<img src = "image-4.png" width = "60%" >" width = "60%" >

## 📝 LANGKAH 4 — State Management dengan useState ##
Konsep: useState menyimpan data yang bisa berubah. Setiap perubahan state akan men-trigger re-render komponen.

Tambahkan state di dalam fungsi App():

<img src = "image-5.png" width = "60%" >" width = "60%" > 


## 📝 LANGKAH 5 — SafeAreaView, StatusBar & Header ##
Konsep:

- SafeAreaView → memastikan konten tidak tertutup notch (takik kamera) atau home indicator
- StatusBar → mengatur tampilan bar di bagian atas perangkat
- View + Switch → membangun header bar

Ganti bagian return (...) di App():


<img src = "image-6.png" width = "60%" >

## 📝 LANGKAH 6 — ScrollView & Profil Section (View, Text, img/image) ##
Konsep:

ScrollView → membungkus konten panjang agar bisa di-scroll
img/image → menampilkan gambar dari URL (source={{ uri: '...' }})
Text → bisa di-styling dengan style prop seperti CSS
Ganti <View><Text ...>Step 5</Text></View> dengan:

{/* 4. ScrollView → semua konten CV dibungkus di sini */}

<img src = "image-8.png" width = "60%" >
