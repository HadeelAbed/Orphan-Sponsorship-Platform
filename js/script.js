document.addEventListener('DOMContentLoaded', function () {
  // بيانات الإحصائيات (يمكنك استبدالها ببيانات حقيقية)
  const totalOrphans = 1023;
  const pendingRequests = 15;
  const activeSponsorships = 258;

  // تحديث الإحصائيات
  document.getElementById('total-orphans').textContent = totalOrphans;
  document.getElementById('pending-requests').textContent = pendingRequests;
  document.getElementById('active-sponsorships').textContent = activeSponsorships;

  // وظائف الأزرار
  document.querySelector('.btn').addEventListener('click', function () {
    alert('تم إضافة يتيم جديد');
  });
});
