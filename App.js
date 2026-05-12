import React, { useState } from "react";

// ============================================================
// البيانات
// ============================================================
const DEMO_USERS = [
  { id: 1, name: "أحمد الشمري",  role: "engineer", area: "حفر الباطن", username: "a.shammari", password: "1234" },
  { id: 2, name: "أحمد العتيبي", role: "tech",   area: "حفر الباطن", username: "a.otaibi",   password: "1234" },
  { id: 3, name: "محمد المطيري", role: "tech",   area: "حفر الباطن", username: "m.mutairi",  password: "1234" },
  { id: 4, name: "روان الحربي",  role: "tech",   area: "حفر الباطن", username: "r.harbi",    password: "1234" },
  { id: 5, name: "شهد الحربي",   role: "tech",   area: "حفر الباطن", username: "s.harbi",    password: "1234" },
];

const SCHOOLS = [
  { id: 1, name: "مدرسة الأمل الابتدائية", area: "الدمام", type: "ابتدائي", hasLab: true, labInfo: { netSupportVersion: "14.00.0002", seats: 30, teacherPC: "Dell OptiPlex 7010" } },
  { id: 2, name: "مدرسة النور المتوسطة", area: "الخبر", type: "متوسط", hasLab: false },
  { id: 3, name: "مدرسة الفجر الثانوية", area: "الدمام", type: "ثانوي", hasLab: true, labInfo: { netSupportVersion: "14.00.0001", seats: 25, teacherPC: "HP ProDesk 400 G7" } },
  { id: 4, name: "مدرسة الرسالة الابتدائية", area: "الأحساء", type: "ابتدائي", hasLab: false },
  { id: 5, name: "مدرسة المعرفة المتوسطة", area: "القطيف", type: "متوسط", hasLab: true, labInfo: { netSupportVersion: "14.00.0002", seats: 20, teacherPC: "Lenovo ThinkCentre M720" } },
  { id: 6, name: "مدرسة التقدم الثانوية", area: "الجبيل", type: "ثانوي", hasLab: false },
  { id: 7, name: "مدرسة الوفاء الابتدائية", area: "الدمام", type: "ابتدائي", hasLab: true, labInfo: { netSupportVersion: "14.00.0002", seats: 35, teacherPC: "Dell OptiPlex 3090" } },
  { id: 8, name: "مدرسة الإشراق المتوسطة", area: "الخبر", type: "متوسط", hasLab: false },
];

