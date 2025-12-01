// بيانات طلبات الكفالة (تقدري تعدليها براحتك)
const SPONSOR_REQUESTS = [
  {
    id: "r1",        // ID الخاص باليتيم
    orphanId: "layla",  // ID اليتيم في صفحة التفاصيل
    name: "ليلى أحمد",
    age: 8,
    date: "26.12.2023",
    status: "pending",
    color: "#fce7f3",
  },
  // أضف باقي البيانات...
];

// دالة لتوليد الكروت بناءً على البيانات
function createRequestCard(request) {
  const card = document.createElement("article");
  card.className = "request-card";
  card.dataset.status = request.status;

  // فحص لتفادي إظهار undefined
  const orphanAge = request.age ? request.age : "—"; 
  const orphanDate = request.date ? request.date : "—";

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
      <a href="orphan-details.html?id=${request.orphanId}" class="btn btn-primary orphan-btn">عرض التفاصيل</a>
    </div>
  `;

  return card;
}
