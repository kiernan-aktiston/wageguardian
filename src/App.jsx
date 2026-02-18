import { useState, useEffect, useRef } from "react";

// ─── Arizona Wage Law ───
const AZ_WAGE = { name: "Arizona", min: 15.15, tipCredit: 3.00, tippedMin: 12.15 };

// ─── i18n ───
const LANG_KEY = "wageguardian_lang";
const T = {
  // App chrome
  appName: { en: "Guardian", es: "Guardián" },
  wage: { en: "WAGE", es: "SALARIO" },
  azMinWage: { en: "AZ MIN WAGE", es: "SALARIO MÍN AZ" },
  tippedLabel: { en: "Tipped", es: "Con propinas" },
  perHour: { en: "/hr", es: "/hora" },
  reset: { en: "Reset", es: "Reiniciar" },
  misclassBanner: { en: "Possible misclassification detected — keep documenting", es: "Posible error de clasificación detectado — siga documentando" },

  // Tabs
  tabLog: { en: "LOG", es: "REGISTRO" },
  tabScan: { en: "SCAN", es: "ESCANEO" },
  tabStats: { en: "STATS", es: "DATOS" },
  tabAlerts: { en: "ALERTS", es: "ALERTAS" },
  tabExport: { en: "EXPORT", es: "EXPORTAR" },

  // Log tab
  logShift: { en: "LOG SHIFT", es: "REGISTRAR TURNO" },
  date: { en: "DATE (MM/DD/YYYY)", es: "FECHA (MM/DD/AAAA)" },
  datePlaceholder: { en: "02/17/2026", es: "17/02/2026" },
  rateLabel: { en: "RATE ($/HR)", es: "TARIFA ($/HORA)" },
  startLabel: { en: "START (HH:MM)", es: "INICIO (HH:MM)" },
  endLabel: { en: "END (HH:MM)", es: "FIN (HH:MM)" },
  tipsLabel: { en: "TIPS ($)", es: "PROPINAS ($)" },
  addShift: { en: "+ ADD SHIFT", es: "+ AGREGAR TURNO" },
  quickAdd: { en: "⚡ QUICK ADD (today, 7h demo shift)", es: "⚡ AGREGAR RÁPIDO (hoy, turno demo 7h)" },
  recentShifts: { en: "RECENT SHIFTS", es: "TURNOS RECIENTES" },
  noShifts: { en: "No shifts logged yet", es: "No hay turnos registrados" },
  addOrScan: { en: "Add manually above or use", es: "Agregue arriba o use" },
  scan: { en: "Scan", es: "Escaneo" },
  toUpload: { en: "to upload documents", es: "para subir documentos" },
  scanned: { en: "SCAN", es: "ESCANEADO" },
  lowRate: { en: "⚠ LOW RATE", es: "⚠ TARIFA BAJA" },
  tips: { en: "tips", es: "propinas" },

  // Scan tab
  scanDoc: { en: "Scan a Document", es: "Escanear un Documento" },
  scanDesc: { en: "Upload a tip-out receipt or paycheck stub.\nWe'll extract the numbers automatically.", es: "Suba un recibo de propinas o talón de pago.\nExtraeremos los números automáticamente." },
  docType: { en: "DOCUMENT TYPE", es: "TIPO DE DOCUMENTO" },
  tipReceipt: { en: "Tip Receipt", es: "Recibo de Propinas" },
  payStub: { en: "Pay Stub", es: "Talón de Pago" },
  takePhoto: { en: "📷 TAKE PHOTO / UPLOAD", es: "📷 TOMAR FOTO / SUBIR" },
  photosStay: { en: "Photos stay on your device", es: "Las fotos permanecen en su dispositivo" },
  uploadHistory: { en: "UPLOAD HISTORY", es: "HISTORIAL DE SUBIDAS" },
  saved: { en: "SAVED", es: "GUARDADO" },
  preview: { en: "PREVIEW", es: "VISTA PREVIA" },
  back: { en: "← BACK", es: "← ATRÁS" },
  scanNow: { en: "⚡ SCAN", es: "⚡ ESCANEAR" },
  scanning: { en: "Scanning...", es: "Escaneando..." },
  extractedData: { en: "EXTRACTED DATA", es: "DATOS EXTRAÍDOS" },
  fieldsFound: { en: "fields", es: "campos" },
  verifyCorrect: { en: "VERIFY & CORRECT", es: "VERIFICAR Y CORREGIR" },
  lowConfidence: { en: "⚠ Low confidence — please verify", es: "⚠ Baja confianza — por favor verifique" },
  discard: { en: "✕ DISCARD", es: "✕ DESCARTAR" },
  confirm: { en: "✓ CONFIRM", es: "✓ CONFIRMAR" },
  docSaved: { en: "Document Saved", es: "Documento Guardado" },
  convertQ: { en: "Convert into a shift record?", es: "¿Convertir en registro de turno?" },
  skip: { en: "SKIP", es: "OMITIR" },
  addAsShift: { en: "+ ADD SHIFT", es: "+ AGREGAR TURNO" },

  // Stats tab
  totalEarned: { en: "TOTAL EARNED", es: "TOTAL GANADO" },
  avgPerHour: { en: "AVG $/HOUR", es: "PROM $/HORA" },
  totalHours: { en: "TOTAL HOURS", es: "HORAS TOTALES" },
  totalTips: { en: "TOTAL TIPS", es: "PROPINAS TOTALES" },
  shiftsLabel: { en: "SHIFTS", es: "TURNOS" },
  bestDay: { en: "💡 BEST DAY FOR TIPS", es: "💡 MEJOR DÍA PARA PROPINAS" },
  avgTips: { en: "Avg", es: "Prom" },
  inTipsAcross: { en: "in tips across", es: "en propinas en" },
  shiftsWord: { en: "shifts", es: "turnos" },
  tipsByDay: { en: "TIPS BY DAY", es: "PROPINAS POR DÍA" },
  dataSources: { en: "DATA SOURCES", es: "FUENTES DE DATOS" },
  manual: { en: "Manual", es: "Manual" },
  scannedLabel: { en: "Scanned", es: "Escaneado" },
  uploads: { en: "Uploads", es: "Subidas" },
  logOrScan: { en: "Log or scan shifts to see earnings insights", es: "Registre o escanee turnos para ver datos de ganancias" },

  // Day names
  sun: { en: "Sun", es: "Dom" }, mon: { en: "Mon", es: "Lun" }, tue: { en: "Tue", es: "Mar" },
  wed: { en: "Wed", es: "Mié" }, thu: { en: "Thu", es: "Jue" }, fri: { en: "Fri", es: "Vie" },
  sat: { en: "Sat", es: "Sáb" },

  // Alerts tab
  noViolations: { en: "No Violations Detected", es: "No Se Detectaron Violaciones" },
  startLogging: { en: "Start logging shifts to check compliance", es: "Comience a registrar turnos para verificar cumplimiento" },
  allCompliant: { en: "shifts analyzed — all compliant with Arizona wage law", es: "turnos analizados — todos cumplen con la ley salarial de Arizona" },
  violationsFound: { en: "⚠ VIOLATIONS FOUND", es: "⚠ VIOLACIONES ENCONTRADAS" },
  violationS: { en: "violation", es: "violación" },
  violationsP: { en: "violations", es: "violaciones" },
  detected: { en: "detected", es: "detectadas" },
  potentiallyOwed: { en: "potentially owed", es: "potencialmente adeudado" },
  weeklyShortfall: { en: "WEEKLY SHORTFALL", es: "DÉFICIT SEMANAL" },
  weekOf: { en: "Week of", es: "Semana del" },
  worked: { en: "worked", es: "trabajadas" },
  effective: { en: "Effective", es: "Efectiva" },
  required: { en: "Required", es: "Requerida" },
  gap: { en: "Gap", es: "Diferencia" },
  owed: { en: "owed", es: "adeudado" },
  baseRateViolation: { en: "BASE RATE VIOLATION", es: "VIOLACIÓN DE TARIFA BASE" },
  paid: { en: "Paid", es: "Pagado" },
  tippedMinimum: { en: "Tipped minimum", es: "Mínimo con propinas" },
  shortfall: { en: "Shortfall", es: "Déficit" },
  whatToDo: { en: "What to do:", es: "Qué hacer:" },
  whatToDoDesc: { en: "Export your wage report from the Export tab. This documents the violations with the math — useful if you consult an employment attorney.", es: "Exporte su reporte salarial desde la pestaña Exportar. Esto documenta las violaciones con los cálculos — útil si consulta a un abogado laboral." },

  // Export tab
  exportReport: { en: "Export Wage Report", es: "Exportar Reporte Salarial" },
  exportDesc: { en: "Generate a report with shift logs,\nearnings summary, and violation details.", es: "Genere un reporte con registro de turnos,\nresumen de ganancias y detalles de violaciones." },
  generateReport: { en: "📄 GENERATE REPORT", es: "📄 GENERAR REPORTE" },

  // Onboarding
  welcome: { en: "Track your earnings. Detect wage theft.\nKnow your rights — backed by your state's law.", es: "Rastree sus ganancias. Detecte robo de salarios.\nConozca sus derechos — respaldado por la ley estatal." },
  howItWorks: { en: "HOW IT WORKS", es: "CÓMO FUNCIONA" },
  howSnap: { en: "Snap photos of receipts & pay stubs", es: "Tome fotos de recibos y talones de pago" },
  howSee: { en: "See your real earnings & best shifts", es: "Vea sus ganancias reales y mejores turnos" },
  howAlert: { en: "Get alerted to wage violations", es: "Reciba alertas de violaciones salariales" },
  howMisclass: { en: "Detect possible misclassification", es: "Detecte posible error de clasificación" },
  howExport: { en: "Export reports for legal action", es: "Exporte reportes para acción legal" },
  getStarted: { en: "GET STARTED →", es: "COMENZAR →" },
  continueBtn: { en: "CONTINUE →", es: "CONTINUAR →" },
  letsGo: { en: "LET'S GO 🚀", es: "¡VAMOS! 🚀" },
  langChoose: { en: "Choose your language", es: "Elija su idioma" },

  // Pay structure
  payStructure: { en: "PAY STRUCTURE", es: "ESTRUCTURA DE PAGO" },
  howPaid: { en: "How are you paid?", es: "¿Cómo le pagan?" },
  howPaidDesc: { en: "This determines which wage protections apply to you.", es: "Esto determina qué protecciones salariales le aplican." },
  payTipped: { en: "Tipped", es: "Con Propinas" },
  payTippedDesc: { en: "Tips are a big part of my pay", es: "Las propinas son gran parte de mi pago" },
  payHourly: { en: "Hourly", es: "Por Hora" },
  payHourlyDesc: { en: "Set hourly rate, no/minimal tips", es: "Tarifa por hora fija, sin/pocas propinas" },
  paySalary: { en: "Salaried", es: "Asalariado" },
  paySalaryDesc: { en: "Fixed weekly or monthly pay", es: "Pago fijo semanal o mensual" },

  // Legal classification
  classification: { en: "CLASSIFICATION", es: "CLASIFICACIÓN" },
  howClassified: { en: "How are you classified?", es: "¿Cómo está clasificado?" },
  classDesc: { en: "Your legal classification affects your rights. Check your pay stub or W-2/1099 if unsure.", es: "Su clasificación legal afecta sus derechos. Revise su talón de pago o W-2/1099 si no está seguro." },
  misclassWarning: { en: "⚠️ Misclassification is common — some employers label workers as \"independent contractors\" to avoid paying minimum wage, overtime, or benefits.", es: "⚠️ La clasificación errónea es común — algunos empleadores etiquetan a los trabajadores como \"contratistas independientes\" para evitar pagar salario mínimo, horas extras o beneficios." },
  classNonExempt: { en: "Non-Exempt (W-2)", es: "No Exento (W-2)" },
  classNonExemptDesc: { en: "Hourly employee, eligible for overtime", es: "Empleado por hora, elegible para horas extras" },
  classExempt: { en: "Exempt (W-2)", es: "Exento (W-2)" },
  classExemptDesc: { en: "Salaried, not eligible for overtime", es: "Asalariado, no elegible para horas extras" },
  classStatEmployee: { en: "Statutory Employee", es: "Empleado Estatutario" },
  classStatEmployeeDesc: { en: "W-2 but treated like independent for some taxes", es: "W-2 pero tratado como independiente para algunos impuestos" },
  classStatNonEmp: { en: "Statutory Non-Employee", es: "No Empleado Estatutario" },
  classStatNonEmpDesc: { en: "Real estate agents, direct sellers, etc.", es: "Agentes de bienes raíces, vendedores directos, etc." },
  classIC: { en: "Independent Contractor", es: "Contratista Independiente" },
  classICDesc: { en: "1099, set my own hours, use my own tools", es: "1099, establezco mis horarios, uso mis herramientas" },
  classUnsure: { en: "I'm Not Sure", es: "No Estoy Seguro" },
  classUnsureDesc: { en: "Help me figure out my classification", es: "Ayúdeme a determinar mi clasificación" },

  // Misclass quiz
  misclassCheck: { en: "MISCLASSIFICATION CHECK", es: "VERIFICACIÓN DE CLASIFICACIÓN" },
  classCheck: { en: "CLASSIFICATION CHECK", es: "VERIFICACIÓN DE CLASIFICACIÓN" },
  letsFigure: { en: "Let's figure this out", es: "Vamos a determinarlo" },
  letsCheck: { en: "Let's check your status", es: "Verifiquemos su estado" },
  quizDesc: { en: "Answer these questions about your day-to-day work. There are no wrong answers — this helps us flag potential issues.", es: "Responda estas preguntas sobre su trabajo diario. No hay respuestas incorrectas — esto nos ayuda a identificar posibles problemas." },
  yes: { en: "Yes", es: "Sí" },
  no: { en: "No", es: "No" },
  mq1: { en: "Does your employer set your work schedule?", es: "¿Su empleador establece su horario de trabajo?" },
  mq2: { en: "Does your employer provide your tools/equipment?", es: "¿Su empleador le proporciona herramientas/equipo?" },
  mq3: { en: "Can you work for other companies at the same time?", es: "¿Puede trabajar para otras empresas al mismo tiempo?" },
  mq4: { en: "Does your employer control how you do your work (not just what)?", es: "¿Su empleador controla cómo hace su trabajo (no solo qué)?" },
  mq5: { en: "Are you required to wear a uniform or follow a dress code?", es: "¿Se le requiere usar uniforme o seguir un código de vestimenta?" },
  mq6: { en: "Can your employer fire you at any time?", es: "¿Su empleador puede despedirlo en cualquier momento?" },
  highRisk: { en: "HIGH RISK", es: "ALTO RIESGO" },
  possibleRisk: { en: "POSSIBLE RISK", es: "POSIBLE RIESGO" },
  lowRisk: { en: "LOW RISK", es: "BAJO RIESGO" },
  misclassRiskLabel: { en: "Misclassification Risk", es: "Riesgo de Clasificación Errónea" },
  highRiskMsg: { en: "Based on your answers, your work arrangement has strong indicators of an employer-employee relationship. If you're classified as an independent contractor, you may be misclassified — which means you could be owed minimum wage protections, overtime, and benefits.", es: "Según sus respuestas, su arreglo laboral tiene fuertes indicadores de una relación empleador-empleado. Si está clasificado como contratista independiente, puede estar mal clasificado — lo que significa que podría tener derecho a protecciones de salario mínimo, horas extras y beneficios." },
  medRiskMsg: { en: "Your situation has some indicators of an employee relationship. Misclassification isn't certain, but it's worth monitoring. Keep tracking your hours and pay — the data will be valuable if questions arise.", es: "Su situación tiene algunos indicadores de una relación de empleo. La clasificación errónea no es segura, pero vale la pena monitorear. Siga rastreando sus horas y pago — los datos serán valiosos si surgen preguntas." },
  lowRiskMsg: { en: "Your work arrangement appears consistent with independent contractor status. You likely have genuine autonomy over how you work. Keep tracking your earnings for tax purposes.", es: "Su arreglo laboral parece consistente con el estado de contratista independiente. Probablemente tiene autonomía genuina sobre cómo trabaja. Siga rastreando sus ganancias para fines fiscales." },
  disclaimer: { en: "This is an informal screening tool, not legal advice. An employment attorney can provide a definitive assessment.", es: "Esta es una herramienta de evaluación informal, no asesoramiento legal. Un abogado laboral puede proporcionar una evaluación definitiva." },

  // Industry
  industryLabel: { en: "INDUSTRY", es: "INDUSTRIA" },
  whatIndustry: { en: "What industry?", es: "¿Qué industria?" },
  industryDesc: { en: "We'll tailor the experience to your work.", es: "Adaptaremos la experiencia a su trabajo." },
  indRestaurant: { en: "Restaurant / Bar", es: "Restaurante / Bar" },
  indHotel: { en: "Hotel / Hospitality", es: "Hotel / Hospitalidad" },
  indDelivery: { en: "Delivery / Rideshare", es: "Entrega / Transporte" },
  indSalon: { en: "Salon / Spa", es: "Salón / Spa" },
  indCasino: { en: "Casino / Gaming", es: "Casino / Juegos" },
  indOther: { en: "Other", es: "Otro" },

  // Goals
  goalsLabel: { en: "GOALS", es: "OBJETIVOS" },
  whatGoals: { en: "What are your goals?", es: "¿Cuáles son sus objetivos?" },
  selectAll: { en: "Select all that apply.", es: "Seleccione todos los que apliquen." },
  goalTrack: { en: "Track my earnings", es: "Rastrear mis ganancias" },
  goalTrackDesc: { en: "See what I actually make", es: "Ver cuánto realmente gano" },
  goalViolations: { en: "Check for wage theft", es: "Verificar robo de salarios" },
  goalViolationsDesc: { en: "Am I being paid correctly?", es: "¿Me están pagando correctamente?" },
  goalOptimize: { en: "Find my best shifts", es: "Encontrar mis mejores turnos" },
  goalOptimizeDesc: { en: "Work smarter, earn more", es: "Trabajar mejor, ganar más" },
  goalLegal: { en: "Build a legal case", es: "Construir un caso legal" },
  goalLegalDesc: { en: "Document everything for an attorney", es: "Documentar todo para un abogado" },

  // OCR field labels
  fieldDate: { en: "Date", es: "Fecha" },
  fieldCashTips: { en: "Cash Tips", es: "Propinas en Efectivo" },
  fieldCreditTips: { en: "Credit Tips", es: "Propinas con Tarjeta" },
  fieldTipOut: { en: "Tip Out", es: "Propina Compartida" },
  fieldPeriodStart: { en: "Period Start", es: "Inicio del Período" },
  fieldPeriodEnd: { en: "Period End", es: "Fin del Período" },
  fieldHours: { en: "Hours Worked", es: "Horas Trabajadas" },
  fieldRate: { en: "Hourly Rate", es: "Tarifa por Hora" },
  fieldGross: { en: "Gross Pay", es: "Pago Bruto" },
  fieldReportedTips: { en: "Reported Tips", es: "Propinas Reportadas" },
};