const TICKETS = {
  1: [
    { id: "T-1021", date: "2024-11-03", issue: "الطابعة لا تطبع", solution: "تم تغيير الدرايفر وتنظيف الرأس", tech: "أحمد العتيبي", days: 1 },
    { id: "T-988", date: "2024-09-15", issue: "الجهاز لا يشتغل", solution: "تم استبدال مصدر الطاقة", tech: "روان الحربي", days: 2 },
    { id: "T-901", date: "2024-06-10", issue: "شاشة لا تعمل", solution: "تغيير كابل الشاشة", tech: "شهد الحربي", days: 1 },
  ],
  2: [
    { id: "T-1044", date: "2024-12-01", issue: "الشاشة سوداء", solution: "تم تحديث تعريف الشاشة", tech: "محمد المطيري", days: 1 },
    { id: "T-1011", date: "2024-10-05", issue: "الطابعة لا تطبع ألوان", solution: "تغيير خرطوشة الألوان", tech: "شهد الحربي", days: 1 },
  ],
  3: [
    { id: "T-1090", date: "2024-12-18", issue: "بطء شديد في الجهاز", solution: "تنظيف الجهاز من الفيروسات وزيادة الرام", tech: "محمد المطيري", days: 3 },
    { id: "T-1055", date: "2024-11-30", issue: "البروجكتر لا يعمل", solution: "استبدال المصباح", tech: "أحمد العتيبي", days: 2 },
    { id: "T-1002", date: "2024-08-14", issue: "المودم لا يعمل", solution: "استبدال المودم بالكامل", tech: "روان الحربي", days: 1 },
  ],
  4: [
    { id: "T-1033", date: "2024-11-12", issue: "إنترنت بطيء", solution: "إعادة ضبط إعدادات المودم", tech: "روان الحربي", days: 1 },
    { id: "T-955", date: "2024-07-20", issue: "لابتوب لا يشحن", solution: "استبدال الشاحن", tech: "شهد الحربي", days: 1 },
    { id: "T-910", date: "2024-05-30", issue: "تعطل الشبكة الداخلية في المعمل", solution: "فحص الراوتر واستبدال كابلات الشبكة", tech: "أحمد الشمري", days: 2 },
  ],
  5: [
    { id: "T-1078", date: "2024-12-10", issue: "شاشة زرقاء متكررة", solution: "إعادة تثبيت نظام التشغيل", tech: "أحمد العتيبي", days: 2 },
    { id: "T-1020", date: "2024-10-01", issue: "طابعة تعطي خطأ E5", solution: "إعادة ضبط المصنع", tech: "محمد المطيري", days: 1 },
  ],
  6: [
    { id: "T-1062", date: "2024-12-05", issue: "البروجكتر لا يتصل بالجهاز", solution: "تغيير كابل HDMI", tech: "شهد الحربي", days: 1 },
    { id: "T-1030", date: "2024-10-18", issue: "انقطاع الشبكة عن كل الأجهزة", solution: "إعادة ضبط السويتش وتحديث الفيرموير", tech: "أحمد الشمري", days: 1 },
  ],
  7: [
    { id: "T-1099", date: "2025-01-05", issue: "ورق عالق متكرر في الطابعة", solution: "استبدال بكرة السحب", tech: "أحمد العتيبي", days: 1 },
    { id: "T-1045", date: "2024-11-18", issue: "الجهاز لا يشتغل", solution: "تغيير الهارد ديسك", tech: "روان الحربي", days: 3 },
    { id: "T-980", date: "2024-08-22", issue: "انقطاع الإنترنت عن المعمل كله", solution: "إعادة ضبط إعدادات الراوتر والمودم", tech: "أحمد الشمري", days: 1 },
  ],
  8: [
    { id: "T-1110", date: "2025-01-15", issue: "شاشة اللابتوب مكسورة", solution: "استبدال الشاشة", tech: "محمد المطيري", days: 4 },
    { id: "T-1080", date: "2024-12-20", issue: "لوحة مفاتيح لا تعمل", solution: "استبدال لوحة المفاتيح", tech: "شهد الحربي", days: 2 },
  ],
};

const INITIAL_PRINTERS = [
  { id: 1, brand: "HP", model: "LaserJet Pro M404dn", type: "ليزر أبيض وأسود", driverUrl: "https://support.hp.com/drivers", addedBy: "أحمد العتيبي", date: "2024-10-01", notes: "تعريف 64-bit فقط" },
  { id: 2, brand: "HP", model: "LaserJet MFP M428fdw", type: "ليزر متعدد الوظائف", driverUrl: "https://support.hp.com/drivers", addedBy: "محمد المطيري", date: "2024-11-15", notes: "" },
  { id: 3, brand: "Canon", model: "LBP6030", type: "ليزر أبيض وأسود", driverUrl: "https://www.canon-europe.com/support/", addedBy: "أحمد العتيبي", date: "2024-09-20", notes: "يحتاج تثبيت يدوي على Win11" },
  { id: 4, brand: "Canon", model: "imageCLASS MF3010", type: "ليزر متعدد الوظائف", driverUrl: "https://www.canon-europe.com/support/", addedBy: "محمد المطيري", date: "2024-12-01", notes: "" },
  { id: 5, brand: "Kyocera", model: "ECOSYS M2040dn", type: "ليزر متعدد الوظائف", driverUrl: "https://www.kyoceradocumentsolutions.com/support/", addedBy: "أحمد العتيبي", date: "2025-01-10", notes: "استخدم KX Driver للأداء الأفضل" },
  { id: 6, brand: "Kyocera", model: "ECOSYS P2235dn", type: "ليزر أبيض وأسود", driverUrl: "https://www.kyoceradocumentsolutions.com/support/", addedBy: "محمد المطيري", date: "2025-01-12", notes: "" },
];

