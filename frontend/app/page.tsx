"use client";
import React, { useState } from "react";

// รายชื่อโต๊ะจำลองในร้าน
const initialTables = [
  { id: "T-01", seats: 2, status: "available" },
  { id: "T-02", seats: 4, status: "available" },
  { id: "T-03", seats: 4, status: "occupied" },
  { id: "T-04", seats: 6, status: "available" },
  { id: "T-05", seats: 2, status: "available" },
  { id: "T-06", seats: 8, status: "reserved" },
];

export default function TableBookingPage() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable || !customerName || !phone) {
      alert("กรุณาเลือกโต๊ะและกรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // อัปเดตสถานะโต๊ะเป็น reserved
    setTables((prev) =>
      prev.map((t) => (t.id === selectedTable ? { ...t, status: "reserved" } : t))
    );
    setBookingSuccess(true);
  };

  // สร้าง URL สแกน QR Code (จำลองด้วย QuickChart / Google Chart API)
  const qrCodeUrl = selectedTable
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        `MANDARIN-BUFFET:TABLE=${selectedTable}&NAME=${customerName}&PHONE=${phone}`
      )}`
    : "";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-amber-500 mb-2">
          🍣 Mandarin Buffet - ระบบจองโต๊ะออนไลน์
        </h1>
        <p className="text-slate-400">เลือกโต๊ะ กรอกข้อมูล และสแกน QR Code เพื่อรับสิทธิ์เข้าทาน</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ผังการเลือกโต๊ะ */}
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-amber-400">1. เลือกโต๊ะอาหาร</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {tables.map((table) => {
              const isSelected = selectedTable === table.id;
              const isAvailable = table.status === "available";

              return (
                <button
                  key={table.id}
                  disabled={!isAvailable}
                  onClick={() => setSelectedTable(table.id)}
                  className={`p-4 rounded-lg border text-center transition ${
                    isSelected
                      ? "bg-amber-500 border-amber-300 text-slate-950 font-bold scale-105"
                      : isAvailable
                      ? "bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                      : "bg-red-900/40 border-red-800 text-red-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="text-lg font-bold">{table.id}</div>
                  <div className="text-xs">{table.seats} ที่นั่ง</div>
                  <div className="text-[10px] mt-1 uppercase">
                    {table.status === "available"
                      ? "ว่าง"
                      : table.status === "reserved"
                      ? "จองแล้ว"
                      : "มีลูกค้า"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-4 text-xs text-slate-400 border-t border-slate-700 pt-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-slate-700 border border-slate-600 rounded"></span> ว่าง
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-amber-500 rounded"></span> กำลังเลือก
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-900/50 rounded"></span> ไม่ว่าง
            </span>
          </div>
        </section>

        {/* ฟอร์มและ QR Code สแกนเข้าโต๊ะ */}
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-amber-400">2. ข้อมูลการจอง & QR Code</h2>

          {!bookingSuccess ? (
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">โต๊ะที่เลือก</label>
                <input
                  type="text"
                  value={selectedTable || "ยังไม่ได้เลือกโต๊ะ"}
                  readOnly
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-amber-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">ชื่อผู้จอง</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="กรอกชื่อ-นามสกุล"
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedTable}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold p-3 rounded-lg transition"
              >
                ยืนยันการจองโต๊ะ
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="text-green-400 font-bold text-lg">🎉 จองโต๊ะสำเร็จเรียบร้อย!</div>
              <p className="text-xs text-slate-300">
                แสดง QR Code นี้ให้พนักงานหน้าหน้าร้านสแกนเพื่อเช็กอินเข้าโต๊ะ
              </p>

              <div className="flex justify-center my-4">
                <img
                  src={qrCodeUrl}
                  alt="Booking QR Code"
                  className="p-2 bg-white rounded-lg shadow-lg border-2 border-amber-500"
                />
              </div>

              <div className="bg-slate-900 p-3 rounded text-left text-xs text-slate-300 space-y-1">
                <div>
                  <strong className="text-amber-400">หมายเลขโต๊ะ:</strong> {selectedTable}
                </div>
                <div>
                  <strong className="text-amber-400">ชื่อผู้จอง:</strong> {customerName}
                </div>
                <div>
                  <strong className="text-amber-400">เบอร์โทร:</strong> {phone}
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingSuccess(false);
                  setSelectedTable(null);
                  setCustomerName("");
                  setPhone("");
                }}
                className="text-xs text-amber-500 hover:underline"
              >
                + ทำการจองใหม่
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}