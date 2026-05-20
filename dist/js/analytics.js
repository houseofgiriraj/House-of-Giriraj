// Giriraj Jewellery — Analytics & Lead Tracking
// Tracks WhatsApp clicks, page views, product views, form submissions
// Sends to Google Sheets webhook + local storage fallback

// Set your Google Apps Script Web App URL here:
const WEBHOOK_URL = "";

/* ---- Lead Tracking (WhatsApp funnel) ---- */
function trackLead(data) {
  const payload = {
    type: "whatsapp_click",
    timestamp: data.timestamp || new Date().toISOString(),
    name: data.name || "Guest",
    intent: data.intent || "Unknown",
    source: data.source || "Unknown",
    product: data.product || "",
    category: data.category || "",
    device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
    page: window.location.pathname,
  };

  if (WEBHOOK_URL) sendToWebhook(payload);

  if (typeof gtag !== "undefined") {
    gtag("event", "whatsapp_click", {
      event_category: "conversion",
      event_label: payload.intent,
      value: 1,
    });
  }

  saveToLocal(payload);
}

/* ---- Page View Tracking ---- */
function trackPageView() {
  const payload = {
    type: "page_view",
    page: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
    device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
  };

  if (WEBHOOK_URL) sendToWebhook(payload);
  if (typeof gtag !== "undefined") {
    gtag("config", "GA_MEASUREMENT_ID", {
      page_path: payload.page,
      page_title: payload.title,
    });
  }
}

/* ---- Product View Tracking ---- */
function trackProductView(productId) {
  const payload = {
    type: "product_view",
    product: productId,
    timestamp: new Date().toISOString(),
    device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
    page: window.location.pathname,
  };

  if (WEBHOOK_URL) sendToWebhook(payload);
  if (typeof gtag !== "undefined") {
    gtag("event", "product_view", {
      event_category: "engagement",
      event_label: productId,
    });
  }
}

/* ---- Form Submission Tracking ---- */
function trackFormSubmit(formType, data) {
  const payload = {
    type: "form_submit",
    form: formType,
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    timestamp: new Date().toISOString(),
    device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
    page: window.location.pathname,
  };

  if (WEBHOOK_URL) sendToWebhook(payload);
  if (typeof gtag !== "undefined") {
    gtag("event", "form_submit", {
      event_category: "conversion",
      event_label: formType,
    });
  }

  saveToLocal(payload);
}

/* ---- Send to Google Sheets Webhook ---- */
function sendToWebhook(data) {
  if (!WEBHOOK_URL) return;

  fetch(WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

/* ---- Local Storage Fallback ---- */
function saveToLocal(data) {
  try {
    const leads = JSON.parse(localStorage.getItem("giriraj_leads") || "[]");
    leads.push(data);
    if (leads.length > 100) leads.splice(0, leads.length - 100);
    localStorage.setItem("giriraj_leads", JSON.stringify(leads));
  } catch (e) {}
}

/* ---- Get Local Leads ---- */
function getLocalLeads() {
  try {
    return JSON.parse(localStorage.getItem("giriraj_leads") || "[]");
  } catch (e) {
    return [];
  }
}

/* ---- Clear Local Leads ---- */
function clearLocalLeads() {
  localStorage.removeItem("giriraj_leads");
}

/* ---- Auto-track form submissions ---- */
function initFormTracking() {
  // Bespoke form
  const bespokeForm = document.getElementById("bespoke-form");
  if (bespokeForm) {
    bespokeForm.addEventListener("submit", function () {
      const inputs = this.querySelectorAll("input, textarea, select");
      const data = {};
      inputs.forEach((el) => {
        if (el.name) data[el.name] = el.value;
      });
      trackFormSubmit("bespoke", data);
    });
  }

  // Appointment form (contact page)
  const appointmentForm = document.getElementById("appointment-form");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function () {
      const inputs = this.querySelectorAll("input, textarea, select");
      const data = {};
      inputs.forEach((el) => {
        if (el.name) data[el.name] = el.value;
      });
      trackFormSubmit("appointment", data);
    });
  }
}

/* ---- Init on page load ---- */
document.addEventListener("DOMContentLoaded", () => {
  trackPageView();

  // Track product views
  if (window.location.pathname.includes("product.html")) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (productId) trackProductView(productId);
  }

  // Hook into forms
  initFormTracking();
});

/* ---- Expose to global scope ---- */
window.trackLead = trackLead;
window.trackPageView = trackPageView;
window.trackProductView = trackProductView;
window.trackFormSubmit = trackFormSubmit;
window.getLocalLeads = getLocalLeads;
window.clearLocalLeads = clearLocalLeads;
