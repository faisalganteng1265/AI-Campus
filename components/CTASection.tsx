export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Memulai Petualangan
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kampus yang Lebih Cerdas?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Bergabunglah dengan ribuan mahasiswa yang sudah merasakan kemudahan navigasi kampus dengan AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all text-lg">
              Mulai Gratis Sekarang
            </button>
            <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all text-lg">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
