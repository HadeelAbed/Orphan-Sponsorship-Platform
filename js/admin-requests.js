// تحديد عناصر الجدول والبحث
const searchInput = document.getElementById("request-search");
const tableBody = document.getElementById("requests-table-body");

// عناصر الإحصائيات
const totalSpan = document.getElementById("total-requests-count");
const pendingSpan = document.getElementById("pending-requests-count");
const approvedSpan = document.getElementById("approved-requests-count");
const rejectedSpan = document.getElementById("rejected-requests-count");

// حساب الإحصائيات من الصفوف
function updateStats() {
  if (!tableBody) return;

  const rows = Array.from(tableBody.querySelectorAll("tr"));

  let total = 0;
  let pending = 0;
  let approved = 0;
  let rejected = 0;

  rows.forEach((row) => {
    // لو مخفية بالبحث ما نحسبها في الإحصائية
    if (row.style.display === "none") return;

    total++;
    const status = row.dataset.status; // pending / approved / rejected

    if (status === "pending") pending++;
    if (status === "approved") approved++;
    if (status === "rejected") rejected++;
  });

  if (totalSpan) totalSpan.textContent = total;
  if (pendingSpan) pendingSpan.textContent = pending;
  if (approvedSpan) approvedSpan.textContent = approved;
  if (rejectedSpan) rejectedSpan.textContent = rejected;
}

// فلترة حسب البحث
function handleSearch() {
  if (!tableBody || !searchInput) return;

  const value = searchInput.value.trim().toLowerCase();
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    const match = text.includes(value);
    row.style.display = match ? "" : "none";
  });

  // بعد الفلترة نحدّث الأرقام
  updateStats();
}

// تهيئة السكربت
function initRequestsPage() {
  if (!tableBody) return;

  // أول ما تفتح الصفحة نحسب الإحصائيات
  updateStats();

  // ربط الفلترة بحقل البحث
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
}

// لو السكربت في <head> نستخدم DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRequestsPage);
} else {
  // لو السكربت في آخر <body> يشتغل مباشرة
  initRequestsPage();
}
