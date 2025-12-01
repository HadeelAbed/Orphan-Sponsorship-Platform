// عناصر الفورم
const form = document.getElementById("orphan-form");
const tableBody = document.getElementById("orphans-table-body");
const messageBox = document.getElementById("admin-message");

let messageTimeout;
let pendingDeleteRow = null; // الصف اللي مستنين تأكيد حذفه

// دالة لعرض رسالة عادية (نجاح / خطأ / معلومات)
function showMessage(text, type = "info") {
  if (!messageBox) return;

  // نلغي أي تايمر قديم
  clearTimeout(messageTimeout);

  // نرجّع الكلاسات للوضع الأساسي
  messageBox.className = "admin-message";

  if (type === "error") messageBox.classList.add("admin-message--error");
  if (type === "success") messageBox.classList.add("admin-message--success");
  if (type === "info") messageBox.classList.add("admin-message--info");

  // المحتوى نص بسيط
  messageBox.innerHTML = `<div class="admin-message__text">${text}</div>`;
  messageBox.style.display = "block";

  // تختفي بعد 4 ثواني
  messageTimeout = setTimeout(() => {
    messageBox.style.display = "none";
    messageBox.innerHTML = "";
  }, 4000);
}

// دالة لعرض رسالة تأكيد الحذف مع زر "نعم، احذف" و "إلغاء" و X
function showDeleteConfirm(row) {
  if (!messageBox) return;
  pendingDeleteRow = row;

  clearTimeout(messageTimeout); // ما بدنا التوست القديم يخفي الرسالة الجديدة

  const name = row.children[1]?.textContent?.trim() || "هذا اليتيم";

  messageBox.className = "admin-message admin-message--confirm";
  messageBox.style.display = "block";

  messageBox.innerHTML = `
    <div class="admin-message__content">
      <div class="admin-message__text">
        هل أنتِ متأكدة أنك تريدين حذف بيانات اليتيم <strong>${name}</strong>؟
        هذا الإجراء لا يمكن التراجع عنه.
      </div>

      <div class="admin-message__actions">
        <button type="button"
                class="admin-message__btn admin-message__btn--danger"
                data-role="confirm-delete">
          نعم، احذف
        </button>

        <button type="button"
                class="admin-message__btn admin-message__btn--ghost"
                data-role="cancel-delete">
          إلغاء
        </button>
      </div>

      <button type="button"
              class="admin-message__close"
              aria-label="إغلاق"
              data-role="close-message">
        ×
      </button>
    </div>
  `;

  const confirmBtn = messageBox.querySelector('[data-role="confirm-delete"]');
  const cancelBtn = messageBox.querySelector('[data-role="cancel-delete"]');
  const closeBtn = messageBox.querySelector('[data-role="close-message"]');

  const hideConfirm = () => {
    messageBox.style.display = "none";
    messageBox.innerHTML = "";
    pendingDeleteRow = null;
  };

  if (confirmBtn) {
    confirmBtn.addEventListener(
      "click",
      () => {
        if (pendingDeleteRow) {
          pendingDeleteRow.remove();
          pendingDeleteRow = null;
        }
        hideConfirm();
        // بعد الحذف نعرض رسالة معلومات لطيفة
        showMessage("تم حذف بيانات اليتيم.", "info");
      },
      { once: true }
    );
  }

  [cancelBtn, closeBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", hideConfirm, { once: true });
  });
}

// ✅ إضافة يتيم جديد
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("full_name").value.trim();
  const age = document.getElementById("age").value.trim();
  const city = document.getElementById("city").value.trim();
  const education = document.getElementById("education_status").value;
  const health = document.getElementById("health_status").value;
  const social = document.getElementById("social_status").value;
  const sponsorship = document.getElementById("sponsorship_status").value;

  // تحقق من الحقول المطلوبة
  if (!fullName || !city || !education || !health || !social) {
    showMessage("رجاءً املئي جميع الحقول المطلوبة.", "error");
    return;
  }

  // صورة افتراضية حالياً
  const avatarUrl = "https://via.placeholder.com/80x80.png?text=Child";

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="p-4">
      <img src="${avatarUrl}" alt="${fullName}" class="admin-avatar" />
    </td>
    <td class="p-4">${fullName}</td>
    <td class="p-4">${age || "-"}</td>
    <td class="p-4">${social}</td>
    <td class="p-4">${health}</td>
    <td class="p-4">${education}</td>
    <td class="p-4">${city}</td>
    <td class="p-4">
      <span class="badge ${
        sponsorship === "مكفول" ? "badge--yes" : "badge--no"
      }">
        ${sponsorship}
      </span>
    </td>
    <td class="p-4">
      <div class="table-actions">
        <button type="button"
                class="table-btn table-btn--edit"
                data-action="edit">
          <span class="material-icons">edit</span>
          تعديل
        </button>
        <button type="button"
                class="table-btn table-btn--delete"
                data-action="delete">
          <span class="material-icons">delete</span>
          حذف
        </button>
      </div>
    </td>
  `;

  tableBody.appendChild(tr);

  // تصفير الفورم
  form.reset();
  document.getElementById("age").value = 0;

  // رسالة نجاح
  showMessage("تمت إضافة اليتيم بنجاح ✅", "success");
});

// ✅ التعامل مع أزرار التعديل/الحذف داخل الجدول
tableBody.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const row = btn.closest("tr");

  if (action === "delete") {
    // ما بنحذف مباشرة – بنعرض رسالة تأكيد
    showDeleteConfirm(row);
  }

  if (action === "edit") {
    const name = row.children[1]?.textContent?.trim() || "هذا اليتيم";
    showMessage(`ميزة التعديل غير مفعّلة حالياً (${name}).`, "info");
  }
});
