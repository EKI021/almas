# Foto Profil

## Cara Menambahkan Foto

1. **Simpan foto** dari chat sebagai `profile.jpg`
2. **Letakkan di folder ini**: `/Users/admin/porto almas/images/profile.jpg`
3. **Test**: Buka index.html dengan Live Server

## Spesifikasi
- Format: JPG atau PNG
- Nama: `profile.jpg` (wajib)
- Ukuran: Minimal 800x1200px
- Aspect: Portrait (vertikal)

## Fitur CSS
- object-fit: contain (foto utuh, tidak terpotong)
- Responsive (auto-adjust di semua device)
- Hover effect & drop shadow
- Frame decoration di hero section

## Lokasi di Website
1. **Hero Section**: Di atas nama, 280x380px
2. **About Section**: Full height frame, 450px

## Troubleshooting
- Foto tidak muncul? Cek nama file: `profile.jpg`
- Foto terpotong? CSS sudah pakai object-fit: contain
- Foto blur? Gunakan resolusi minimal 800x1200px
