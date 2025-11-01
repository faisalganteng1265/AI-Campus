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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b-2 border-cyan-500 py-8 px-6 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(6,182,212,1)]">
              SMART SCHEDULE BUILDER
            </h1>
            <p className="text-cyan-300 text-lg">
              AI bantu atur jadwal kuliah dan kegiatanmu agar seimbang dan produktif
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'input'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,1)]'
                  : 'bg-gray-900 text-cyan-400 border-2 border-cyan-500 hover:bg-cyan-500/10'
              }`}
            >
              INPUT JADWAL
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'result'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,1)]'
                  : 'bg-gray-900 text-cyan-400 border-2 border-cyan-500 hover:bg-cyan-500/10'
              }`}
              disabled={!optimizedSchedule}
            >
              JADWAL OPTIMAL
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Tab */}
        {activeTab === 'input' && (
          <div className="space-y-8">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                INPUT JADWAL & KEGIATAN
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-3"></div>
            </div>

            {/* Main Grid - Side by Side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              
              {/* LEFT SIDE - JADWAL KULIAH */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">JADWAL KULIAH</h3>
                  <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-full">
                    <span className="text-cyan-400 font-semibold">{courses.length} Kuliah</span>
                  </div>
                </div>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nama Mata Kuliah"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="w-full bg-black text-cyan-300 rounded-lg px-4 py-3 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                    />
                    
                    <select
                      value={newCourse.day}
                      onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                      className="w-full bg-black text-cyan-300 rounded-lg px-4 py-3 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                    >
                      {days.map(day => (
                        <option key={day} value={day} className="bg-gray-900">{day}</option>
                      ))}
                    </select>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-cyan-400 text-sm mb-2 block">Jam Mulai</label>
                        <select
                          value={newCourse.startTime}
                          onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                          className="w-full bg-black text-cyan-300 rounded-lg px-4 py-3 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-900">{time}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-cyan-400 text-sm mb-2 block">Jam Selesai</label>
                        <select
                          value={newCourse.endTime}
                          onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                          className="w-full bg-black text-cyan-300 rounded-lg px-4 py-3 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-gray-900">{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Lokasi/Keterangan (opsional)"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="w-full bg-black text-cyan-300 rounded-lg px-4 py-3 border-2 border-cyan-500/50 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all"
                    />
                    
                    <button
                      onClick={addCourse}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]"
                    >
                      + TAMBAH KULIAH
                    </button>
                </div>

                {/* Course List */}
                {courses.length > 0 && (
                  <div className="space-y-3">
                    {courses.map(course => (
                      <div key={course.id} className="bg-gray-900 border-l-4 border-cyan-500 rounded-lg p-4 flex justify-between items-center hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                        <div className="flex-1">
                          <p className="text-cyan-300 font-semibold text-lg">{course.name}</p>
                          <p className="text-cyan-600 text-sm mt-1">
                            {course.day} • {course.startTime} - {course.endTime}
                          </p>
                          {course.description && (
                            <p className="text-gray-500 text-sm mt-1">{course.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeCourse(course.id!)}
                          className="text-red-400 hover:text-red-300 transition-colors text-2xl ml-4 hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE - KEGIATAN */}
              <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">KEGIATAN LAIN</h3>
                  <div className="px-4 py-2 bg-purple-500/20 border border-purple-500 rounded-full">
                    <span className="text-purple-400 font-semibold">{activities.length} Kegiatan</span>
                  </div>
                </div>

                  {/* Activity Mode Toggle */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => setActivityMode('flexible')}
                      className={`py-4 px-4 rounded-lg font-semibold transition-all ${
                        activityMode === 'flexible'
                          ? 'bg-purple-500 text-black shadow-[0_0_15px_rgba(168,85,247,0.8)]'
                          : 'bg-black text-purple-400 border-2 border-purple-500 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-sm">WAKTU FLEKSIBEL</div>
                      <div className="text-xs opacity-75 mt-1">AI tentukan waktu</div>
                    </button>
                    <button
                      onClick={() => setActivityMode('specific')}
                      className={`py-4 px-4 rounded-lg font-semibold transition-all ${
                        activityMode === 'specific'
                          ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.8)]'
                          : 'bg-black text-orange-400 border-2 border-orange-500 hover:bg-orange-500/10'
                      }`}
                    >
                      <div className="text-sm">WAKTU SPESIFIK</div>
                      <div className="text-xs opacity-75 mt-1">Waktu ditentukan</div>
                    </button>
                  </div>

                  {/* Flexible Activity Form */}
                  {activityMode === 'flexible' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nama Kegiatan"
                        value={newActivity.name}
                        onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                        className="w-full bg-black text-purple-300 rounded-lg px-4 py-3 border-2 border-purple-500/50 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
                      />
                      
                      <select
                        value={newActivity.duration}
                        onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
                        className="w-full bg-black text-purple-300 rounded-lg px-4 py-3 border-2 border-purple-500/50 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
                      >
                        <option value={30} className="bg-gray-900">30 menit</option>
                        <option value={60} className="bg-gray-900">1 jam</option>
                        <option value={90} className="bg-gray-900">1.5 jam</option>
                        <option value={120} className="bg-gray-900">2 jam</option>
                        <option value={180} className="bg-gray-900">3 jam</option>
                      </select>
                      
                      <select
                        value={newActivity.priority}
                        onChange={(e) => setNewActivity({ ...newActivity, priority: e.target.value as any })}
                        className="w-full bg-black text-purple-300 rounded-lg px-4 py-3 border-2 border-purple-500/50 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
                      >
                        <option value="tinggi" className="bg-gray-900">Prioritas Tinggi</option>
                        <option value="sedang" className="bg-gray-900">Prioritas Sedang</option>
                        <option value="rendah" className="bg-gray-900">Prioritas Rendah</option>
                      </select>
                      
                      <select
                        value={newActivity.mustBeBefore || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, mustBeBefore: e.target.value || undefined })}
                        className="w-full bg-black text-purple-300 rounded-lg px-4 py-3 border-2 border-purple-500/50 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
                      >
                        <option value="" className="bg-gray-900">Kapan saja</option>
                        <option value="12:00" className="bg-gray-900">Sebelum jam 12:00</option>
                        <option value="15:00" className="bg-gray-900">Sebelum jam 15:00</option>
                        <option value="18:00" className="bg-gray-900">Sebelum jam 18:00</option>
                        <option value="20:00" className="bg-gray-900">Sebelum jam 20:00</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="Keterangan (opsional)"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                        className="w-full bg-black text-purple-300 rounded-lg px-4 py-3 border-2 border-purple-500/50 focus:border-purple-500 focus:outline-none focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
                      />
                      
                      <button
                        onClick={addActivity}
                        className="w-full bg-purple-500 hover:bg-purple-400 text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
                      >
                        + TAMBAH KEGIATAN
                      </button>
                    </div>
                  )}

                  {/* Specific Time Activity Form */}
                  {activityMode === 'specific' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nama Kegiatan"
                        value={newActivity.name}
                        onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                        className="w-full bg-black text-orange-300 rounded-lg px-4 py-3 border-2 border-orange-500/50 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"
                      />
                      
                      <select
                        value={newActivity.specificDay || 'Senin'}
                        onChange={(e) => setNewActivity({ ...newActivity, specificDay: e.target.value })}
                        className="w-full bg-black text-orange-300 rounded-lg px-4 py-3 border-2 border-orange-500/50 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"
                      >
                        {days.map(day => (
                          <option key={day} value={day} className="bg-gray-900">{day}</option>
                        ))}
                      </select>
                      
                      <select
                        value={newActivity.specificTime || '09:00'}
                        onChange={(e) => setNewActivity({ ...newActivity, specificTime: e.target.value })}
                        className="w-full bg-black text-orange-300 rounded-lg px-4 py-3 border-2 border-orange-500/50 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"
                      >
                        {timeSlots.map(time => (
                          <option key={time} value={time} className="bg-gray-900">{time}</option>
                        ))}
                      </select>
                      
                      <select
                        value={newActivity.duration}
                        onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
                        className="w-full bg-black text-orange-300 rounded-lg px-4 py-3 border-2 border-orange-500/50 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"
                      >
                        <option value={30} className="bg-gray-900">30 menit</option>
                        <option value={60} className="bg-gray-900">1 jam</option>
                        <option value={90} className="bg-gray-900">1.5 jam</option>
                        <option value={120} className="bg-gray-900">2 jam</option>
                        <option value={180} className="bg-gray-900">3 jam</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="Keterangan (opsional)"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                        className="w-full bg-black text-orange-300 rounded-lg px-4 py-3 border-2 border-orange-500/50 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all"
                      />
                      
                      <button
                        onClick={addActivity}
                        className="w-full bg-orange-500 hover:bg-orange-400 text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]"
                      >
                        + TAMBAH KEGIATAN
                      </button>
                    </div>
                  )}
                </div>

                {/* Activity List */}
                {activities.length > 0 && (
                  <div className="space-y-3">
                    {activities.map(activity => (
                      <div key={activity.id} className={`bg-gray-900 rounded-lg p-4 flex justify-between items-center hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all ${
                        activity.hasSpecificTime ? 'border-l-4 border-orange-500' : 'border-l-4 border-purple-500'
                      }`}>
                        <div className="flex-1">
                          <p className={`font-semibold text-lg ${activity.hasSpecificTime ? 'text-orange-300' : 'text-purple-300'}`}>
                            {activity.name}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {activity.hasSpecificTime ? (
                              <>{activity.specificDay} • {activity.specificTime} • {activity.duration} menit</>
                            ) : (
                              <>Durasi: {activity.duration} menit • {activity.priority}</>
                            )}
                          </p>
                          {activity.description && (
                            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeActivity(activity.id!)}
                          className="text-red-400 hover:text-red-300 transition-colors text-2xl ml-4 hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSchedule}
              disabled={isLoading || (courses.length === 0 && activities.length === 0)}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black py-5 rounded-xl font-bold text-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>AI SEDANG MENYUSUN JADWAL OPTIMAL...</span>
                </>
              ) : (
                <span>GENERATE JADWAL OPTIMAL DENGAN AI</span>
              )}
            </button>
          </div>
        )}

        {/* Result Tab */}
        {activeTab === 'result' && optimizedSchedule && (
          <div className="space-y-8">
            {/* Analysis Cards - 4 Column Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900 border-2 border-cyan-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{optimizedSchedule.analysis.totalKuliah}</div>
                <div className="text-cyan-300 text-sm uppercase tracking-wider">Total Kuliah</div>
              </div>
              <div className="bg-gray-900 border-2 border-purple-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <div className="text-4xl font-bold text-purple-400 mb-2">{optimizedSchedule.analysis.totalKegiatan}</div>
                <div className="text-purple-300 text-sm uppercase tracking-wider">Total Kegiatan</div>
              </div>
              <div className="bg-gray-900 border-2 border-emerald-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <div className="text-4xl font-bold text-emerald-400 mb-2">{optimizedSchedule.analysis.avgStudyHoursPerDay.toFixed(1)}h</div>
                <div className="text-emerald-300 text-sm uppercase tracking-wider">Belajar/Hari</div>
              </div>
              <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <div className="text-2xl font-bold text-yellow-400 mb-2">{optimizedSchedule.analysis.workLoadBalance}</div>
                <div className="text-yellow-300 text-sm uppercase tracking-wider">Beban Kerja</div>
              </div>
            </div>

            {/* Warnings */}
            {optimizedSchedule.warnings && optimizedSchedule.warnings.length > 0 && (
              <div className="bg-gray-900 border-2 border-red-500 rounded-xl p-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  PERINGATAN
                </h3>
                <ul className="space-y-2">
                  {optimizedSchedule.warnings.map((warning, i) => (
                    <li key={i} className="text-red-300 flex items-start gap-3 bg-black/50 p-3 rounded-lg">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weekly Schedule Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                JADWAL MINGGUAN OPTIMAL
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-3"></div>
            </div>

            {/* Weekly Schedule - 3 Column Grid for Better Readability */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(optimizedSchedule.optimizedSchedule).map(([day, schedule]) => (
                <div key={day} className="bg-gray-900 rounded-xl p-5 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 pb-3 border-b-2 border-cyan-500/30 uppercase tracking-wider">
                    {day}
                  </h3>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black rounded-lg p-3 border-l-4 border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all"
                      >
                        {/* Time Badge */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-cyan-500/20 px-2 py-1 rounded border border-cyan-500">
                            <div className="text-cyan-400 font-mono text-xs font-bold">
                              {item.time}
                            </div>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${getColorClass(item.color)}`}></span>
                        </div>

                        {/* Content */}
                        <h4 className="text-cyan-300 font-semibold mb-1">{item.activity}</h4>
                        
                        {item.description && (
                          <p className="text-gray-400 text-sm mb-1">{item.description}</p>
                        )}
                        
                        {item.location && (
                          <p className="text-gray-500 text-xs">{item.location}</p>
                        )}

                        {/* Type Badge */}
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            item.type === 'kuliah' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500' :
                            item.type === 'kegiatan' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
                            item.type === 'routine' ? 'bg-gray-600/20 text-gray-400 border border-gray-500' :
                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations & Tips - 2 Column Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className="bg-gray-900 border-2 border-emerald-500 rounded-xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <h2 className="text-2xl font-bold text-emerald-400 mb-4 uppercase tracking-wider">
                  REKOMENDASI AI
                </h2>
                <ul className="space-y-3">
                  {optimizedSchedule.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 bg-black/50 p-3 rounded-lg border-l-4 border-emerald-500">
                      <span className="text-emerald-400 font-bold text-lg">✓</span>
                      <span className="text-gray-300 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 uppercase tracking-wider">
                  TIPS PRODUKTIVITAS
                </h2>
                <ul className="space-y-3">
                  {optimizedSchedule.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 bg-black/50 p-3 rounded-lg border-l-4 border-yellow-500">
                      <span className="text-yellow-400 font-bold text-lg">★</span>
                      <span className="text-gray-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'result' && !optimizedSchedule && (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border-2 border-cyan-500/30">
            <h3 className="text-3xl font-bold text-cyan-400 mb-3">BELUM ADA JADWAL</h3>
            <p className="text-gray-400 mb-6">Generate jadwal terlebih dahulu di tab Input Jadwal</p>
            <button
              onClick={() => setActiveTab('input')}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            >
              KE INPUT JADWAL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}