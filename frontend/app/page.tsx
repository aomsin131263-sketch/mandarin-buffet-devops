// frontend/app/page.tsx
'use client';

import { useState } from 'react';

// ประกาศ Type ของเมนูอาหาร
interface MenuItem {
  id: number;
  name: string;
  category: string;
  image: string;
  status: string;
}

export default function Home() {
  // ข้อมูลเมนูอาหารจำลองของร้าน Mandarin
  const [menus] = useState<MenuItem[]>([
    { id: 1, name: 'ติ่มซำ / เสี่ยวหลงเปา', category: 'Dim Sum', image: '🥟', status: 'Ready' },
    { id: 2, name: 'เป็ดปักกิ่ง', category: 'Main Course', image: '🦆', status: 'Ready' },
    { id: 3, name: 'หมูกรอบสไตล์กวางตุ้ง', category: 'Main Course', image: '🥓', status: 'Ready' },
    { id: 4, name: 'ชาจีนร้อน / ชามะลิ', category: 'Beverage', image: '🍵', status: 'Ready' },
  ]);

  // ตัวแปรเก็บสถานะการสั่งอาหาร
  const [logs, setLogs] = useState<string[]>([]);

  // ฟังก์ชันกดสั่งอาหาร (เปรียบเหมือนการส่ง Request ไปยัง Server)
  const handleOrder = (menuName: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `[${timestamp}] 🚀 Order Sent: สั่ง "${menuName}" ➔ เข้าสู่ระบบ CI/CD Kitchen Pipeline`;
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      {/* Header */}
      <header className="border-b border-slate-700 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-red-500">
          🥟 บุฟเฟต์แมนดาริน (ฉบับ DevOps)
        </h1>
        <p className="text-slate-400">
          บริการเสิร์ฟอาหารแบบ Zero-Downtime Deployment
        </p>
      </header>

      {/* CI/CD Pipeline Section */}
      <section className="bg-slate-800 p-6 rounded-lg mb-8 border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-amber-400">
          🚀 ท่อส่ง CI/CD ในครัว
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-700 p-4 rounded">
            <span className="block text-2xl">📝</span>
            <span className="font-bold">1. ได้รับคำสั่งซื้อแล้ว</span>
            <p className="text-xs text-slate-400">โค้ดถูกผลักดัน (Code Pushed)</p>
          </div>
          <div className="bg-slate-700 p-4 rounded">
            <span className="block text-2xl">🍳</span>
            <span className="font-bold">2. การปรุงอาหาร & QC</span>
            <p className="text-xs text-slate-400">การทดสอบอัตโนมัติ (Automated Test)</p>
          </div>
          <div className="bg-slate-700 p-4 rounded">
            <span className="block text-2xl">🥟</span>
            <span className="font-bold">3. เสิร์ฟร้อน</span>
            <p className="text-xs text-slate-400">ปรับใช้กับโต๊ะ (Deployed)</p>
          </div>
        </div>
      </section>

      {/* Buffet Menu Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">🥢 เลือกสั่งรายการบุฟเฟต์</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menus.map((item) => (
            <div key={item.id} className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-red-500 transition">
              <div className="text-4xl mb-3">{item.image}</div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{item.category}</p>
              <button
                onClick={() => handleOrder(item.name)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition"
              >
                สั่งอาหาร (Deploy)
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Real-time Order Log (เปรียบเหมือน Server Logs) */}
      <section className="bg-slate-950 p-4 rounded-lg border border-slate-800">
        <h3 className="text-sm font-semibold text-green-400 mb-2">📊 Kitchen Server Logs (Real-time)</h3>
        <div className="font-mono text-xs text-slate-300 h-32 overflow-y-auto space-y-1">
          {logs.length === 0 ? (
            <p className="text-slate-600">ยังไม่มีการส่งคำสั่งซื้อ...</p>
          ) : (
            logs.map((log, index) => <p key={index}>{log}</p>)
          )}
        </div>
      </section>
    </main>
  );
}