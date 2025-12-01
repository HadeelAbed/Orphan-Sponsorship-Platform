// js/auth.js

// المفتاح المستخدم في localStorage
const AUTH_KEY = "kafaltyCurrentUser";

// حفظ المستخدم الحالي
function saveUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// جلب المستخدم الحالي
function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// تسجيل خروج
function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

// تسجيل دخول للكفيل (نقبل أي إيميل وباسورد للمشروع التجريبي)
function loginSponsor(email) {
  const user = {
    role: "sponsor",
    email,
  };
  saveUser(user);
  window.location.href = "sponsor-dashboard.html";
}

// تسجيل دخول للأدمن (هنا نحط بيانات ثابتة)
function loginAdmin(email, password) {
  const ADMIN_EMAIL = "admin@kafalty.com";
  const ADMIN_PASSWORD = "123456";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const user = {
      role: "admin",
      email,
    };
    saveUser(user);
    window.location.href = "admin-orphans.html";
  } else {
    showAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
}

// دالة تعرض رسالة خطأ في صفحة اللوجن
function showAuthError(message) {
  const errorBox = document.getElementById("auth-error");
  if (!errorBox) {
    alert(message); // احتياط لو ما في ديف
    return;
  }
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

// حماية الصفحات (جارِد)
function requireRole(role) {
  const user = getCurrentUser();

  if (!user || user.role !== role) {
    // ممكن لاحقاً نخزن رسالة في localStorage
    window.location.href = "login.html";
  }
}
