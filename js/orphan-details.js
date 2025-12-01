// قراءة الـ id من رابط الصفحة
function getOrphanIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");  // إرجاع قيمة id من الرابط
}

// دالة لملء التفاصيل بناءً على بيانات اليتيم
function fillOrphanDetails(orphan) {
  document.getElementById("orphan-image").src = orphan.image;
  document.getElementById("orphan-image").alt = `صورة ${orphan.name}`;

  document.getElementById("orphan-name").textContent = orphan.name;
  document.getElementById("orphan-age").textContent = orphan.age;
  document.getElementById("orphan-city").textContent = orphan.city;
  document.getElementById("orphan-nationality").textContent = orphan.nationality;

  // الحقول الاجتماعية
  document.getElementById("social-family").textContent = orphan.social.family || "—";
  document.getElementById("social-siblings").textContent = orphan.social.siblings || "—";
  document.getElementById("social-hobbies").textContent = orphan.social.hobbies || "—";
  document.getElementById("social-interests").textContent = orphan.social.interests || "—";

  // الحقول الصحية
  document.getElementById("health-general").textContent = orphan.health.general || "—";
  document.getElementById("health-chronic").textContent = orphan.health.chronic || "—";
  document.getElementById("health-allergy").textContent = orphan.health.allergy || "—";
  document.getElementById("health-special").textContent = orphan.health.special || "—";

  // الحقول التعليمية
  document.getElementById("edu-level").textContent = orphan.education.level || "—";
  document.getElementById("edu-grade").textContent = orphan.education.grade || "—";
  document.getElementById("edu-school").textContent = orphan.education.school || "—";
  document.getElementById("edu-average").textContent = orphan.education.average || "—";
}

// تحميل بيانات اليتيم عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
  const id = getOrphanIdFromUrl();  // استخراج id من الرابط

  // التأكد من وجود اليتيم في بيانات الأيتام
  if (!id || !ORPHANS_DATA[id]) {
    const wrapper = document.querySelector(".details-wrapper");
    wrapper.innerHTML = '<p style="text-align:center; padding:2rem;">اليتيم المطلوب غير موجود.</p>';
    return;
  }

  const orphan = ORPHANS_DATA[id];  // العثور على اليتيم بناءً على id
  fillOrphanDetails(orphan);  // تعبئة البيانات في الصفحة

  const sponsorLink = document.getElementById("sponsor-link");
  if (sponsorLink) {
    sponsorLink.href = `sponsorship-form.html?id=${orphan.id}`;  // توجيه رابط الكفالة
  }
});
function getOrphanIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function fillOrphanDetails(orphan) {
  document.getElementById("orphan-image").src = orphan.image;
  document.getElementById("orphan-name").textContent = orphan.name;
  document.getElementById("orphan-age").textContent = orphan.age;
  document.getElementById("orphan-city").textContent = orphan.city;
  document.getElementById("orphan-nationality").textContent = orphan.nationality;

  document.getElementById("social-family").textContent = orphan.social.family || "—";
}

document.addEventListener("DOMContentLoaded", function () {
  const id = getOrphanIdFromUrl();
  if (!id || !ORPHANS_DATA[id]) {
    document.querySelector(".details-wrapper").innerHTML =
      "<p>اليتيم المطلوب غير موجود.</p>";
    return;
  }

  const orphan = ORPHANS_DATA[id];
  fillOrphanDetails(orphan);
});