const MISCLASS_QUESTIONS_DATA = [
  { id: "schedule", tKey: "mq1", yesFlag: true },
  { id: "tools", tKey: "mq2", yesFlag: true },
  { id: "clients", tKey: "mq3", yesFlag: false },
  { id: "how", tKey: "mq4", yesFlag: true },
  { id: "uniform", tKey: "mq5", yesFlag: true },
  { id: "terminate", tKey: "mq6", yesFlag: true },
];

const STORAGE_KEY = "wageguardian_shifts";
const UPLOADS_KEY = "wageguardian_uploads";
const PROFILE_KEY = "wageguardian_profile";

// ─── Helpers ───
const fmt = (n) => "$" + Number(n).toFixed(2);
const toISO = (d) => {
  if (!d) return "";
  if (d.includes("/")) { const [m, day, y] = d.split("/"); return `${y}-${m.padStart(2,"0")}-${day.padStart(2,"0")}`; }
  return d;
};
const toDisplay = (d) => {
  if (!d) return "";
  if (d.includes("-")) { const [y, m, day] = d.split("-"); return `${parseInt(m)}/${parseInt(day)}/${y}`; }
  return d;
};
const getWeekStart = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
};
const groupByWeek = (shifts) => {
  const weeks = {};
  shifts.forEach((s) => { const ws = getWeekStart(s.date); if (!weeks[ws]) weeks[ws] = []; weeks[ws].push(s); });
  return weeks;
};

