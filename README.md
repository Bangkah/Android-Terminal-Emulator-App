# Android Terminal Emulator

Aplikasi Terminal Linux untuk Android yang dapat dijalankan tanpa akses root.

## Fitur Utama

- **Terminal Emulator**: Interface terminal lengkap dengan command execution simulation
- **Non-Root**: Berjalan tanpa memerlukan akses root pada perangkat Android
- **Command History**: Menyimpan dan navigasi history command yang telah dijalankan
- **Copy/Paste**: Support copy/paste dengan long press pada output
- **Font Adjustment**: Ukuran font dapat disesuaikan di pengaturan
- **Quick Commands**: Tombol cepat untuk perintah umum Linux
- **Dark Theme**: Tema gelap otentik seperti terminal Linux
- **Haptic Feedback**: Feedback getaran pada interaksi (Android)

## Supported Commands

```bash
help         # Menampilkan daftar perintah yang tersedia
clear        # Membersihkan layar terminal
ls           # Menampilkan isi direktori
pwd          # Menampilkan direktori kerja saat ini
whoami       # Menampilkan user saat ini
date         # Menampilkan tanggal dan waktu
echo [text]  # Menampilkan teks
history      # Menampilkan history command
ps           # Menampilkan proses yang berjalan
df           # Menampilkan penggunaan disk
free         # Menampilkan penggunaan memory
uname        # Informasi sistem
```

## Instalasi & Build

### Persyaratan

- Node.js 16+
- Expo CLI
- Android Studio (untuk build APK)
- React Native development environment

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for web
npm run build:web
```

### Build APK

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build APK untuk Android
eas build --platform android --profile production
```

## Struktur Project

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx      # Main terminal screen
│   │   ├── settings.tsx   # Settings screen
│   │   ├── about.tsx      # About screen
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── hooks/
│   └── useFrameworkReady.ts
├── assets/
└── app.json
```

## Teknologi yang Digunakan

- **React Native**: Framework aplikasi mobile
- **Expo**: Development platform dan build tools
- **Expo Router**: File-based routing
- **AsyncStorage**: Local data persistence
- **Lucide React Native**: Icon library
- **TypeScript**: Type safety

## Target Deployment

- **Target SDK**: Android 33+ (API Level 33)
- **Minimum SDK**: Android 21+ (API Level 21)
- **Architecture**: arm64-v8a, armeabi-v7a
- **Bundle**: APK/AAB

## Catatan Penting

1. **Simulasi Terminal**: Ini adalah simulasi terminal, bukan environment Linux yang sesungguhnya
2. **Non-Root**: Aplikasi tidak memerlukan dan tidak dapat mengakses root
3. **Command Simulation**: Command execution disimulasikan untuk tujuan demonstrasi
4. **File System**: Tidak dapat mengakses sistem file Android yang sebenarnya
5. **Network Tools**: Tool jaringan terbatas pada simulasi

## Penggunaan

1. Buka aplikasi Android Terminal
2. Ketik command di input field bagian bawah
3. Tekan Enter atau tap tombol play untuk eksekusi
4. Gunakan quick command buttons untuk perintah umum
5. Long press pada output untuk copy teks
6. Navigasi history dengan tombol panah atas
7. Customize pengaturan di tab Settings

## Build Instructions

Untuk membangun APK:

1. Setup Android development environment
2. Konfigurasi EAS Build dengan `eas build:configure`
3. Build APK dengan `eas build --platform android`
4. Download APK dari EAS Build dashboard

## Kontribusi

Aplikasi ini dibuat sebagai demonstrasi terminal emulator untuk Android menggunakan React Native dan Expo.

## License

MIT License - Lihat file LICENSE untuk detail lengkap.