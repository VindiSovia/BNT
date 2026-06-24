// helpers/loginUser.js
// ============================================================
// Helper Login USER untuk BNT Global Automation Testing
// ============================================================
// Cara pakai:
//   const { loginUser } = require('../helpers/loginUser');
//   await loginUser(page);
//
// Prasyarat:
//   - File .env harus berisi USER_EMAIL dan USER_PASSWORD
//   - dotenv sudah dimuat di playwright.config.js
// ============================================================

'use strict';

// ----------------------------------------------------------
// Konstanta URL dan Selector
// Dipisahkan agar mudah diperbarui jika UI berubah
// ----------------------------------------------------------
const URL = {
  BASE: process.env.BASE_URL || 'https://test.bnt-global.com',
  DASHBOARD: `${process.env.BASE_URL || 'https://test.bnt-global.com'}/dashboard`,
};

const SELECTOR = {
  BTN_NAV_AKUN: '[id="btn-nav-akun"]',
  BTN_DROPDOWN_PROFIL: '[id="dropdown-header-profil"]',
  BTN_DROPDOWN_EDIT_PROFIL: '[id="dropdown-item-edit-profil"]',
  INPUT_NAMA: '[data-testid="profil-input-nama_lengkap"]',
  INPUT_JENIS_KELAMIN_PRIA: '[class="wrap-male"]',
  INPUT_NO_HP: '[data-testid="profil-input-1"]',
  INPUT_JENIS_IDENTITAS: '[class="wrap-ktp"]',
  INPUT_NO_IDENTITAS: '[data-testid="profil-input-kitas_nomor"]',
  BTN_SUBMIT: '[data-testid="profil-button-btn-profil-1"]',
};

// ----------------------------------------------------------
// Validasi Environment Variables saat modul dimuat
// Gagal cepat (fail-fast) jika config belum diisi
// ----------------------------------------------------------
function validateEnvVars() {
  const missing = [];
  if (!process.env.USER_EMAIL) missing.push('USER_EMAIL');
  if (!process.env.USER_PASSWORD) missing.push('USER_PASSWORD');

  if (missing.length > 0) {
    throw new Error(
      `[loginUser] Environment variable tidak ditemukan: ${missing.join(', ')}.\n` +
      `Pastikan file .env sudah dibuat dan diisi dengan benar.\n` +
      `Contoh:\n  USER_EMAIL=user@example.com\n  USER_PASSWORD=yourPassword`
    );
  }
}

// ----------------------------------------------------------
// Fungsi Utama: loginUser
// ----------------------------------------------------------
/**
 * Melakukan proses login sebagai User pada aplikasi BNT Global.
 *
 * Alur:
 * 1. Navigasi ke BASE URL
 * 2. Klik tombol "Masuk" di halaman utama
 * 3. Isi email dari USER_EMAIL (env)
 * 4. Isi password dari USER_PASSWORD (env)
 * 5. Klik tombol submit "Masuk"
 * 6. Verifikasi URL berpindah ke /dashboard
 *
 * @param {import('@playwright/test').Page} page - Instance halaman Playwright
 * @returns {Promise<void>}
 * @throws {Error} Jika env var tidak ada, atau login gagal / URL tidak sesuai
 *
 * @example
 * // Di dalam test:
 * const { editProfile } = require('../helpers/editProfile');
 * test('contoh test setelah login', async ({ page }) => {
 *   await editProfile(page);
 *   // Lanjutkan test Anda di sini...
 * });
 */
async function editProfile(page) {
  // Validasi env vars sebelum mulai
  // validateEnvVars();

  // Tunggu hingga halaman selesai dimuat (network idle)
  await page.waitForLoadState('networkidle');

  const btnNavAkun = page.locator(SELECTOR.BTN_NAV_AKUN).first();
  // Pastikan tombol terlihat sebelum diklik
  await btnNavAkun.waitFor({ state: 'visible' });
  await btnNavAkun.click();
  console.log('[editProfile] Mengklik tombol footbar akun"...');

  const btnDropdownProfile = page.locator(SELECTOR.BTN_DROPDOWN_PROFIL).first();
  // Pastikan tombol terlihat sebelum diklik
  await btnDropdownProfile.waitFor({ state: 'visible' });
  await btnDropdownProfile.click();
  console.log('[editProfile] Mengklik tombol buka dropdown profile...');

  const btnDropdownEditProfil = page.locator(SELECTOR.BTN_DROPDOWN_EDIT_PROFIL).first();
  // Pastikan tombol terlihat sebelum diklik
  await btnDropdownEditProfil.waitFor({ state: 'visible' });
  await btnDropdownEditProfil.click();
  console.log('[editProfile] Mengklik tombol edit profile "Edit Profile"...');

  const inputNama = page.locator(SELECTOR.INPUT_NAMA).first();
  await inputNama.waitFor({ state: 'visible' });
  await inputNama.fill("Galih Satrio Wibisono");
  console.log('[editProfile] Mengisi nama lengkap "Galih Satrio Wibisono"...');

  const btnSelectJenisKelaminPria = page.locator(SELECTOR.INPUT_JENIS_KELAMIN_PRIA).first();
  // Pastikan tombol terlihat sebelum diklik
  await btnSelectJenisKelaminPria.waitFor({ state: 'visible' });
  await btnSelectJenisKelaminPria.click();
  console.log('[editProfile] Mengklik tombol jenis kelamin pria "Pria"...');

  const inputNoHp = page.locator(SELECTOR.INPUT_NO_HP).first();
  await inputNoHp.waitFor({ state: 'visible' });
  await inputNoHp.fill("8123456789");
  console.log('[editProfile] Mengisi nomor hp "08123456789"...');

  const selectJenisIdentitas = page.locator(SELECTOR.INPUT_JENIS_IDENTITAS).first();
  // Pastikan tombol terlihat sebelum diklik
  await selectJenisIdentitas.waitFor({ state: 'visible' });
  await selectJenisIdentitas.click();
  console.log('[editProfile] Mengklik tombol jenis identitas "KTP"...');

  const inputNoIdentitas = page.locator(SELECTOR.INPUT_NO_IDENTITAS).first();
  await inputNoIdentitas.waitFor({ state: 'visible' });
  await inputNoIdentitas.fill("4521312354575321");
  console.log('[editProfile] Mengisi nomor identitas "4521312354575321"...');

  const btnSubmit = page.locator(SELECTOR.BTN_SUBMIT).first();
  // Pastikan tombol terlihat sebelum diklik
  await btnSubmit.waitFor({ state: 'visible' });
  await btnSubmit.click();
  console.log('[editProfile] Klik submit deposit dan membuka modal metode pembayaran"...');

}

// ----------------------------------------------------------
// Ekspor fungsi agar dapat digunakan di file test lain
// ----------------------------------------------------------
module.exports = { editProfile };