export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            🎯 Cara Kerja
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mudah Digunakan,
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Langsung Efektif
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">1️⃣</span>
            </div>
            <h3 className="text-2xl font-bold">Daftar & Setup</h3>
            <p className="text-gray-600">Buat akun dan atur preferensi minatmu dalam hitungan menit</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">2️⃣</span>
            </div>
            <h3 className="text-2xl font-bold">Eksplorasi Fitur</h3>
            <p className="text-gray-600">Gunakan chatbot, cari event, dan atur jadwalmu dengan AI</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">3️⃣</span>
            </div>
            <h3 className="text-2xl font-bold">Nikmati Hasilnya</h3>
            <p className="text-gray-600">Kehidupan kampus jadi lebih teratur dan menyenangkan!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