const ConfBadge = ({ score }) => {
  const color = score >= 0.9 ? "#22c55e" : score >= 0.8 ? "#f59e0b" : "#ef4444";
  const label = score >= 0.9 ? "High" : score >= 0.8 ? "Med" : "Low";
  return <span style={{ fontSize: 10, fontWeight: 700, color, border: `1px solid ${color}`, borderRadius: 4, padding: "1px 5px", marginLeft: 8 }}>{label} {Math.round(score * 100)}%</span>;
};

// ─── Simulated OCR ───
const simulateOCR = (docType, t) => {
  const today = new Date();
  const randomDay = new Date(today);
  randomDay.setDate(today.getDate() - Math.floor(Math.random() * 14));
  const dateStr = randomDay.toISOString().slice(0, 10);
  if (docType === "receipt") {
    const cashTips = (Math.random() * 80 + 20).toFixed(2);
    const creditTips = (Math.random() * 120 + 30).toFixed(2);
    const tipOut = (Math.random() * 25 + 5).toFixed(2);
    return {
      fields: [
        { key: "date", label: t("fieldDate"), value: dateStr, confidence: 0.95, type: "date" },
        { key: "cashTips", label: t("fieldCashTips"), value: cashTips, confidence: 0.82, type: "money" },
        { key: "creditTips", label: t("fieldCreditTips"), value: creditTips, confidence: 0.88, type: "money" },
        { key: "tipOut", label: t("fieldTipOut"), value: tipOut, confidence: 0.79, type: "money" },
      ],
      rawText: `TIP REPORT\n${dateStr}\n-----------\nCash Tips: $${cashTips}\nCC Tips: $${creditTips}\nTip Out: -$${tipOut}\n-----------\nNet Tips: $${(parseFloat(cashTips) + parseFloat(creditTips) - parseFloat(tipOut)).toFixed(2)}`,
    };
  } else {
    const hours = (Math.random() * 25 + 15).toFixed(1);
    const rate = (Math.random() * 3 + 12).toFixed(2);
    const gross = (parseFloat(hours) * parseFloat(rate)).toFixed(2);
    const tips = (Math.random() * 200 + 100).toFixed(2);
    return {
      fields: [
        { key: "payPeriodStart", label: t("fieldPeriodStart"), value: dateStr, confidence: 0.93, type: "date" },
        { key: "payPeriodEnd", label: t("fieldPeriodEnd"), value: new Date(new Date(dateStr).getTime() + 6 * 86400000).toISOString().slice(0, 10), confidence: 0.91, type: "date" },
        { key: "hoursWorked", label: t("fieldHours"), value: hours, confidence: 0.96, type: "number" },
        { key: "hourlyRate", label: t("fieldRate"), value: rate, confidence: 0.94, type: "money" },
        { key: "grossPay", label: t("fieldGross"), value: gross, confidence: 0.89, type: "money" },
        { key: "reportedTips", label: t("fieldReportedTips"), value: tips, confidence: 0.85, type: "money" },
      ],
      rawText: `PAY STUB\nPeriod: ${dateStr}\nHours: ${hours}\nRate: $${rate}/hr\nGross: $${gross}\nTips: $${tips}`,
    };
  }
};

// ─── Theme ───
const theme = {
  bg: "#0a0f0d", surface: "#111916", surfaceAlt: "#182420",
  border: "#1e3a2f", accent: "#22c55e", accentDim: "#166534",
  text: "#e8efe8", textDim: "#7a9b8a", danger: "#ef4444", warn: "#f59e0b",
};
const card = { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 16, marginBottom: 10 };
const btnStyle = (primary = true) => ({
  background: primary ? theme.accent : "transparent", color: primary ? "#000" : theme.accent,
  border: primary ? "none" : `1px solid ${theme.accent}`, borderRadius: 8, padding: "12px 20px",
  fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", letterSpacing: 0.5, fontFamily: "inherit",
});
const inputStyle = {
  background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8,
  padding: "10px 12px", color: theme.text, fontSize: 14, width: "100%", boxSizing: "border-box",
  outline: "none", fontFamily: "inherit",
};