const BRAND_COLORS = { HP: "#0096D6", Canon: "#CC0000", Kyocera: "#E8400C" };
const BRAND_BG = { HP: "rgba(0,150,214,0.1)", Canon: "rgba(204,0,0,0.1)", Kyocera: "rgba(232,64,12,0.1)" };

// ============================================================
// تسجيل الدخول
// ============================================================
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.username === username && u.password === password);
      if (user) onLogin(user); else setError("اسم المستخدم أو كلمة السر غلط");
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 50%, #0a0f1e 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl" }}>
      <div style={{ background: "rgba(15,25,50,0.95)", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 400, border: "1px solid rgba(37,99,235,0.3)", boxShadow: "0 0 60px rgba(37,99,235,0.15)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 18, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: "0 0 30px rgba(37,99,235,0.5)" }}>🛠️</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>بوابة الفني</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>المنطقة الشرقية — إدارة التعليم</div>
        </div>
        {[{ label: "اسم المستخدم", value: username, set: setUsername, type: "text" }, { label: "كلمة السر", value: password, set: setPassword, type: "password" }].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: 6 }}>{f.label}</label>
            <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", background: "#0a0f1e", border: `1.5px solid ${error ? "#ef4444" : "rgba(37,99,235,0.3)"}`, borderRadius: 10, padding: "11px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: 8, padding: "8px 12px", color: "#fca5a5", fontSize: 13, marginBottom: 16, textAlign: "center" }}>⚠️ {error}</div>}
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", border: "none", borderRadius: 10, padding: "13px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20, boxShadow: "0 0 20px rgba(37,99,235,0.3)" }}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
        <div style={{ background: "rgba(37,99,235,0.06)", borderRadius: 10, padding: 12, border: "1px solid rgba(37,99,235,0.2)" }}>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>حسابات تجريبية:</div>
          {DEMO_USERS.map(u => (
            <div key={u.id} onClick={() => { setUsername(u.username); setPassword("1234"); }} style={{ fontSize: 12, color: "#64748b", marginBottom: 3, cursor: "pointer" }}>
              <span style={{ color: "#60a5fa" }}>{u.username}</span> / 1234 — {u.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// قسم تاريخ المدارس
// ============================================================
function SchoolsSection({ userName }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState({});
  const [newNote, setNewNote] = useState({});

  const filtered = SCHOOLS.filter(s => s.name.includes(search) || s.area.includes(search));

  const saveNote = (schoolId, ticketId) => {
    const text = (newNote[ticketId] || "").trim();
    if (!text) return;
    setNotes(prev => ({
      ...prev,
      [schoolId]: { ...prev[schoolId], [ticketId]: [...(prev[schoolId]?.[ticketId] || []), { text, by: userName, date: new Date().toLocaleDateString("ar-SA") }] }
    }));
    setNewNote(prev => ({ ...prev, [ticketId]: "" }));
  };

  if (selected) return (
    <div>
      <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 16px", color: "#94a3b8", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>← رجوع للقائمة</button>
      <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(15,25,50,0.8))", borderRadius: 14, padding: "16px 20px", border: "1px solid rgba(37,99,235,0.3)", marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>{selected.name}</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>📍 {selected.area} · {selected.type}</div>
        {selected.hasLab && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(16,185,129,0.1)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.3)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399", marginBottom: 6 }}>🖥️ معمل الحاسب</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>إصدار NetSupport: <span style={{ color: "#f1f5f9" }}>{selected.labInfo.netSupportVersion}</span></div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>عدد الأجهزة: <span style={{ color: "#f1f5f9" }}>{selected.labInfo.seats} جهاز</span></div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>جهاز المعلم: <span style={{ color: "#f1f5f9" }}>{selected.labInfo.teacherPC}</span></div>
          </div>
        )}
      </div>
      {(TICKETS[selected.id] || []).map(t => (
        <div key={t.id} style={{ background: "rgba(15,25,50,0.8)", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: "1px solid rgba(255,255,255,0.07)", borderRight: "3px solid #2563eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{t.id}</div>
            <div style={{ fontSize: 12, color: "#475569" }}>{t.date}</div>
          </div>
          <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 8, padding: "7px 10px", marginBottom: 7 }}>
            <div style={{ fontSize: 11, color: "#64748b" }}>المشكلة</div>
            <div style={{ fontSize: 13, color: "#fca5a5" }}>{t.issue}</div>
          </div>
          <div style={{ background: "rgba(34,197,94,0.08)", borderRadius: 8, padding: "7px 10px", marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: "#64748b" }}>الحل</div>
            <div style={{ fontSize: 13, color: "#86efac" }}>{t.solution}</div>
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 10 }}>🔧 {t.tech} · ⏱️ {t.days} يوم</div>
          {(notes[selected.id]?.[t.id] || []).map((n, i) => (
            <div key={i} style={{ background: "rgba(37,99,235,0.1)", borderRadius: 8, padding: "7px 10px", marginBottom: 6, border: "1px solid rgba(37,99,235,0.2)" }}>
              <div style={{ fontSize: 12, color: "#bfdbfe" }}>{n.text}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 3 }}>✍️ {n.by} · {n.date}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <input value={newNote[t.id] || ""} onChange={e => setNewNote(p => ({ ...p, [t.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && saveNote(selected.id, t.id)} placeholder="أضف ملاحظة..." style={{ flex: 1, background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 10px", color: "#e2e8f0", fontSize: 12, outline: "none" }} />
            <button onClick={() => saveNote(selected.id, t.id)} style={{ background: "#2563eb", border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, cursor: "pointer" }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث عن مدرسة أو مدينة..." style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
      {filtered.map(school => (
        <div key={school.id} onClick={() => setSelected(school)} style={{ background: "rgba(15,25,50,0.7)", borderRadius: 12, padding: "13px 16px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{school.name}</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>
              📍 {school.area} · {school.type}
              {school.hasLab && <span style={{ color: "#34d399", marginRight: 8 }}>· 🖥️ معمل</span>}
            </div>
          </div>
          <div style={{ background: "rgba(37,99,235,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: "#60a5fa" }}>{(TICKETS[school.id] || []).length}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// قسم تعريفات الطابعات
// ============================================================
function PrintersSection({ userName }) {
  const [printers, setPrinters] = useState(INITIAL_PRINTERS);
  const [filter, setFilter] = useState("الكل");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ brand: "HP", model: "", type: "ليزر أبيض وأسود", driverUrl: "", notes: "" });

  const brands = ["الكل", "HP", "Canon", "Kyocera"];
  const filtered = printers.filter(p => filter === "الكل" || p.brand === filter);

  const addPrinter = () => {
    if (!form.model.trim()) return;
    setPrinters(prev => [...prev, { id: Date.now(), ...form, addedBy: userName, date: new Date().toLocaleDateString("ar-SA") }]);
    setForm({ brand: "HP", model: "", type: "ليزر أبيض وأسود", driverUrl: "", notes: "" });
    setShowAdd(false);
  };

  return (
    <div>
      {/* فلتر الماركات */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {brands.map(b => (
          <button key={b} onClick={() => setFilter(b)} style={{ background: filter === b ? (BRAND_COLORS[b] || "#2563eb") : "rgba(255,255,255,0.05)", border: `1px solid ${filter === b ? (BRAND_COLORS[b] || "#2563eb") : "rgba(255,255,255,0.1)"}`, borderRadius: 20, padding: "6px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{b}</button>
        ))}
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: "rgba(37,99,235,0.2)", border: "1px solid #2563eb", borderRadius: 20, padding: "6px 16px", color: "#60a5fa", fontSize: 13, fontWeight: 600, cursor: "pointer", marginRight: "auto" }}>
          {showAdd ? "✕ إلغاء" : "+ إضافة طابعة"}
        </button>
      </div>

      {/* نموذج إضافة طابعة */}
      {showAdd && (
        <div style={{ background: "rgba(37,99,235,0.08)", borderRadius: 14, padding: 16, border: "1px solid rgba(37,99,235,0.3)", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa", marginBottom: 12 }}>➕ إضافة طابعة جديدة</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[
              { label: "الماركة", key: "brand", type: "select", opts: ["HP", "Canon", "Kyocera", "أخرى"] },
              { label: "نوع الطباعة", key: "type", type: "select", opts: ["ليزر أبيض وأسود", "ليزر ملون", "ليزر متعدد الوظائف", "إنك جيت"] },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>{f.label}</label>
                <select value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px", color: "#e2e8f0", fontSize: 13, outline: "none" }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {[
            { label: "موديل الطابعة *", key: "model", placeholder: "مثال: LaserJet Pro M404dn" },
            { label: "رابط التعريف", key: "driverUrl", placeholder: "https://..." },
            { label: "ملاحظات", key: "notes", placeholder: "أي ملاحظات مهمة للتثبيت..." },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <button onClick={addPrinter} style={{ background: "#2563eb", border: "none", borderRadius: 8, padding: "9px 20px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>حفظ الطابعة</button>
        </div>
      )}

      {/* قائمة الطابعات */}
      {filtered.map(p => (
        <div key={p.id} style={{ background: "rgba(15,25,50,0.7)", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid rgba(255,255,255,0.07)", borderRight: `3px solid ${BRAND_COLORS[p.brand] || "#2563eb"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <span style={{ background: BRAND_BG[p.brand] || "rgba(37,99,235,0.1)", color: BRAND_COLORS[p.brand] || "#60a5fa", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, marginBottom: 4, display: "inline-block" }}>{p.brand}</span>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{p.model}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>🖨️ {p.type}</div>
            </div>
            {p.driverUrl && (
              <a href={p.driverUrl} target="_blank" rel="noreferrer" style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 8, padding: "6px 12px", color: "#60a5fa", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                ⬇️ تحميل التعريف
              </a>
            )}
          </div>
          {p.notes && (
            <div style={{ background: "rgba(245,158,11,0.08)", borderRadius: 8, padding: "6px 10px", border: "1px solid rgba(245,158,11,0.2)", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: "#fbbf24" }}>⚠️ {p.notes}</div>
            </div>
          )}
          <div style={{ fontSize: 11, color: "#475569" }}>✍️ {p.addedBy} · {p.date}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// قسم أدوات الفني
// ============================================================
function ToolsSection() {
  const [copied, setCopied] = useState(false);
  const officeKey = "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX";

  const copyKey = () => {
    navigator.clipboard.writeText(officeKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const netSupportSteps = [
    "افتح برنامج NetSupport School على جهاز المعلم",
    "اذهب لـ Tools ← Configuration",
    "اختر Room Management",
    "أدخل اسم الغرفة واضغط OK",
    "على الطلاب: افتح Student Client وأدخل اسم الغرفة نفسه",
    "اضغط Connect وسيظهر اسم المعلم",
  ];

  const tools = [
    { name: "HP Support", desc: "تعريفات جميع طابعات HP", url: "https://support.hp.com/drivers", icon: "🖨️" },
    { name: "Canon Support", desc: "تعريفات جميع طابعات Canon", url: "https://www.canon-europe.com/support/", icon: "🖨️" },
    { name: "Kyocera Support", desc: "تعريفات جميع طابعات Kyocera", url: "https://www.kyoceradocumentsolutions.com/support/", icon: "🖨️" },
    { name: "Windows Update", desc: "تحديثات ويندوز", url: "ms-settings:windowsupdate", icon: "🪟" },
    { name: "Device Manager", desc: "إدارة الأجهزة", url: "devmgmt.msc", icon: "⚙️" },
  ];

  return (
    <div>
      {/* كود الأوفيس */}
      <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(15,25,50,0.9))", borderRadius: 14, padding: 16, border: "1px solid rgba(37,99,235,0.3)", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa", marginBottom: 12 }}>🔑 كود تفعيل Microsoft Office</div>
        <div style={{ background: "#0a0f1e", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(37,99,235,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontFamily: "monospace", fontSize: 16, color: "#f1f5f9", letterSpacing: 2 }}>{officeKey}</div>
          <button onClick={copyKey} style={{ background: copied ? "rgba(34,197,94,0.2)" : "rgba(37,99,235,0.3)", border: `1px solid ${copied ? "#22c55e" : "#2563eb"}`, borderRadius: 8, padding: "6px 14px", color: copied ? "#86efac" : "#60a5fa", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
            {copied ? "✅ تم النسخ" : "📋 نسخ"}
          </button>
        </div>
        <div style={{ fontSize: 12, color: "#475569" }}>⚠️ هذا الكود لجميع مدارس المنطقة الشرقية</div>
      </div>

      {/* خطوات NetSupport */}
      <div style={{ background: "rgba(16,185,129,0.06)", borderRadius: 14, padding: 16, border: "1px solid rgba(16,185,129,0.2)", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399", marginBottom: 12 }}>🖥️ طريقة تفعيل NetSupport — جهاز المعلم</div>
        {netSupportSteps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <div style={{ width: 22, height: 22, background: "rgba(16,185,129,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#34d399", flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 13, color: "#94a3b8", paddingTop: 2 }}>{step}</div>
          </div>
        ))}
      </div>

      {/* روابط مفيدة */}
      <div style={{ fontSize: 14, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>🔗 روابط مفيدة</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {tools.map(t => (
          <a key={t.name} href={t.url} target="_blank" rel="noreferrer" style={{ background: "rgba(15,25,50,0.7)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{t.name}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>{t.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// التطبيق الرئيسي
// ============================================================
function MainApp({ user, onLogout }) {
  const [section, setSection] = useState("schools");

  const navItems = [
    { id: "schools", icon: "🏫", label: "المدارس" },
    { id: "printers", icon: "🖨️", label: "الطابعات" },
    { id: "tools", icon: "🛠️", label: "الأدوات" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080e1e", fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl", color: "#e2e8f0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "rgba(10,15,30,0.95)", borderBottom: "1px solid rgba(37,99,235,0.2)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🛠️</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>بوابة الفني</div>
            <div style={{ fontSize: 11, color: "#475569" }}>{user.name} — {user.role === "engineer" ? "مهندس شبكات" : "فني"}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "5px 12px", color: "#fca5a5", fontSize: 12, cursor: "pointer" }}>خروج</button>
      </div>

      {/* Navigation */}
      <div style={{ background: "rgba(10,15,30,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", padding: "0 20px" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setSection(item.id)} style={{ background: "none", border: "none", borderBottom: section === item.id ? "2px solid #2563eb" : "2px solid transparent", padding: "12px 20px", cursor: "pointer", color: section === item.id ? "#60a5fa" : "#475569", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box", paddingBottom: 0 }}>
        {section === "schools" && <SchoolsSection userName={user.name} />}
        {section === "printers" && <PrintersSection userName={user.name} />}
        {section === "tools" && <ToolsSection />}
      </div>
      {/* Footer */}
      <div style={{ textAlign: "center", padding: "14px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "#334155", background: "rgba(10,15,30,0.8)" }}>
        تم التطوير بواسطة <span style={{ color: "#2563eb", fontWeight: 600 }}>فريق حفر الباطن</span>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <LoginPage onLogin={setUser} />;
  return <MainApp user={user} onLogout={() => setUser(null)} />;
}
