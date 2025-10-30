export default function StatsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-900 to-teal-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center text-white">
          <div className="space-y-2">
            <div className="text-5xl font-bold">1000+</div>
            <div className="text-emerald-200">Mahasiswa Aktif</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold">50+</div>
            <div className="text-emerald-200">Event per Bulan</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold">95%</div>
            <div className="text-emerald-200">Kepuasan Pengguna</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold">24/7</div>
            <div className="text-emerald-200">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