// ═══════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════
export default function WageGuardian() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || null; } catch { return null; }
  });
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; }
  });

  const t = (key) => T[key]?.[lang || "en"] || T[key]?.en || key;

  useEffect(() => { if (lang) localStorage.setItem(LANG_KEY, lang); }, [lang]);

  // Language selection screen
  if (!lang) {
    return (
      <div style={{
        background: theme.bg, color: theme.text, minHeight: "100vh",
        fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
        maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
        <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 4, fontWeight: 700, marginBottom: 8 }}>WAGE</div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 32 }}>Guardian</div>
        <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 24 }}>Choose your language / Elija su idioma</div>
        <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 320 }}>
          <button onClick={() => setLang("en")} style={{ ...card, flex: 1, cursor: "pointer", textAlign: "center", padding: 20, border: `2px solid ${theme.border}` }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🇺🇸</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>English</div>
          </button>
          <button onClick={() => setLang("es")} style={{ ...card, flex: 1, cursor: "pointer", textAlign: "center", padding: 20, border: `2px solid ${theme.border}` }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🇲🇽</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Español</div>
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return <Onboarding t={t} lang={lang} setLang={setLang} onComplete={(p) => { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); setProfile(p); }} />;
  return <MainApp profile={profile} setProfile={setProfile} t={t} lang={lang} setLang={setLang} />;
}

