Halaman Pendaftaran Program AMMA
Ini source code untuk landing page pendaftaran Program AMMA (Ayo Menghafal dan Memahami Al-Qur'an). Dibuatnya pakai Vite, React, TypeScript, dan Tailwind CSS.

Tentang Proyek Ini
Jadi, halaman ini gunanya untuk pendaftaran program tahfidz dan tahsin AMMA. Isinya ada info soal programnya, statistik pendaftar, dan formulir yang datanya nanti otomatis masuk ke Google Sheet.

Fitur-fiturnya:
Tampilan Depan Informatif: Ada bagian hero yang nampilin info-info utama soal AMMA.

Formulir Lengkap: Formulir pendaftarannya detail, dari data diri sampai komitmen infaq.

Validasi Input: Ada pengecekan input biar data yang dikirim lebih akurat.

Umur Otomatis: Umur pendaftar otomatis kehitung dari tanggal lahir yang diisi.

Terkoneksi ke Google Sheets: Data dari formulir langsung dikirim ke Google Sheets pakai Google Apps Script.

Desain Responsif: Tampilannya udah bagus dibuka di HP maupun di desktop.

Teknologi yang Dipakai:
Framework: React ^18.3.1

Build Tool: Vite ^5.4.2

Bahasa: TypeScript ^5.5.3

Styling: Tailwind CSS ^3.4.1

Linting: ESLint ^9.9.1

Ikon: Lucide React ^0.344.0

Cara Menjalankan Lokal
Kalau mau coba jalanin di komputermu, begini caranya:

Clone repo-nya:

Bash

git clone https://github.com/fauzanahnaf999/registrationpage-amma.git
cd RegistrationPage-AMMA-a9f389dce48d2adff512a933841c03f57a06be89
Install dependencies:

Bash

npm install
Jalankan server dev:

Bash

npm run dev
Setelah itu, buka http://localhost:5173 di browser.

Daftar Perintah (Scripts)
npm run dev: Buat jalanin di mode development.

npm run build: Buat build proyeknya biar siap di-deploy.

npm run lint: Buat ngecek ada error atau kode yang kurang rapi apa nggak.

npm run preview: Buat lihat hasil build-nya secara lokal.

Catatan Penting (Backend)
Nah, formulirnya ini kan ngirim data ke Google Apps Script. Kalau kamu mau pakai ini buat proyek lain, URL script di src/components/RegistrationForm.tsx jangan lupa diganti sama URL Google Apps Script punya kamu, ya.
