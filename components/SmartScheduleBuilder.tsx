'use client';

import { useState } from 'react';

interface ScheduleItem {
  id?: string;
  type: 'kuliah' | 'kegiatan';
  name: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  priority?: 'tinggi' | 'sedang' | 'rendah';
  isFlexible?: boolean;
  hasSpecificTime?: boolean;
  specificDay?: string;
  specificTime?: string;
  mustBeBefore?: string;
  description?: string;
}

interface DaySchedule {
  time: string;
  activity: string;
  type: string;
  location?: string;
  description?: string;
  color?: string;
}

interface OptimizedSchedule {
  optimizedSchedule: {
    [key: string]: DaySchedule[];
  };
  analysis: {
    totalKuliah: number;
    totalKegiatan: number;
    avgStudyHoursPerDay: number;
    avgFreeHoursPerDay: number;
    workLoadBalance: string;
  };
  recommendations: string[];
  tips: string[];
  warnings?: string[];
}

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function SmartScheduleBuilder() {
  const [courses, setCourses] = useState<ScheduleItem[]>([]);
  const [activities, setActivities] = useState<ScheduleItem[]>([]);
  const [optimizedSchedule, setOptimizedSchedule] = useState<OptimizedSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'result'>('input');
  const [activityMode, setActivityMode] = useState<'flexible' | 'specific'>('flexible');

  // Form states for adding course
  const [newCourse, setNewCourse] = useState<Partial<ScheduleItem>>({
    type: 'kuliah',
    name: '',
    day: 'Senin',
    startTime: '07:00',
    endTime: '09:00',
    description: ''
  });

  // Form states for adding activity
  const [newActivity, setNewActivity] = useState<Partial<ScheduleItem>>({
    type: 'kegiatan',
    name: '',
    duration: 60,
    priority: 'sedang',
    isFlexible: true,
    hasSpecificTime: false,
    description: ''
  });

  const addCourse = () => {
    if (!newCourse.name || !newCourse.day || !newCourse.startTime || !newCourse.endTime) {
      alert('Lengkapi semua field!');
      return;
    }
    setCourses([...courses, { ...newCourse, id: Date.now().toString() } as ScheduleItem]);
    setNewCourse({
      type: 'kuliah',
      name: '',
      day: 'Senin',
      startTime: '07:00',
      endTime: '09:00',
      description: ''
    });
  };

  const addActivity = () => {
    if (!newActivity.name) {
      alert('Nama kegiatan harus diisi!');
      return;
    }

    if (activityMode === 'specific') {
      if (!newActivity.specificDay || !newActivity.specificTime) {
        alert('Pilih hari dan waktu untuk kegiatan!');
        return;
      }
      setActivities([...activities, {
        ...newActivity,
        id: Date.now().toString(),
        hasSpecificTime: true,
        isFlexible: false
      } as ScheduleItem]);
    } else {
      if (!newActivity.duration) {
        alert('Durasi kegiatan harus diisi!');
        return;
      }
      setActivities([...activities, {
        ...newActivity,
        id: Date.now().toString(),
        hasSpecificTime: false,
        isFlexible: true
      } as ScheduleItem]);
    }

    setNewActivity({
      type: 'kegiatan',
      name: '',
      duration: 60,
      priority: 'sedang',
      isFlexible: true,
      hasSpecificTime: false,
      description: ''
    });
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const generateSchedule = async () => {
    if (courses.length === 0 && activities.length === 0) {
      alert('Tambahkan minimal 1 jadwal kuliah atau kegiatan!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courses,
          activities,
          preferences: {
            wakeUpTime: '06:00',
            sleepTime: '23:00',
            breakDuration: 60,
            studySessionDuration: 120
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate schedule');
      }

      const data: OptimizedSchedule = await response.json();
      setOptimizedSchedule(data);
      setActiveTab('result');
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorClass = (color?: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-emerald-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      gray: 'bg-gray-600',
      yellow: 'bg-yellow-500',
      pink: 'bg-pink-500',
      teal: 'bg-teal-500'
    };
    return colors[color || 'gray'] || 'bg-gray-500';
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      kuliah: '📚',
      kegiatan: '🎯',
      routine: '🔄',
      belajar: '✍️',
      istirahat: '☕',
      makan: '🍽️',
      tidur: '😴',
      olahraga: '🏃',
      organisasi: '👥'
    };
    return icons[type.toLowerCase()] || '📌';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📅</div>
            <h1 className="text-4xl font-bold text-white mb-2">Smart Schedule Builder</h1>
            <p className="text-blue-100 text-lg">
              AI bantu atur jadwal kuliah dan kegiatanmu agar seimbang dan produktif!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'input'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📝 Input Jadwal
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'result'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              disabled={!optimizedSchedule}
            >
              ✨ Jadwal Optimal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Tab */}
        {activeTab === 'input' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              ✨ Input Jadwal & Kegiatan
            </h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Add Course Section */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>📚</span>
                  Tambah Jadwal Kuliah
                </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nama Mata Kuliah"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newCourse.day}
                  onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newCourse.startTime}
                    onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    value={newCourse.endTime}
                    onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Lokasi/Keterangan"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addCourse}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                + Tambah Kuliah
              </button>

              {/* Course List */}
              {courses.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-white font-semibold mb-2">Jadwal Kuliah ({courses.length}):</h3>
                  {courses.map(course => (
                    <div key={course.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium flex items-center gap-2">
                          <span>📚</span>
                          {course.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {course.day} • {course.startTime} - {course.endTime}
                          {course.description && ` • ${course.description}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeCourse(course.id!)}
                        className="text-red-400 hover:text-red-300 transition-colors text-xl"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              </div>

              {/* Right Column - Add Activity Section */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  Tambah Kegiatan
                </h3>

                {/* Activity Mode Toggle */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setActivityMode('flexible')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    activityMode === 'flexible'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">🔄</div>
                  <div className="text-sm">Waktu Fleksibel</div>
                  <div className="text-xs opacity-75">AI yang tentukan waktu terbaik</div>
                </button>
                <button
                  onClick={() => setActivityMode('specific')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    activityMode === 'specific'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">📍</div>
                  <div className="text-sm">Waktu Spesifik</div>
                  <div className="text-xs opacity-75">Harus di waktu tertentu</div>
                </button>
              </div>

              {/* Flexible Activity Form */}
              {activityMode === 'flexible' && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nama Kegiatan (misal: Belajar, Rapat)"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={30}>30 menit</option>
                    <option value={60}>1 jam</option>
                    <option value={90}>1.5 jam</option>
                    <option value={120}>2 jam</option>
                    <option value={180}>3 jam</option>
                  </select>
                  <select
                    value={newActivity.priority}
                    onChange={(e) => setNewActivity({ ...newActivity, priority: e.target.value as any })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="tinggi">⭐ Prioritas Tinggi</option>
                    <option value="sedang">⚡ Prioritas Sedang</option>
                    <option value="rendah">💤 Prioritas Rendah</option>
                  </select>
                  <select
                    value={newActivity.mustBeBefore || ''}
                    onChange={(e) => setNewActivity({ ...newActivity, mustBeBefore: e.target.value || undefined })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Kapan saja</option>
                    <option value="12:00">Harus sebelum jam 12:00</option>
                    <option value="15:00">Harus sebelum jam 15:00</option>
                    <option value="18:00">Harus sebelum jam 18:00</option>
                    <option value="20:00">Harus sebelum jam 20:00</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Keterangan (opsional)"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {/* Specific Time Activity Form */}
              {activityMode === 'specific' && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nama Kegiatan (misal: Rapat BEM)"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={newActivity.specificDay || 'Senin'}
                    onChange={(e) => setNewActivity({ ...newActivity, specificDay: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <select
                    value={newActivity.specificTime || '09:00'}
                    onChange={(e) => setNewActivity({ ...newActivity, specificTime: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value={30}>30 menit</option>
                    <option value={60}>1 jam</option>
                    <option value={90}>1.5 jam</option>
                    <option value={120}>2 jam</option>
                    <option value={180}>3 jam</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Keterangan (opsional)"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              <button
                onClick={addActivity}
                className={`${
                  activityMode === 'flexible' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'
                } text-white px-6 py-3 rounded-lg font-medium transition-all`}
              >
                + Tambah Kegiatan
              </button>

              {/* Activity List */}
              {activities.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-white font-semibold mb-2">Kegiatan ({activities.length}):</h3>
                  {activities.map(activity => (
                    <div key={activity.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-white font-medium flex items-center gap-2">
                          <span>{activity.hasSpecificTime ? '📍' : '🔄'}</span>
                          {activity.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {activity.hasSpecificTime ? (
                            <>
                              {activity.specificDay} • {activity.specificTime} • {activity.duration} menit
                            </>
                          ) : (
                            <>
                              Durasi: {activity.duration} menit • Prioritas: {activity.priority}
                              {activity.mustBeBefore && ` • Sebelum ${activity.mustBeBefore}`}
                            </>
                          )}
                          {activity.description && ` • ${activity.description}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeActivity(activity.id!)}
                        className="text-red-400 hover:text-red-300 transition-colors text-xl ml-4"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>

            {/* Generate Button - Full Width Below Grid */}
            <button
              onClick={generateSchedule}
              disabled={isLoading || (courses.length === 0 && activities.length === 0)}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Sedang Menyusun Jadwal Optimal...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Jadwal Optimal dengan AI</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Result Tab */}
        {activeTab === 'result' && optimizedSchedule && (
          <div className="space-y-6">
            {/* Analysis Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-3xl font-bold text-white mb-1">{optimizedSchedule.analysis.totalKuliah}</div>
                <div className="text-blue-300 text-sm">Total Kuliah</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-white mb-1">{optimizedSchedule.analysis.totalKegiatan}</div>
                <div className="text-purple-300 text-sm">Total Kegiatan</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="text-3xl font-bold text-white mb-1">{optimizedSchedule.analysis.avgStudyHoursPerDay.toFixed(1)}h</div>
                <div className="text-emerald-300 text-sm">Belajar/Hari</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">⚖️</div>
                <div className="text-xl font-bold text-white mb-1">{optimizedSchedule.analysis.workLoadBalance}</div>
                <div className="text-yellow-300 text-sm">Beban Kerja</div>
              </div>
            </div>

            {/* Warnings */}
            {optimizedSchedule.warnings && optimizedSchedule.warnings.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span>⚠️</span>
                  Peringatan
                </h3>
                <ul className="space-y-2">
                  {optimizedSchedule.warnings.map((warning, i) => (
                    <li key={i} className="text-red-300 text-sm flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weekly Schedule - Improved UI */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span>📅</span>
                Jadwal Mingguan Optimal
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(optimizedSchedule.optimizedSchedule).map(([day, schedule]) => (
                  <div key={day} className="bg-gray-900 rounded-xl p-5 border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-gray-700 flex items-center gap-2">
                      <span className="text-emerald-400">📌</span>
                      {day}
                    </h3>
                    <div className="space-y-3">
                      {schedule.map((item, index) => (
                        <div
                          key={index}
                          className="group bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-all hover:shadow-lg border border-gray-700 hover:border-gray-600"
                        >
                          <div className="flex items-start gap-3">
                            {/* Time Badge */}
                            <div className="flex-shrink-0">
                              <div className="bg-gray-700 px-3 py-1.5 rounded-lg">
                                <div className="text-white font-mono text-sm font-bold">
                                  {item.time.split('-')[0]}
                                </div>
                                <div className="text-gray-400 font-mono text-xs">
                                  {item.time.includes('-') ? item.time.split('-')[1] : ''}
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{getTypeIcon(item.type)}</span>
                                <span className={`w-2 h-2 rounded-full ${getColorClass(item.color)}`}></span>
                                <h4 className="text-white font-semibold truncate">{item.activity}</h4>
                              </div>
                              {item.description && (
                                <p className="text-gray-400 text-sm mb-1">{item.description}</p>
                              )}
                              {item.location && (
                                <p className="text-gray-500 text-xs flex items-center gap-1">
                                  <span>📍</span>
                                  {item.location}
                                </p>
                              )}
                            </div>

                            {/* Type Badge */}
                            <div className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${
                              item.type === 'kuliah' ? 'bg-blue-500/20 text-blue-300' :
                              item.type === 'kegiatan' ? 'bg-purple-500/20 text-purple-300' :
                              item.type === 'routine' ? 'bg-gray-600/20 text-gray-400' :
                              'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {item.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations & Tips in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>💡</span>
                  Rekomendasi AI
                </h2>
                <ul className="space-y-3">
                  {optimizedSchedule.recommendations.map((rec, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                      <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Tips Produktivitas
                </h2>
                <ul className="space-y-3">
                  {optimizedSchedule.tips.map((tip, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                      <span className="text-yellow-400 text-xl flex-shrink-0">⭐</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'result' && !optimizedSchedule && (
          <div className="text-center py-12 bg-gray-800 rounded-2xl">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Belum Ada Jadwal</h3>
            <p className="text-gray-400 mb-6">Generate jadwal terlebih dahulu di tab Input Jadwal</p>
            <button
              onClick={() => setActiveTab('input')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Ke Input Jadwal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