// ═══════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════
function Onboarding({ t, lang, setLang, onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ payStructure: "", legalClass: "", industry: "", goals: [], misclassAnswers: {}, misclassRisk: null });

  const needsMisclassQuiz = profile.legalClass === "independent" || profile.legalClass === "unsure";
  const steps = ["welcome", "pay", "legal", ...(needsMisclassQuiz ? ["misclass"] : []), "industry", "goals"];
  const totalSteps = steps.length - 1;
  const cur = steps[step];

  const canAdvance = () => {
    if (cur === "welcome") return true;
    if (cur === "pay") return !!profile.payStructure;
    if (cur === "legal") return !!profile.legalClass;
    if (cur === "misclass") return Object.keys(profile.misclassAnswers).length === MISCLASS_QUESTIONS_DATA.length;
    if (cur === "industry") return !!profile.industry;
    if (cur === "goals") return profile.goals.length > 0;
    return false;
  };

  const getMisclassRisk = () => {
    let score = 0;
    MISCLASS_QUESTIONS_DATA.forEach((mq) => {
      const ans = profile.misclassAnswers[mq.id];
      if ((ans === "yes" && mq.yesFlag) || (ans === "no" && !mq.yesFlag)) score++;
    });
    const ratio = score / MISCLASS_QUESTIONS_DATA.length;
    if (ratio >= 0.67) return { level: "high", score, label: t("highRisk"), color: theme.danger, msg: t("highRiskMsg") };
    if (ratio >= 0.4) return { level: "medium", score, label: t("possibleRisk"), color: theme.warn, msg: t("medRiskMsg") };
    return { level: "low", score, label: t("lowRisk"), color: theme.accent, msg: t("lowRiskMsg") };
  };

  const stepNum = step > 0 ? steps.indexOf(cur) : 0;

  const payOptions = [
    { id: "tipped", icon: "🍽️", label: t("payTipped"), desc: t("payTippedDesc") },
    { id: "hourly", icon: "⏰", label: t("payHourly"), desc: t("payHourlyDesc") },
    { id: "salary", icon: "💼", label: t("paySalary"), desc: t("paySalaryDesc") },
  ];

  const legalOptions = [
    { id: "nonexempt", icon: "🛡️", label: t("classNonExempt"), desc: t("classNonExemptDesc") },
    { id: "exempt", icon: "📋", label: t("classExempt"), desc: t("classExemptDesc") },
    { id: "statutory_employee", icon: "📑", label: t("classStatEmployee"), desc: t("classStatEmployeeDesc") },
    { id: "statutory_nonemployee", icon: "📄", label: t("classStatNonEmp"), desc: t("classStatNonEmpDesc") },
    { id: "independent", icon: "🔓", label: t("classIC"), desc: t("classICDesc") },
    { id: "unsure", icon: "❓", label: t("classUnsure"), desc: t("classUnsureDesc") },
  ];

  const industries = [
    { id: "restaurant", icon: "🍽️", label: t("indRestaurant") },
    { id: "hotel", icon: "🏨", label: t("indHotel") },
    { id: "delivery", icon: "🚗", label: t("indDelivery") },
    { id: "salon", icon: "💇", label: t("indSalon") },
    { id: "casino", icon: "🎰", label: t("indCasino") },
    { id: "other", icon: "📋", label: t("indOther") },
  ];

  const goals = [
    { id: "track", icon: "📊", label: t("goalTrack"), desc: t("goalTrackDesc") },
    { id: "violations", icon: "🔍", label: t("goalViolations"), desc: t("goalViolationsDesc") },
    { id: "optimize", icon: "💡", label: t("goalOptimize"), desc: t("goalOptimizeDesc") },
    { id: "legal", icon: "⚖️", label: t("goalLegal"), desc: t("goalLegalDesc") },
  ];

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      {/* Language toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 16px 0" }}>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "4px 10px", color: theme.textDim, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
          {lang === "en" ? "🇲🇽 Español" : "🇺🇸 English"}
        </button>
      </div>

      {step > 0 && (
        <div style={{ padding: "8px 16px 0" }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= stepNum ? theme.accent : theme.surfaceAlt, opacity: i <= stepNum ? 1 : 0.3, transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}>

        {cur === "welcome" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 4, fontWeight: 700, marginBottom: 8 }}>{t("wage")}</div>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>{t("appName")}</div>
            <div style={{ fontSize: 13, color: theme.textDim, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 32px", whiteSpace: "pre-line" }}>{t("welcome")}</div>
            <div style={{ ...card, textAlign: "left", padding: 14, background: theme.surfaceAlt, border: `1px solid ${theme.accentDim}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, color: theme.accent }}>{t("howItWorks")}</div>
              {[["📸", t("howSnap")], ["📊", t("howSee")], ["⚠️", t("howAlert")], ["🔍", t("howMisclass")], ["⚖️", t("howExport")]].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < 4 ? 8 : 0 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span><span style={{ fontSize: 12 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {cur === "pay" && (
          <div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{t("payStructure")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{t("howPaid")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 20 }}>{t("howPaidDesc")}</div>
            {payOptions.map((o) => (
              <button key={o.id} onClick={() => setProfile({ ...profile, payStructure: o.id })} style={{ ...card, cursor: "pointer", display: "flex", gap: 14, alignItems: "center", textAlign: "left", width: "100%", border: profile.payStructure === o.id ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: profile.payStructure === o.id ? theme.surfaceAlt : theme.surface }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{o.icon}</div>
                <div><div style={{ fontSize: 14, fontWeight: 700 }}>{o.label}</div><div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>{o.desc}</div></div>
              </button>
            ))}
          </div>
        )}

        {cur === "legal" && (
          <div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{t("classification")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{t("howClassified")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 6, lineHeight: 1.5 }}>{t("classDesc")}</div>
            <div style={{ fontSize: 11, color: theme.warn, background: `${theme.warn}11`, border: `1px solid ${theme.warn}33`, borderRadius: 8, padding: 10, marginBottom: 16, lineHeight: 1.5 }}>{t("misclassWarning")}</div>
            {legalOptions.map((c) => (
              <button key={c.id} onClick={() => setProfile({ ...profile, legalClass: c.id, misclassAnswers: {}, misclassRisk: null })} style={{ ...card, cursor: "pointer", display: "flex", gap: 12, alignItems: "center", textAlign: "left", width: "100%", border: profile.legalClass === c.id ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: profile.legalClass === c.id ? theme.surfaceAlt : theme.surface, padding: 14 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                <div><div style={{ fontSize: 13, fontWeight: 700 }}>{c.label}</div><div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>{c.desc}</div></div>
              </button>
            ))}
          </div>
        )}

        {cur === "misclass" && (
          <div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{profile.legalClass === "unsure" ? t("classCheck") : t("misclassCheck")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{profile.legalClass === "unsure" ? t("letsFigure") : t("letsCheck")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 20, lineHeight: 1.5 }}>{t("quizDesc")}</div>
            {MISCLASS_QUESTIONS_DATA.map((mq, i) => {
              const answer = profile.misclassAnswers[mq.id];
              return (
                <div key={mq.id} style={{ ...card, padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}><span style={{ color: theme.accent, marginRight: 8 }}>{i + 1}.</span>{t(mq.tKey)}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["yes", "no"].map((val) => (
                      <button key={val} onClick={() => setProfile({ ...profile, misclassAnswers: { ...profile.misclassAnswers, [mq.id]: val } })} style={{ flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: answer === val ? `${theme.accent}22` : theme.surfaceAlt, border: answer === val ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, color: answer === val ? theme.text : theme.textDim }}>
                        {val === "yes" ? t("yes") : t("no")}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            {Object.keys(profile.misclassAnswers).length === MISCLASS_QUESTIONS_DATA.length && (() => {
              const risk = getMisclassRisk();
              return (
                <div style={{ ...card, marginTop: 8, border: `1px solid ${risk.color}44`, background: `${risk.color}08` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: risk.color, border: `1px solid ${risk.color}`, borderRadius: 4, padding: "2px 8px", letterSpacing: 1 }}>{risk.label.toUpperCase()}</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{t("misclassRiskLabel")}</div>
                  </div>
                  <div style={{ background: theme.surfaceAlt, borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ height: "100%", borderRadius: 8, width: `${(risk.score / MISCLASS_QUESTIONS_DATA.length) * 100}%`, background: `linear-gradient(90deg, ${theme.accent}, ${risk.color})` }} />
                  </div>
                  <div style={{ fontSize: 12, color: theme.textDim, lineHeight: 1.6 }}>{risk.msg}</div>
                  <div style={{ fontSize: 10, color: theme.textDim, marginTop: 10, borderTop: `1px solid ${theme.border}`, paddingTop: 8, fontStyle: "italic" }}>{t("disclaimer")}</div>
                </div>
              );
            })()}
          </div>
        )}

        {cur === "industry" && (
          <div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{t("industryLabel")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{t("whatIndustry")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 20 }}>{t("industryDesc")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {industries.map((ind) => (
                <button key={ind.id} onClick={() => setProfile({ ...profile, industry: ind.id })} style={{ ...card, cursor: "pointer", textAlign: "center", padding: 16, marginBottom: 0, border: profile.industry === ind.id ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: profile.industry === ind.id ? theme.surfaceAlt : theme.surface }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{ind.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{ind.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {cur === "goals" && (
          <div>
            <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{t("goalsLabel")}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{t("whatGoals")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 20 }}>{t("selectAll")}</div>
            {goals.map((g) => {
              const sel = profile.goals.includes(g.id);
              return (
                <button key={g.id} onClick={() => setProfile({ ...profile, goals: sel ? profile.goals.filter((x) => x !== g.id) : [...profile.goals, g.id] })} style={{ ...card, cursor: "pointer", display: "flex", gap: 14, alignItems: "center", textAlign: "left", width: "100%", border: sel ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: sel ? theme.surfaceAlt : theme.surface }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, border: sel ? `2px solid ${theme.accent}` : `2px solid ${theme.border}`, background: sel ? theme.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#000", fontWeight: 800 }}>{sel ? "✓" : ""}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>{g.icon} {g.label}</div><div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>{g.desc}</div></div>
                </button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: step > 0 ? "1fr 2fr" : "1fr", gap: 8 }}>
            {step > 0 && <button onClick={() => setStep(step - 1)} style={{ ...btnStyle(false), fontSize: 13, padding: "14px 20px" }}>{t("back")}</button>}
            <button onClick={() => {
              if (step < steps.length - 1) {
                if (cur === "misclass") setProfile((p) => ({ ...p, misclassRisk: getMisclassRisk() }));
                setStep(step + 1);
              } else {
                onComplete({ ...profile, employmentType: profile.payStructure, misclassRisk: needsMisclassQuiz ? getMisclassRisk() : null });
              }
            }} disabled={!canAdvance()} style={{ background: canAdvance() ? theme.accent : theme.surfaceAlt, color: canAdvance() ? "#000" : theme.textDim, border: "none", borderRadius: 8, padding: "14px 20px", fontSize: 13, fontWeight: 700, cursor: canAdvance() ? "pointer" : "default", fontFamily: "inherit", letterSpacing: 0.5 }}>
              {cur === "welcome" ? t("getStarted") : step === steps.length - 1 ? t("letsGo") : t("continueBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
function MainApp({ profile, setProfile, t, lang, setLang }) {
  const MIN_WAGE = AZ_WAGE.min;
  const TIPPED_MIN = AZ_WAGE.tippedMin;
  const isTipped = profile.payStructure === "tipped" || profile.employmentType === "tipped";

  const TABS = [
    { key: "Log", label: t("tabLog") }, { key: "Scan", label: t("tabScan") },
    { key: "Stats", label: t("tabStats") }, { key: "Alerts", label: t("tabAlerts") },
    { key: "Export", label: t("tabExport") },
  ];

  const [tab, setTab] = useState("Log");
  const [shifts, setShifts] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (s && s.length > 0) return s; } catch {}
    return [
      { id: 1, date: "2026-01-20", start: "11:00", end: "17:00", hours: 6, rate: TIPPED_MIN, tips: 58, source: "manual" },
      { id: 2, date: "2026-01-21", start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: 112.5, source: "manual" },
      { id: 3, date: "2026-01-22", start: "11:00", end: "16:00", hours: 5, rate: TIPPED_MIN, tips: 42, source: "scan" },
      { id: 4, date: "2026-01-23", start: "16:00", end: "23:30", hours: 7.5, rate: TIPPED_MIN, tips: 134, source: "manual" },
      { id: 5, date: "2026-01-24", start: "16:00", end: "00:00", hours: 8, rate: TIPPED_MIN, tips: 187.5, source: "scan" },
      { id: 6, date: "2026-01-25", start: "10:00", end: "17:00", hours: 7, rate: TIPPED_MIN, tips: 195, source: "manual" },
      { id: 7, date: "2026-01-27", start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: 98, source: "manual" },
      { id: 8, date: "2026-01-28", start: "11:00", end: "17:00", hours: 6, rate: TIPPED_MIN, tips: 51, source: "scan" },
      { id: 9, date: "2026-01-29", start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: 125, source: "manual" },
      { id: 10, date: "2026-01-30", start: "16:00", end: "00:30", hours: 8.5, rate: TIPPED_MIN, tips: 142, source: "manual" },
      { id: 11, date: "2026-01-31", start: "16:00", end: "01:00", hours: 9, rate: TIPPED_MIN, tips: 210, source: "scan" },
      { id: 12, date: "2026-02-01", start: "10:00", end: "18:00", hours: 8, rate: TIPPED_MIN, tips: 178, source: "manual" },
      { id: 13, date: "2026-02-03", start: "16:00", end: "22:00", hours: 6, rate: TIPPED_MIN, tips: 72, source: "manual" },
      { id: 14, date: "2026-02-04", start: "11:00", end: "16:00", hours: 5, rate: TIPPED_MIN - 0.65, tips: 28, source: "scan" },
      { id: 15, date: "2026-02-05", start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: 108, source: "manual" },
      { id: 16, date: "2026-02-06", start: "16:00", end: "01:00", hours: 9, rate: TIPPED_MIN, tips: 165, source: "manual" },
      { id: 17, date: "2026-02-07", start: "10:00", end: "18:00", hours: 8, rate: TIPPED_MIN, tips: 192, source: "scan" },
      { id: 18, date: "2026-02-09", start: "11:00", end: "16:00", hours: 5, rate: TIPPED_MIN, tips: 31, source: "manual" },
      { id: 19, date: "2026-02-10", start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: 119, source: "manual" },
      { id: 20, date: "2026-02-11", start: "11:00", end: "17:00", hours: 6, rate: TIPPED_MIN, tips: 55, source: "scan" },
      { id: 21, date: "2026-02-12", start: "16:00", end: "23:30", hours: 7.5, rate: TIPPED_MIN, tips: 148, source: "manual" },
      { id: 22, date: "2026-02-13", start: "16:00", end: "01:00", hours: 9, rate: TIPPED_MIN, tips: 225, source: "manual" },
      { id: 23, date: "2026-02-14", start: "10:00", end: "22:00", hours: 12, rate: TIPPED_MIN, tips: 310, source: "scan" },
    ];
  });
  const [uploads, setUploads] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem(UPLOADS_KEY)); if (s && s.length > 0) return s; } catch {} return [];
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(shifts)); }, [shifts]);
  useEffect(() => { localStorage.setItem(UPLOADS_KEY, JSON.stringify(uploads)); }, [uploads]);

  const [form, setForm] = useState({ date: "", start: "", end: "", rate: "", tips: "" });
  const addShift = () => {
    const { date, start, end, rate, tips } = form;
    if (!date || !start || !end || !rate) return;
    const isoDate = toISO(date);
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let hours = (eh + em / 60) - (sh + sm / 60);
    if (hours <= 0) hours += 24;
    setShifts((p) => [...p, { id: Date.now(), date: isoDate, start, end, hours: +hours.toFixed(2), rate: +rate, tips: +(tips || 0), source: "manual" }]);
    setForm({ date: "", start: "", end: "", rate: "", tips: "" });
  };

  // Scan state
  const [scanStep, setScanStep] = useState("choose");
  const [docType, setDocType] = useState("receipt");
  const [imagePreview, setImagePreview] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [scanProgress, setScanProgress] = useState(0);
  const fileRef = useRef(null);
  const handleFileSelect = (e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => { setImagePreview(ev.target.result); setScanStep("preview"); }; r.readAsDataURL(f); };
  const startScan = () => { setScanStep("scanning"); setScanProgress(0); const iv = setInterval(() => { setScanProgress((p) => { if (p >= 100) { clearInterval(iv); const res = simulateOCR(docType, t); setOcrResult(res); const init = {}; res.fields.forEach((f) => { init[f.key] = f.value; }); setEditedFields(init); setScanStep("results"); return 100; } return p + Math.random() * 15 + 5; }); }, 200); };
  const saveUpload = () => { setUploads((p) => [...p, { id: Date.now(), docType, fields: { ...editedFields }, timestamp: new Date().toISOString() }]); setScanStep("convert"); };
  const convertToShift = () => { const f = editedFields; if (docType === "receipt") { const tt = parseFloat(f.cashTips || 0) + parseFloat(f.creditTips || 0) - parseFloat(f.tipOut || 0); setShifts((p) => [...p, { id: Date.now(), date: f.date, start: "11:00", end: "19:00", hours: 8, rate: TIPPED_MIN, tips: +tt.toFixed(2), source: "scan" }]); } else { setShifts((p) => [...p, { id: Date.now(), date: f.payPeriodStart, start: "00:00", end: "00:00", hours: +parseFloat(f.hoursWorked).toFixed(2), rate: +parseFloat(f.hourlyRate).toFixed(2), tips: +parseFloat(f.reportedTips || 0).toFixed(2), source: "scan" }]); } resetScan(); };
  const resetScan = () => { setScanStep("choose"); setImagePreview(null); setOcrResult(null); setEditedFields({}); setScanProgress(0); };

  // Violations
  const weeks = groupByWeek(shifts);
  const violations = [];
  Object.entries(weeks).forEach(([ws, weekShifts]) => {
    const th = weekShifts.reduce((s, x) => s + x.hours, 0);
    const tw = weekShifts.reduce((s, x) => s + x.rate * x.hours, 0);
    const tt = weekShifts.reduce((s, x) => s + x.tips, 0);
    const er = th > 0 ? (tw + tt) / th : 0;
    if (er < MIN_WAGE && th > 0) violations.push({ type: "weekly", week: ws, totalHours: th, totalWages: tw, totalTips: tt, effectiveRate: er, owed: +((MIN_WAGE * th) - tw - tt).toFixed(2), shifts: weekShifts });
    if (isTipped) weekShifts.forEach((s) => { if (s.rate < TIPPED_MIN) violations.push({ type: "base", week: ws, shift: s, shortfall: +(TIPPED_MIN - s.rate).toFixed(2), owed: +((TIPPED_MIN - s.rate) * s.hours).toFixed(2) }); });
  });
  const totalOwed = violations.reduce((s, v) => s + (v.owed || 0), 0);

  // Stats
  const totalEarnings = shifts.reduce((s, x) => s + x.rate * x.hours + x.tips, 0);
  const totalHoursVal = shifts.reduce((s, x) => s + x.hours, 0);
  const totalTipsVal = shifts.reduce((s, x) => s + x.tips, 0);
  const avgHourly = totalHoursVal > 0 ? totalEarnings / totalHoursVal : 0;
  const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayStats = dayKeys.map((key, i) => {
    const ds = shifts.filter((s) => new Date(s.date + "T00:00:00").getDay() === i);
    const dt = ds.reduce((s, x) => s + x.tips, 0);
    return { name: t(key), count: ds.length, tips: dt, avgTips: ds.length > 0 ? dt / ds.length : 0 };
  });
  const bestDayData = dayStats.filter((d) => d.count > 0).sort((a, b) => b.avgTips - a.avgTips)[0];

  const legalOptions = [
    { id: "nonexempt", label: t("classNonExempt") }, { id: "exempt", label: t("classExempt") },
    { id: "statutory_employee", label: t("classStatEmployee") }, { id: "statutory_nonemployee", label: t("classStatNonEmp") },
    { id: "independent", label: t("classIC") }, { id: "unsure", label: t("classUnsure") },
  ];

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 10px", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 3, fontWeight: 700, marginBottom: 2 }}>{t("wage")}</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>{t("appName")}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: theme.textDim, letterSpacing: 1 }}>{t("azMinWage")}</div>
          <div style={{ color: theme.accent, fontSize: 16, fontWeight: 700 }}>{fmt(MIN_WAGE)}{t("perHour")}</div>
          {isTipped && <div style={{ fontSize: 9, color: theme.textDim }}>{t("tippedLabel")}: {fmt(TIPPED_MIN)}{t("perHour")}</div>}
        </div>
      </div>

      {/* Profile pills + lang toggle */}
      <div style={{ display: "flex", gap: 6, padding: "8px 16px", borderBottom: `1px solid ${theme.border}`, alignItems: "center", flexWrap: "wrap" }}>
        {[
          profile.payStructure === "tipped" ? `🍽️ ${t("payTipped")}` : profile.payStructure === "hourly" ? `⏰ ${t("payHourly")}` : `💼 ${t("paySalary")}`,
          legalOptions.find((c) => c.id === profile.legalClass)?.label, "Arizona",
        ].filter(Boolean).map((tag, i) => (
          <span key={i} style={{ fontSize: 10, color: theme.textDim, background: theme.surfaceAlt, padding: "3px 8px", borderRadius: 4, border: `1px solid ${theme.border}` }}>{tag}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 4, padding: "2px 6px", color: theme.textDim, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button onClick={() => { localStorage.removeItem(PROFILE_KEY); localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(UPLOADS_KEY); localStorage.removeItem(LANG_KEY); setProfile(null); }} style={{ fontSize: 10, color: theme.textDim, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, textDecoration: "underline" }}>
            {t("reset")}
          </button>
        </div>
      </div>

      {/* Misclass banner */}
      {profile.misclassRisk && profile.misclassRisk.level !== "low" && (
        <div style={{ margin: "0 16px", marginTop: 8, background: `${profile.misclassRisk.color}11`, border: `1px solid ${profile.misclassRisk.color}44`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: profile.misclassRisk.color, border: `1px solid ${profile.misclassRisk.color}`, borderRadius: 4, padding: "1px 6px", letterSpacing: 0.5, flexShrink: 0 }}>{profile.misclassRisk.label.toUpperCase()}</span>
          <span style={{ fontSize: 11, color: theme.textDim }}>{t("misclassBanner")}</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${theme.border}`, background: theme.surface }}>
        {TABS.map((tb) => (
          <button key={tb.key} onClick={() => setTab(tb.key)} style={{ flex: 1, padding: "10px 0", fontSize: 10, fontWeight: 700, letterSpacing: 1, cursor: "pointer", border: "none", background: tab === tb.key ? theme.bg : "transparent", color: tab === tb.key ? theme.accent : theme.textDim, borderBottom: tab === tb.key ? `2px solid ${theme.accent}` : "2px solid transparent", fontFamily: "inherit", position: "relative" }}>
            {tb.label}
            {tb.key === "Alerts" && violations.length > 0 && (
              <span style={{ position: "absolute", top: 4, right: "calc(50% - 22px)", background: theme.danger, color: "#fff", fontSize: 9, borderRadius: 8, padding: "1px 5px", fontWeight: 800 }}>{violations.length}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>

        {/* LOG */}
        {tab === "Log" && (
          <div>
            <div style={card}>
              <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>{t("logShift")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div><label style={{ fontSize: 10, color: theme.textDim, display: "block", marginBottom: 4 }}>{t("date")}</label><input type="text" placeholder={t("datePlaceholder")} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inputStyle} /></div>
                <div><label style={{ fontSize: 10, color: theme.textDim, display: "block", marginBottom: 4 }}>{t("rateLabel")}</label><input type="text" placeholder={TIPPED_MIN.toString()} value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} style={inputStyle} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div><label style={{ fontSize: 10, color: theme.textDim, display: "block", marginBottom: 4 }}>{t("startLabel")}</label><input type="text" placeholder="16:00" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} style={inputStyle} /></div>
                <div><label style={{ fontSize: 10, color: theme.textDim, display: "block", marginBottom: 4 }}>{t("endLabel")}</label><input type="text" placeholder="23:00" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} style={inputStyle} /></div>
              </div>
              {isTipped && <div style={{ marginBottom: 12 }}><label style={{ fontSize: 10, color: theme.textDim, display: "block", marginBottom: 4 }}>{t("tipsLabel")}</label><input type="text" placeholder="0.00" value={form.tips} onChange={(e) => setForm({ ...form, tips: e.target.value })} style={inputStyle} /></div>}
              <button onClick={addShift} style={btnStyle()}>{t("addShift")}</button>
              <button onClick={() => { const today = new Date().toISOString().slice(0, 10); setShifts((p) => [...p, { id: Date.now(), date: today, start: "16:00", end: "23:00", hours: 7, rate: TIPPED_MIN, tips: isTipped ? +(Math.random() * 150 + 40).toFixed(2) : 0, source: "manual" }]); }} style={{ ...btnStyle(false), marginTop: 8, fontSize: 12 }}>{t("quickAdd")}</button>
            </div>
            <div style={{ fontSize: 11, color: theme.textDim, letterSpacing: 2, marginBottom: 8, marginTop: 16, fontWeight: 700 }}>{t("recentShifts")} ({shifts.length})</div>
            {shifts.slice().reverse().slice(0, 10).map((s) => (
              <div key={s.id} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{toDisplay(s.date)}</div>
                  <div style={{ fontSize: 11, color: theme.textDim }}>
                    {s.hours}h @ {fmt(s.rate)}
                    {s.source === "scan" && <span style={{ color: theme.accent, marginLeft: 6, fontSize: 9, border: `1px solid ${theme.accentDim}`, borderRadius: 4, padding: "1px 4px" }}>{t("scanned")}</span>}
                    {s.rate < TIPPED_MIN && isTipped && <span style={{ color: theme.danger, marginLeft: 6, fontSize: 9, border: `1px solid ${theme.danger}44`, borderRadius: 4, padding: "1px 4px" }}>{t("lowRate")}</span>}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: theme.accent }}>{fmt(s.rate * s.hours + s.tips)}</div>
                  {isTipped && <div style={{ fontSize: 10, color: theme.textDim }}>{t("tips")}: {fmt(s.tips)}</div>}
                </div>
              </div>
            ))}
            {shifts.length === 0 && <div style={{ ...card, textAlign: "center", color: theme.textDim, padding: 32 }}><div style={{ fontSize: 28, marginBottom: 8 }}>📋</div><div style={{ fontSize: 12 }}>{t("noShifts")}</div></div>}
          </div>
        )}

        {/* SCAN */}
        {tab === "Scan" && (
          <div>
            {scanStep === "choose" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 20, marginTop: 8 }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📸</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t("scanDoc")}</div>
                  <div style={{ fontSize: 12, color: theme.textDim, lineHeight: 1.5, whiteSpace: "pre-line" }}>{t("scanDesc")}</div>
                </div>
                <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>{t("docType")}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {[{ id: "receipt", icon: "🧾", label: t("tipReceipt") }, { id: "paycheck", icon: "💰", label: t("payStub") }].map((d) => (
                    <button key={d.id} onClick={() => setDocType(d.id)} style={{ ...card, cursor: "pointer", textAlign: "center", padding: 16, marginBottom: 0, border: docType === d.id ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`, background: docType === d.id ? theme.surfaceAlt : theme.surface }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{d.icon}</div><div style={{ fontSize: 12, fontWeight: 700 }}>{d.label}</div>
                    </button>
                  ))}
                </div>
                <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFileSelect} style={{ display: "none" }} />
                <button onClick={() => fileRef.current?.click()} style={btnStyle()}>{t("takePhoto")}</button>
                <div style={{ textAlign: "center", fontSize: 10, color: theme.textDim, marginTop: 8 }}>{t("photosStay")}</div>
                {uploads.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>{t("uploadHistory")} ({uploads.length})</div>
                    {uploads.slice().reverse().slice(0, 5).map((u) => (
                      <div key={u.id} style={{ ...card, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><div style={{ fontSize: 12, fontWeight: 600 }}>{u.docType === "receipt" ? `🧾 ${t("tipReceipt")}` : `💰 ${t("payStub")}`}</div><div style={{ fontSize: 10, color: theme.textDim }}>{new Date(u.timestamp).toLocaleDateString()}</div></div>
                        <span style={{ fontSize: 10, color: theme.accent, border: `1px solid ${theme.accentDim}`, borderRadius: 4, padding: "2px 6px" }}>{t("saved")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {scanStep === "preview" && (
              <div>
                <div style={{ ...card, padding: 0, overflow: "hidden" }}><img src={imagePreview} alt="" style={{ width: "100%", maxHeight: 300, objectFit: "contain", display: "block", background: "#000" }} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                  <button onClick={resetScan} style={btnStyle(false)}>{t("back")}</button>
                  <button onClick={startScan} style={btnStyle()}>{t("scanNow")}</button>
                </div>
              </div>
            )}
            {scanStep === "scanning" && (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 24px" }}>
                  <div style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${theme.border}`, borderTopColor: theme.accent, animation: "spin 1s linear infinite" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{docType === "receipt" ? "🧾" : "💰"}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>{t("scanning")}</div>
                <div style={{ background: theme.surfaceAlt, borderRadius: 8, height: 8, overflow: "hidden", maxWidth: 240, margin: "0 auto" }}>
                  <div style={{ height: "100%", background: `linear-gradient(90deg, ${theme.accentDim}, ${theme.accent})`, borderRadius: 8, width: `${Math.min(scanProgress, 100)}%`, transition: "width 0.2s" }} />
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            {scanStep === "results" && ocrResult && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, fontWeight: 700 }}>{t("extractedData")}</div>
                  <span style={{ fontSize: 10, color: theme.accent, background: theme.surfaceAlt, padding: "3px 8px", borderRadius: 4, border: `1px solid ${theme.accentDim}` }}>✓ {ocrResult.fields.length} {t("fieldsFound")}</span>
                </div>
                <div style={{ ...card, background: "#000", fontFamily: "'Courier New', monospace", fontSize: 11, color: theme.accent, padding: 12, whiteSpace: "pre-wrap", lineHeight: 1.6, maxHeight: 120, overflow: "auto", border: `1px solid ${theme.accentDim}` }}>{ocrResult.rawText}</div>
                <div style={{ fontSize: 11, color: theme.textDim, letterSpacing: 1, marginBottom: 8, marginTop: 12, fontWeight: 600 }}>{t("verifyCorrect")}</div>
                {ocrResult.fields.map((field) => (
                  <div key={field.key} style={{ ...card, padding: 12, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 10, color: theme.textDim, fontWeight: 700, letterSpacing: 1 }}>{field.label.toUpperCase()}</label>
                      <ConfBadge score={field.confidence} />
                    </div>
                    <input type="text" value={editedFields[field.key] || ""} onChange={(e) => setEditedFields({ ...editedFields, [field.key]: e.target.value })} style={{ ...inputStyle, borderColor: field.confidence < 0.8 ? theme.warn : theme.border }} />
                    {field.confidence < 0.8 && <div style={{ fontSize: 10, color: theme.warn, marginTop: 4 }}>{t("lowConfidence")}</div>}
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
                  <button onClick={resetScan} style={btnStyle(false)}>{t("discard")}</button>
                  <button onClick={saveUpload} style={btnStyle()}>{t("confirm")}</button>
                </div>
              </div>
            )}
            {scanStep === "convert" && (
              <div style={{ textAlign: "center", paddingTop: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", background: theme.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t("docSaved")}</div>
                <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 24 }}>{t("convertQ")}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button onClick={resetScan} style={btnStyle(false)}>{t("skip")}</button>
                  <button onClick={convertToShift} style={btnStyle()}>{t("addAsShift")}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STATS */}
        {tab === "Stats" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: t("totalEarned"), val: fmt(totalEarnings) },
                { label: t("avgPerHour"), val: fmt(avgHourly) },
                { label: t("totalHours"), val: totalHoursVal.toFixed(1) + "h" },
                { label: isTipped ? t("totalTips") : t("shiftsLabel"), val: isTipped ? fmt(totalTipsVal) : shifts.length.toString() },
              ].map((s) => (
                <div key={s.label} style={{ ...card, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: theme.textDim, letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: theme.accent }}>{s.val}</div>
                </div>
              ))}
            </div>
            {isTipped && bestDayData && (
              <div style={{ ...card, border: `1px solid ${theme.accentDim}` }}>
                <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>{t("bestDay")}</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{bestDayData.name}</div>
                <div style={{ fontSize: 12, color: theme.textDim }}>{t("avgTips")} {fmt(bestDayData.avgTips)} {t("inTipsAcross")} {bestDayData.count} {t("shiftsWord")}</div>
              </div>
            )}
            {isTipped && shifts.length > 0 && (
              <div style={{ ...card, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>{t("tipsByDay")}</div>
                {(() => { const mx = Math.max(...dayStats.map((d) => d.avgTips), 1); return dayStats.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ width: 32, fontSize: 11, color: theme.textDim, fontWeight: 600 }}>{d.name}</div>
                    <div style={{ flex: 1, height: 16, background: theme.surfaceAlt, borderRadius: 4, marginRight: 8, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, width: `${d.count > 0 ? (d.avgTips / mx) * 100 : 0}%`, background: `linear-gradient(90deg, ${theme.accentDim}, ${theme.accent})`, minWidth: d.count > 0 ? 4 : 0 }} />
                    </div>
                    <div style={{ fontSize: 11, color: d.count > 0 ? theme.text : theme.textDim, width: 50, textAlign: "right" }}>{d.count > 0 ? fmt(d.avgTips) : "—"}</div>
                  </div>
                )); })()}
              </div>
            )}
            <div style={card}>
              <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>{t("dataSources")}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div><div style={{ fontSize: 20, fontWeight: 800 }}>{shifts.filter((s) => s.source === "manual").length}</div><div style={{ fontSize: 10, color: theme.textDim }}>{t("manual")}</div></div>
                <div><div style={{ fontSize: 20, fontWeight: 800, color: theme.accent }}>{shifts.filter((s) => s.source === "scan").length}</div><div style={{ fontSize: 10, color: theme.textDim }}>{t("scannedLabel")}</div></div>
                <div><div style={{ fontSize: 20, fontWeight: 800 }}>{uploads.length}</div><div style={{ fontSize: 10, color: theme.textDim }}>{t("uploads")}</div></div>
              </div>
            </div>
            {shifts.length === 0 && <div style={{ ...card, textAlign: "center", color: theme.textDim, padding: 32 }}><div style={{ fontSize: 12 }}>{t("logOrScan")}</div></div>}
          </div>
        )}

        {/* ALERTS */}
        {tab === "Alerts" && (
          <div>
            {violations.length === 0 ? (
              <div style={{ ...card, textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{t("noViolations")}</div>
                <div style={{ fontSize: 12, color: theme.textDim }}>{shifts.length === 0 ? t("startLogging") : `${shifts.length} ${t("allCompliant")}`}</div>
              </div>
            ) : (
              <div>
                <div style={{ ...card, background: "#1a0a0a", border: `1px solid ${theme.danger}44`, textAlign: "center", padding: 16 }}>
                  <div style={{ fontSize: 11, color: theme.danger, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>{t("violationsFound")}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: theme.danger }}>{violations.length}</div>
                  <div style={{ fontSize: 11, color: theme.textDim }}>{violations.length === 1 ? t("violationS") : t("violationsP")} {t("detected")}</div>
                  {totalOwed > 0 && <div style={{ fontSize: 20, fontWeight: 800, color: theme.danger, marginTop: 8 }}>{fmt(totalOwed)} {t("potentiallyOwed")}</div>}
                </div>
                {violations.filter((v) => v.type === "weekly").map((v, i) => (
                  <div key={"w" + i} style={{ ...card, borderColor: `${theme.danger}44` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div><div style={{ fontSize: 10, color: theme.danger, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>{t("weeklyShortfall")}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{t("weekOf")} {toDisplay(v.week)}</div></div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: theme.danger }}>{fmt(v.owed)}</div>
                    </div>
                    <div style={{ fontSize: 11, color: theme.textDim, lineHeight: 1.6 }}>{v.totalHours}h {t("worked")} · {t("effective")}: {fmt(v.effectiveRate)}{t("perHour")}<br />{t("required")}: {fmt(MIN_WAGE)}{t("perHour")} · {t("gap")}: {fmt(MIN_WAGE - v.effectiveRate)}{t("perHour")}</div>
                  </div>
                ))}
                {violations.filter((v) => v.type === "base").map((v, i) => (
                  <div key={"b" + i} style={{ ...card, borderColor: `${theme.warn}66` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div><div style={{ fontSize: 10, color: theme.warn, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>{t("baseRateViolation")}</div><div style={{ fontSize: 13, fontWeight: 700 }}>{toDisplay(v.shift.date)}</div></div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: theme.warn }}>{fmt(v.owed)}</div>
                    </div>
                    <div style={{ fontSize: 11, color: theme.textDim, lineHeight: 1.6 }}>{t("paid")}: {fmt(v.shift.rate)}{t("perHour")} · {t("tippedMinimum")}: {fmt(TIPPED_MIN)}{t("perHour")}<br />{t("shortfall")}: {fmt(v.shortfall)}{t("perHour")} × {v.shift.hours}h = {fmt(v.owed)}</div>
                  </div>
                ))}
                <div style={{ ...card, background: theme.surfaceAlt, marginTop: 8 }}>
                  <div style={{ fontSize: 11, lineHeight: 1.6 }}>📋 <strong>{t("whatToDo")}</strong> {t("whatToDoDesc")}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EXPORT */}
        {tab === "Export" && (
          <div style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{t("exportReport")}</div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 16, lineHeight: 1.5, whiteSpace: "pre-line" }}>{t("exportDesc")}</div>
            <button onClick={() => {
              const html = `<!DOCTYPE html><html><head><title>WageGuardian Report</title><style>body{font-family:monospace;max-width:700px;margin:0 auto;padding:24px;color:#111}h1{color:#166534;border-bottom:2px solid #22c55e;padding-bottom:8px}h2{color:#166534;margin-top:24px}table{width:100%;border-collapse:collapse;margin:12px 0}th,td{border:1px solid #ccc;padding:8px;text-align:left;font-size:13px}th{background:#f0fdf4}.violation{background:#fef2f2;border-left:3px solid #ef4444;padding:12px;margin:8px 0}.stat{display:inline-block;margin:0 16px 8px 0}.disclaimer{font-size:11px;color:#666;border-top:1px solid #ccc;padding-top:12px;margin-top:24px}</style></head><body><h1>WageGuardian — Wage Report</h1><p>Generated: ${new Date().toLocaleDateString()} · Arizona Min Wage: ${fmt(MIN_WAGE)}${t("perHour")}${isTipped ? ` · ${t("tippedLabel")}: ${fmt(TIPPED_MIN)}${t("perHour")}` : ""}</p><h2>Summary</h2><div class="stat"><strong>${t("shiftsLabel")}:</strong> ${shifts.length}</div><div class="stat"><strong>${t("totalHours")}:</strong> ${totalHoursVal.toFixed(1)}</div><div class="stat"><strong>${t("totalEarned")}:</strong> ${fmt(totalEarnings)}</div>${isTipped ? `<div class="stat"><strong>${t("totalTips")}:</strong> ${fmt(totalTipsVal)}</div>` : ""}${violations.length > 0 ? `<div class="violation"><strong>⚠ ${violations.length} ${violations.length === 1 ? t("violationS") : t("violationsP")} — ${fmt(totalOwed)} ${t("potentiallyOwed")}</strong></div>` : `<p>✅ ${t("noViolations")}</p>`}<h2>${t("recentShifts")}</h2><table><tr><th>${t("date")}</th><th>${t("totalHours")}</th><th>${t("rateLabel")}</th>${isTipped ? `<th>${t("tipsLabel")}</th>` : ""}<th>Total</th></tr>${shifts.map(s => `<tr><td>${toDisplay(s.date)}</td><td>${s.hours}</td><td>${fmt(s.rate)}</td>${isTipped ? `<td>${fmt(s.tips)}</td>` : ""}<td>${fmt(s.rate * s.hours + s.tips)}</td></tr>`).join("")}</table><p class="disclaimer">This report is generated by WageGuardian for documentation purposes only and does not constitute legal advice. Workers with potential wage violations should consult a licensed employment attorney in Arizona.</p></body></html>`;
              const w = window.open(); w.document.write(html); w.document.close(); w.print();
            }} style={btnStyle()} disabled={shifts.length === 0}>{t("generateReport")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
