# 💳 CardShield – Smart Card Validator

CardShield is a modern web-based application that validates credit and debit card numbers using the **Luhn Algorithm**, along with expiry date verification and card type detection.

It provides a clean, interactive UI that simulates real-world payment validation systems while ensuring all processing is done securely on the client side.

---

## 🚀 Features

* ✔ Luhn Algorithm-based validation
* ✔ Card type detection (Visa, RuPay, MasterCard, AmEx, etc.)
* ✔ Expiry date validation (MM/YY)
* ✔ Live card preview
* ✔ Interactive modal popup results
* ✔ Fully responsive design
* ✔ Client-side validation (no data stored or transmitted)

---

## 🧠 How It Works

1. User enters card number and expiry
2. JavaScript applies:

   * Luhn Algorithm
   * Card type detection
   * Expiry validation
3. Result is displayed via modal:

   * ✅ Valid Card
   * ❌ Invalid Card
   * ⚠ Expired Card

---

## 🛠 Tech Stack

* **HTML** – Structure
* **CSS** – Styling & responsive UI
* **JavaScript** – Validation logic

---

## 📂 Project Structure

```
CardShield/
│── index.html          # Main application
│── style.css           # UI styling
│── script.js           # Validation logic
│── documentation.html  # Project documentation page
```

---

## 🔐 Security Note

> This project uses **client-side validation only**.

* No data is sent to any server
* No card information is stored
* No real banking verification is performed

---

## ⚠ Limitations

* Cannot verify real card existence
* May accept mathematically valid but fake numbers
* No backend or API integration

---

## 🎯 Purpose

This project is built for:

* Learning card validation logic
* Understanding frontend validation systems
* Demonstrating UI/UX design in fintech-style apps

---

## 🔗 Live Demo

*https://visitcardshield.pages.dev*

---

## 📄 Documentation

Open `documentation.html` in the project to view full documentation.

---

## 👨‍💻 Author

**Adnan Mehraj**
B.Tech CSE Student | Cybersecurity Enthusiast

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
