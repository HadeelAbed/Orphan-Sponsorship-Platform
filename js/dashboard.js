// بيانات طلبات الكفالة (تقدري تعدليها براحتك)
const SPONSOR_REQUESTS = [
  {
    id: "r1",
    orphanId: "layla", // عدليه حسب id اليتيم عندك
    name: "ليلى أحمد",
    age: 8,
    date: "26.12.2023",
    status: "pending", // pending | approved | cancelled
    color: "#fce7f3",
  },
  {
    id: "r2",
    orphanId: "mohammad",
    name: "محمد سعيد",
    age: 6,
    date: "15.09.2023",
    status: "approved",
    color: "#dbeafe",
  },
  {
    id: "r3",
    orphanId: "fatima",
    name: "فاطمة علي",
    age: 9,
    date: "31.05.2023",
    status: "cancelled",
    color: "#e9d5ff",
  },
  {
    id: "r4",
    orphanId: "yousef",
    name: "يوسف خالد",
    age: 4,
    date: "05.11.2022",
    status: "pending",
    color: "#fed7e2",
  },
  {
    id: "r5",
    orphanId: "noor",
    name: "نور حسن",
    age: 8,
    date: "23.07.2023",
    status: "approved",
    color: "#bbf7d0",
  },
  {
    id: "r6",
    orphanId: "amir",
    name: "أمير علي",
    age: 5,
    date: "28.07.2023",
    status: "approved",
    color: "#bbf7d0",
  },
];

// دالة لتوليد الكروت بناءً على البيانات
function createRequestCard(request) {
  const card = document.createElement("article");
  card.className = "request-card";
  card.dataset.status = request.status;
  card.dataset.name = request.name;

  // فحص لتفادي إظهار undefined
  const orphanAge = request.age ? request.age : "—"; // في حال كانت القيمة غير موجودة، نعرض "—"
  const orphanDate = request.date ? request.date : "—"; // في حال كانت القيمة غير موجودة، نعرض "—"

  card.innerHTML = `
    <div class="request-avatar" style="background-color:${request.color};"></div>
    <div class="request-info-main">
      <p class="request-name">${request.name}</p>
      <p class="request-meta">العمر: ${orphanAge} سنوات</p>
      <p class="request-meta">تاريخ الطلب: ${orphanDate}</p>
    </div>
    <span class="status-pill ${statusClass(request.status)}">
      ${statusLabel(request.status)}
    </span>
    <div class="request-actions">
      ${actionsMarkup(request)}
    </div>
  `;

  // ربط الأزرار
  const cancelBtn = card.querySelector("[data-action='cancel']");
  const approveBtn = card.querySelector("[data-action='approve']");
  const detailsBtn = card.querySelector("[data-action='details']");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () =>
      updateStatus(request.id, "cancelled")
    );
  }
  if (approveBtn) {
    approveBtn.addEventListener("click", () =>
      updateStatus(request.id, "approved")
    );
  }
  if (detailsBtn && request.orphanId) {
    detailsBtn.addEventListener("click", () => {
      window.location.href = `orphan-details.html?id=${request.orphanId}`;
    });
  }

  return card;
}

// تصنيف الحالة
function statusClass(status) {
  if (status === "approved") return "status--approved";
  if (status === "cancelled") return "status--cancelled";
  return "status--pending";
}

// تسمية الحالة
function statusLabel(status) {
  if (status === "approved") return "موافق عليه";
  if (status === "cancelled") return "ملغي";
  return "قيد المراجعة";
}

// توليد الأزرار المناسبة بناءً على حالة الطلب
function actionsMarkup(request) {
  if (request.status === "approved" || request.status === "cancelled") {
    return `
      <a href="orphan-details.html?id=${request.orphanId}" class="btn btn-outline">
        عرض التفاصيل
      </a>
    `;
  }

  // للحالات pending
  return `
    <a href="orphan-details.html?id=${request.orphanId}" class="btn btn-primary orphan-btn">
      عرض التفاصيل
    </a>
  `;
}


// دالة لعرض ملخص البيانات
function renderSummary(data) {
  const total = data.length;
  const pending = data.filter((r) => r.status === "pending").length;
  const approved = data.filter((r) => r.status === "approved").length;
  const cancelled = data.filter((r) => r.status === "cancelled").length;

  document.getElementById("summary-total").textContent = total;
  document.getElementById("summary-pending").textContent = pending;
  document.getElementById("summary-approved").textContent = approved;
  document.getElementById("summary-cancelled").textContent = cancelled;
}

// دالة لعرض الطلبات في الجريد
function renderRequests(data) {
  const grid = document.getElementById("requests-grid");
  grid.innerHTML = "";
  data.forEach((req) => {
    grid.appendChild(createRequestCard(req));
  });
}

// دالة للبحث والفلترة
function applyFilters() {
  const searchValue = document
    .getElementById("requests-search")
    .value.trim()
    .toLowerCase();
  const statusFilter = document.getElementById("status-filter").value;

  const filtered = SPONSOR_REQUESTS.filter((req) => {
    const matchesName = req.name.toLowerCase().includes(searchValue);
    const matchesStatus =
      statusFilter === "all" ? true : req.status === statusFilter;
    return matchesName && matchesStatus;
  });

  renderRequests(filtered);
  renderSummary(filtered);
}

// تحديث حالة الطلب داخل المصفوفة وإعادة الرسم
function updateStatus(requestId, newStatus) {
  const request = SPONSOR_REQUESTS.find((r) => r.id === requestId);
  if (!request) return;
  request.status = newStatus;
  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  // أول رسم
  renderRequests(SPONSOR_REQUESTS);
  renderSummary(SPONSOR_REQUESTS);

  // فلترة
  document
    .getElementById("requests-search")
    .addEventListener("input", applyFilters);
  document
    .getElementById("status-filter")
    .addEventListener("change", applyFilters);
});
