# Setup Form Kontak - PANDUAN LENGKAP

## PENTING: Baca Ini Dulu!

Form menggunakan FormSubmit.co - layanan gratis yang langsung kirim email ke almashusniadibah@gmail.com

### Masalah yang Mungkin Terjadi:
1. Error 404 Formspree - Sudah di-fix, ganti ke FormSubmit.co
2. Browser Cache - Sudah di-fix dengan meta tag anti-cache
3. CORS Error - Buka dengan Live Server atau deploy
4. Email Tidak Masuk - Perlu aktivasi email pertama kali

---

## CARA TEST FORM

### OPSI 1: Live Server (RECOMMENDED)

1. Install Live Server di VS Code (Extensions > Search 'Live Server')
2. Klik kanan index.html > 'Open with Live Server'
3. Browser buka di http://127.0.0.1:5500/index.html
4. Isi form dan klik Send Message
5. Cek email almashusniadibah@gmail.com
6. Klik 'Activate Form' di email dari FormSubmit.co
7. Test form lagi - sekarang email langsung masuk!

### OPSI 2: Deploy ke Hosting
- GitHub Pages: Upload f- GitHub Pages: Upload f- GitHub Pages: Upload f- Gidrop folder ke netlify.com
- Vercel: jalankan 'vercel' di terminal

### OPSI 3: Mailto Fallback
Jika form error, akan muncul tombol 'Open Email App' yang langsung buka email app dengan data form terisi.

---

## TROUBLESHOOTING

### Error: formspree.io 404
Solusi: Hard refresh (Cmd+Shift+R) atau clear cache

### Error: CORS policy
Solusi: Gunakan Live Server, jangan buka dari file://

### Email tidak masuk
Solusi: Cek spam folder, klik link aktivasi di email pertama

---

## VERIFIKASI

Buka browser console (F12) dan ketik:
document.querySelector('form').action

Harus output: https://formsubmit.co/almashusniadibah@gmail.com

---

## KONTAK
- Email: almashusniadibah@gmail.com
- Phone: +62 858-8469-0231
- LinkedIn: linkedin.com/in/almashusni
