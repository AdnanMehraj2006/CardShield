// ===============================
// ELEMENT REFERENCES
// ===============================
const cardInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("expMonth");
const yearInput = document.getElementById("expYear");

const previewNumber = document.getElementById("cardNumberPreview");
const previewExpiry = document.getElementById("expiryPreview");
const networkLabel = document.getElementById("networkLabel");
const cardPreview = document.getElementById("cardPreview");
const cardTypeBadge = document.getElementById("cardTypeBadge");

const modal = document.getElementById("modalOverlay");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

// ===============================
// CARD TYPE DETECTION (GLOBAL)
// ===============================
function detectCardType(num) {
  // remove spaces
  num = num.replace(/\s/g, "");

  // ---- VISA ----
  if (/^4/.test(num)) return "VISA";

  // ---- MASTERCARD ----
  if (/^(5[1-5])/.test(num) || /^(2221|2720|2[3-6]|27[0-1])/.test(num))
    return "MASTERCARD";

  // ---- AMEX ----
  if (/^(34|37)/.test(num)) return "AMEX";

  // ---- RUPAY (IMPORTANT FIX) ----
  if (/^(508|60|65|81|82)/.test(num)) return "RUPAY";

  // ---- DISCOVER (AFTER RUPAY) ----
  if (/^(6011|644|645|646|647|648|649)/.test(num))
    return "DISCOVER";

  // ---- JCB ----
  if (/^35/.test(num)) return "JCB";

  // ---- DINERS ----
  if (/^(300|301|302|303|304|305|36|38)/.test(num))
    return "DINERS";

  return "UNKNOWN";
}

// ===============================
// FORMAT CARD NUMBER
// ===============================
cardInput.addEventListener("input", () => {
  let value = cardInput.value.replace(/\D/g, "").slice(0, 19);

  // format groups of 4
  let formatted = value.replace(/(.{4})/g, "$1 ").trim();
  cardInput.value = formatted;

  // preview
  previewNumber.innerHTML =
    formatted || "•••• &nbsp; •••• &nbsp; •••• &nbsp; ••••";

  // detect type
  let type = detectCardType(value);

  networkLabel.innerText = type !== "UNKNOWN" ? type : "——";

  // badge
  if (type !== "UNKNOWN") {
    cardTypeBadge.innerText = type;
    cardTypeBadge.classList.add("visible");
  } else {
    cardTypeBadge.classList.remove("visible");
  }

  // remove previous classes
  cardPreview.classList.remove(
    "visa-card",
    "mastercard-card",
    "amex-card",
    "rupay-card"
  );

  // apply theme
  if (type === "VISA") cardPreview.classList.add("visa-card");
  else if (type === "MASTERCARD") cardPreview.classList.add("mastercard-card");
  else if (type === "AMEX") cardPreview.classList.add("amex-card");
  else if (type === "RUPAY") cardPreview.classList.add("rupay-card");
});

// ===============================
// MONTH VALIDATION (01–12)
// ===============================
monthInput.addEventListener("input", () => {
  let val = monthInput.value.replace(/\D/g, "").slice(0, 2);

  if (val.length === 2) {
    let num = parseInt(val);
    if (num < 1) val = "01";
    if (num > 12) val = "12";

    // auto jump
    yearInput.focus();
  }

  monthInput.value = val;
  updateExpiry();
});

// ===============================
// YEAR VALIDATION
// ===============================
yearInput.addEventListener("input", () => {
  let val = yearInput.value.replace(/\D/g, "").slice(0, 2);
  yearInput.value = val;
  updateExpiry();
});

// ===============================
// UPDATE EXPIRY PREVIEW
// ===============================
function updateExpiry() {
  let m = monthInput.value || "MM";
  let y = yearInput.value || "YY";
  previewExpiry.innerText = `${m} / ${y}`;
}

// ===============================
// LUHN ALGORITHM
// ===============================
function luhnCheck(num) {
  let sum = 0;
  let alt = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let d = parseInt(num[i]);

    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }

    sum += d;
    alt = !alt;
  }

  return sum % 10 === 0;
}

// ===============================
// EXPIRY CHECK
// ===============================
function isExpired(m, y) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  return !(y > currentYear || (y === currentYear && m >= currentMonth));
}

// ===============================
// MODAL CONTROL
// ===============================
function showModal(type, title, message) {
  modal.classList.add("active");

  modalTitle.innerText = title;
  modalMessage.innerText = message;

  modalIcon.className = "modal-icon " + type;

  if (type === "success") modalIcon.innerHTML = "✔";
  if (type === "error") modalIcon.innerHTML = "✖";
  if (type === "warn") modalIcon.innerHTML = "!";
}

function closeModal(e) {
  if (e && e.target !== modal) return;
  modal.classList.remove("active");
}

// ===============================
// MAIN VALIDATION
// ===============================
function validateCard() {
  let num = cardInput.value.replace(/\s/g, "");
  let m = parseInt(monthInput.value);
  let y = parseInt(yearInput.value);
  let type = detectCardType(num);

  if (!num || isNaN(m) || isNaN(y)) {
    return showModal("warn", "Missing Details", "Please fill all fields.");
  }

  if (!luhnCheck(num)) {
    return showModal("error", "Invalid Card", "Card number is not valid.");
  }

  if (isExpired(m, y)) {
    return showModal(
      "warn",
      "Card Expired",
      `${type} card is expired.`
    );
  }

  showModal(
    "success",
    "Valid Card",
    `Your ${type} card is valid.`
  );
}