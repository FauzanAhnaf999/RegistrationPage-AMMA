import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  namaLengkap: string;
  email: string;
  noWhatsApp: string;
  tanggalLahir: string;
  usia: number;
  jenisKelamin: string;
  pekerjaan: string;
  pendapatanBulanan: string;
  asalNegara: string;
  kotaKabupaten: string;
  alamatLengkap: string;
  mengetahuiDari: string[];
  kemampuanBacaQuran: string;
  pilihanJadwal: string;
  komitmenInfaq: string;
  pilihanNominal: string;
  nominalInfaq: string;
  metodePembayaran: string;
  jumlahTransfer: string;
  buktiInfaq: File | null;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: '',
    email: '',
    noWhatsApp: '',
    tanggalLahir: '',
    usia: 0,
    jenisKelamin: '',
    pekerjaan: '',
    pendapatanBulanan: '',
    asalNegara: 'Indonesia',
    kotaKabupaten: '',
    alamatLengkap: '',
    mengetahuiDari: [],
    kemampuanBacaQuran: '',
    pilihanJadwal: '',
    komitmenInfaq: '',
    pilihanNominal: '',
    nominalInfaq: '',
    metodePembayaran: '',
    jumlahTransfer: '',
    buktiInfaq: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-calculate age when birth date changes
  useEffect(() => {
    if (formData.tanggalLahir) {
      const birthDate = new Date(formData.tanggalLahir);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setFormData(prev => ({ ...prev, usia: age - 1 }));
      } else {
        setFormData(prev => ({ ...prev, usia: age }));
      }
    }
  }, [formData.tanggalLahir]);

  // Auto-format transfer amount
  useEffect(() => {
    if (formData.pilihanNominal && formData.pilihanNominal !== 'manual') {
      const nominal = formData.pilihanNominal.replace(/[^\d]/g, '');
      setFormData(prev => ({
        ...prev,
        nominalInfaq: nominal,
        jumlahTransfer: `Rp ${parseInt(nominal).toLocaleString('id-ID')}`
      }));
    }
  }, [formData.pilihanNominal]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.noWhatsApp.trim()) {
      newErrors.noWhatsApp = 'Nomor WhatsApp wajib diisi';
    } else if (formData.noWhatsApp.length < 10) {
      newErrors.noWhatsApp = 'Nomor WhatsApp minimal 10 digit';
    }

    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir wajib diisi';
    }

    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = 'Jenis kelamin wajib dipilih';
    }

    if (!formData.kemampuanBacaQuran) {
      newErrors.kemampuanBacaQuran = 'Kemampuan baca Qur\'an wajib dipilih';
    }

    if (!formData.komitmenInfaq) {
      newErrors.komitmenInfaq = 'Komitmen infaq wajib dipilih';
    }

    if (formData.komitmenInfaq === 'ya') {
      if (!formData.pilihanNominal) {
        newErrors.pilihanNominal = 'Pilihan nominal wajib dipilih';
      }
      if (!formData.metodePembayaran) {
        newErrors.metodePembayaran = 'Metode pembayaran wajib dipilih';
      }
      if (!formData.jumlahTransfer) {
        newErrors.jumlahTransfer = 'Jumlah transfer wajib diisi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const currentArray = formData.mengetahuiDari;
      
      if (checkbox.checked) {
        setFormData(prev => ({
          ...prev,
          mengetahuiDari: [...currentArray, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          mengetahuiDari: currentArray.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, buktiInfaq: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus('idle'); // Reset status

  // GANTI DENGAN URL WEB APP DARI GOOGLE APPS SCRIPT ANDA
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzYjdz9ZUuiYh4aLCOnuozHq_LdgGwnLK2JTVumq2OAFdDye2X_bh7jUOYv9wvKao0/exec';

  const dataToSubmit = new FormData();

  // Ubah state menjadi FormData
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'buktiInfaq' && value) {
      // Lampirkan file jika ada
      dataToSubmit.append(key, value as File);
    } else if (key === 'mengetahuiDari') {
      // Gabungkan array menjadi string
      dataToSubmit.append(key, (value as string[]).join(', '));
    } else if (value !== null) {
      // Lampirkan data lainnya
      dataToSubmit.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: dataToSubmit,
    });
    
    const result = await response.json();

    if (result.result === 'success') {
      setSubmitStatus('success');
      // Redirect ke WhatsApp setelah sukses
      setTimeout(() => {
        // Gunakan URL yang dikirim dari backend
        window.open(result.redirectUrl, '_blank');
      }, 1500);
    } else {
      throw new Error(result.message || 'Unknown error from Google Script');
    }
    
  } catch (error) {
    console.error('Submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Pendaftaran Berhasil!</h3>
        <p className="text-gray-600 mb-6">
          Terima kasih telah mendaftar Program AMMA. Anda akan diarahkan ke WhatsApp admin untuk informasi selanjutnya.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            Jika tidak otomatis terbuka, silakan hubungi admin di WhatsApp: +62 812-3456-789
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Form Pendaftaran Program AMMA</h2>
        <p className="text-gray-600">
          Silakan lengkapi formulir di bawah ini untuk mendaftar program Ayo Menghafal dan Memahami Al-Qur'an
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Pribadi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.namaLengkap ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nama lengkap Anda"
              />
              {errors.namaLengkap && (
                <p className="mt-1 text-sm text-red-600">{errors.namaLengkap}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="contoh@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. WhatsApp *
              </label>
              <input
                type="number"
                name="noWhatsApp"
                value={formData.noWhatsApp}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.noWhatsApp ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="08123456789"
              />
              {errors.noWhatsApp && (
                <p className="mt-1 text-sm text-red-600">{errors.noWhatsApp}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir *
              </label>
              <input
                type="date"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.tanggalLahir && (
                <p className="mt-1 text-sm text-red-600">{errors.tanggalLahir}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usia</label>
              <input
                type="number"
                value={formData.usia || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="Otomatis terisi"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Ikhwan"
                    checked={formData.jenisKelamin === 'Ikhwan'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-gray-700">Ikhwan</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Akhwat"
                    checked={formData.jenisKelamin === 'Akhwat'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-gray-700">Akhwat</span>
                </label>
              </div>
              {errors.jenisKelamin && (
                <p className="mt-1 text-sm text-red-600">{errors.jenisKelamin}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pekerjaan</label>
              <input
                type="text"
                name="pekerjaan"
                value={formData.pekerjaan}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Masukkan pekerjaan Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pendapatan Bulanan</label>
              <select
                name="pendapatanBulanan"
                value={formData.pendapatanBulanan}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Belum berpenghasilan</option>
                <option value="<1juta">&lt; 1 juta</option>
                <option value="1-3juta">1 - 3 juta</option>
                <option value="3-5juta">3 - 5 juta</option>
                <option value="5-10juta">5 - 10 juta</option>
                <option value=">10juta">&gt; 10 juta</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Lokasi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asal Negara</label>
              <select
                name="asalNegara"
                value={formData.asalNegara}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Indonesia">Indonesia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapura">Singapura</option>
                <option value="Brunei">Brunei</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
              <input
                type="text"
                name="kotaKabupaten"
                value={formData.kotaKabupaten}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Masukkan kota/kabupaten"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
            <textarea
              name="alamatLengkap"
              value={formData.alamatLengkap}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Masukkan alamat lengkap Anda"
            />
          </div>
        </div>

        {/* Program Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Program</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mengetahui AMMA dari mana?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['WhatsApp', 'Facebook', 'Instagram', 'Iklan', 'Teman', 'Lain-lain'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.mengetahuiDari.includes(option)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kemampuan Baca Qur'an *
              </label>
              <div className="space-y-2">
                {['Terbata-bata', 'Lancar', 'Lancar sesuai tajwid'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="kemampuanBacaQuran"
                      value={option}
                      checked={formData.kemampuanBacaQuran === option}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.kemampuanBacaQuran && (
                <p className="mt-1 text-sm text-red-600">{errors.kemampuanBacaQuran}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilihan Jadwal Belajar</label>
              <select
                name="pilihanJadwal"
                value={formData.pilihanJadwal}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Pilih jadwal</option>
                <option value="pagi">Pagi (08:00 - 10:00)</option>
                <option value="siang">Siang (13:00 - 15:00)</option>
                <option value="sore">Sore (16:00 - 18:00)</option>
                <option value="malam">Malam (19:00 - 21:00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Komitmen Infaq</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komitmen Infaq *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="komitmenInfaq"
                    value="ya"
                    checked={formData.komitmenInfaq === 'ya'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-gray-700">Ya</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="komitmenInfaq"
                    value="belum"
                    checked={formData.komitmenInfaq === 'belum'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-gray-700">Belum</span>
                </label>
              </div>
              {errors.komitmenInfaq && (
                <p className="mt-1 text-sm text-red-600">{errors.komitmenInfaq}</p>
              )}
            </div>

            {formData.komitmenInfaq === 'ya' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilihan Nominal *
                  </label>
                  <div className="space-y-2">
                    {['Rp50.000', 'Rp100.000', 'Rp500.000', 'Rp1.000.000', 'Rp2.000.000'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="pilihanNominal"
                          value={option}
                          checked={formData.pilihanNominal === option}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-gray-700">{option}</span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pilihanNominal"
                        value="manual"
                        checked={formData.pilihanNominal === 'manual'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-gray-700">Input manual</span>
                    </label>
                  </div>
                  {errors.pilihanNominal && (
                    <p className="mt-1 text-sm text-red-600">{errors.pilihanNominal}</p>
                  )}
                </div>

                {formData.pilihanNominal === 'manual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nominal Infaq</label>
                    <input
                      type="number"
                      name="nominalInfaq"
                      value={formData.nominalInfaq}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Masukkan nominal"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metode Pembayaran *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Bank', 'QRIS', 'GoPay', 'OVO', 'ShopeePay', 'Dana'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="metodePembayaran"
                          value={method}
                          checked={formData.metodePembayaran === method}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                  {errors.metodePembayaran && (
                    <p className="mt-1 text-sm text-red-600">{errors.metodePembayaran}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Transfer *
                  </label>
                  <input
                    type="text"
                    name="jumlahTransfer"
                    value={formData.jumlahTransfer}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.jumlahTransfer ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Rp 00"
                  />
                  {errors.jumlahTransfer && (
                    <p className="mt-1 text-sm text-red-600">{errors.jumlahTransfer}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Bukti Infaq</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Klik untuk upload atau drag & drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, PDF hingga 5MB</p>
                    <input
                      type="file"
                      name="buktiInfaq"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                      id="bukti-upload"
                    />
                    <label
                      htmlFor="bukti-upload"
                      className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors"
                    >
                      Pilih File
                    </label>
                    {formData.buktiInfaq && (
                      <p className="mt-2 text-sm text-emerald-600">
                        File terpilih: {formData.buktiInfaq.name}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </div>

        {submitStatus === 'error' && (
          <div className="flex items-center justify-center mt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">Terjadi kesalahan. Silakan coba lagi.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}