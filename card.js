// ===============================
// ✅ SƏBƏT MƏNTİQİ (CART PAGE)
// ===============================

function renderCart() {
    const cartContainer = document.querySelector(".cart-left");
    const subtotalEl = document.getElementById("subtotal");
    const deliveryEl = document.getElementById("delivery");
    const totalEl = document.getElementById("total");
  
    if (!cartContainer || !subtotalEl || !deliveryEl || !totalEl) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
  
    let subtotal = 0;
    let delivery = cart.length > 0 ? 3 : 0;
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Səbət boşdur</p>";
      subtotalEl.textContent = "0 ₼";
      deliveryEl.textContent = "0 ₼";
      totalEl.textContent = "0 ₼";
      return;
    }
  
    cart.forEach((item, index) => {
      subtotal += item.price * item.qty;
  
      const div = document.createElement("div");
      div.classList.add("cart-item");
  
      div.innerHTML = `
        <img src="${item.img}" class="cart-img">
        <div class="item-info">
          <h3>${item.name}</h3>
          <div class="qty-area">
            <button class="qty-btn minus">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn plus">+</button>
          </div>
        </div>
        <div class="item-price">
          ${(item.price * item.qty).toFixed(2)} ₼
          <button class="remove-btn">Sil</button>
        </div>
      `;
  
      cartContainer.appendChild(div);
  
      div.querySelector(".plus").onclick = () => {
        cart[index].qty++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      };
  
      div.querySelector(".minus").onclick = () => {
        if (cart[index].qty > 1) {
          cart[index].qty--;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount(); // ✅ səbət sayını dərhal yenilə
          renderCart();
        }
      };
  
      div.querySelector(".remove-btn").onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      };
    });
  
    subtotalEl.textContent = subtotal.toFixed(2) + " ₼";
    deliveryEl.textContent = delivery.toFixed(2) + " ₼";
    totalEl.textContent = (subtotal + delivery).toFixed(2) + " ₼";
    
  }
  
  // ===============================
  // ✅ KUPON (aysel20 → 20%)
  // ===============================
  
  document.addEventListener("DOMContentLoaded", () => {
    const applyCouponBtn = document.getElementById("applyCoupon");
  
    if (applyCouponBtn) {
      applyCouponBtn.onclick = () => {
        const code = document.getElementById("couponInput").value.trim().toLowerCase();
        const subtotal = parseFloat(document.getElementById("subtotal").textContent);
        const delivery = parseFloat(document.getElementById("delivery").textContent);
        const message = document.getElementById("couponMessage");
        const totalEl = document.getElementById("total");
  
        if (code === "aysel20") {
          let newTotal = subtotal * 0.8 + delivery;
          totalEl.textContent = newTotal.toFixed(2) + " ₼";
          message.style.color = "green";
          message.textContent = "✔ 20% endirim tətbiq olundu!";
        } else {
          message.style.color = "red";
          message.textContent = "❌ Kupon düzgün deyil";
        }
      };
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {

    const checkoutBtn = document.querySelector(".checkout-btn");
    const checkoutPopup = document.getElementById("checkoutPopup");
    const closePopup = document.querySelector(".close-popup");
    const confirmOrder = document.querySelector(".confirm-order");
  
    // ❌ Səbət boşdursa checkout-u blokla
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = "0.6";
        checkoutBtn.style.cursor = "not-allowed";
      }
    }
  
    if (checkoutBtn && cart.length > 0) {
      checkoutBtn.addEventListener("click", () => {
        checkoutPopup.style.display = "flex";
      });
    }
  
    if (closePopup) {
      closePopup.addEventListener("click", () => {
        checkoutPopup.style.display = "none";
      });
    }
  
    // ➤ Sifarişi Tamamlama
    if (confirmOrder) {
      confirmOrder.addEventListener("click", () => {
  
        const name = document.getElementById("custName").value.trim();
        const phone = document.getElementById("custPhone").value.trim();
        const city = document.getElementById("city").value.trim();
        const street = document.getElementById("street").value.trim();
        const card = document.getElementById("cardNumber").value.trim();
        const exp = document.getElementById("cardExpiry").value.trim();
        const cvc = document.getElementById("cardCVC").value.trim();
  
        // Boşluq yoxlaması
        if (!name || !phone || !city || !street || !card || !exp || !cvc) {
          alert("❌ Xahiş edirik bütün məlumatları doldurun.");
          return;
        }
  
        alert("✅ Sifarişiniz uğurla tamamlandı!");
        localStorage.removeItem("cart");
        location.reload();
      });
    }
  });
  
  renderCart();
  // ===============================
// ✅ CHECKOUT (ÇATDIRILMA MƏLUMATLARI + KARTA KEÇİD)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.querySelector(".checkout-btn");
  const checkoutPopup = document.getElementById("checkoutPopup");
  const closePopup = document.querySelector(".close-popup");
  const confirmOrder = document.querySelector(".confirm-order");
  const paymentModal = document.getElementById("paymentModal");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      checkoutPopup.style.display = "flex";
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      checkoutPopup.style.display = "none";
    });
  }

  if (confirmOrder) {
    confirmOrder.addEventListener("click", () => {
      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const city = document.getElementById("city").value.trim();
      const street = document.getElementById("street").value.trim();

      if (!name || !phone || !city || !street) {
        alert("❌ Zəhmət olmasa çatdırılma məlumatlarını tam doldurun!");
        return;
      }

      checkoutPopup.style.display = "none";
      paymentModal.style.display = "flex";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const checkoutBtn = document.querySelector(".checkout-btn");
  const checkoutPopup = document.getElementById("checkoutPopup");
  const closePopup = document.querySelector(".close-popup");
  const confirmOrder = document.querySelector(".confirm-order");

  // ❌ Səbət boşdursa checkout-u blokla
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.6";
      checkoutBtn.style.cursor = "not-allowed";
    }
  }

  if (checkoutBtn && cart.length > 0) {
    checkoutBtn.addEventListener("click", () => {
      checkoutPopup.style.display = "flex";
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      checkoutPopup.style.display = "none";
    });
  }

  // ➤ Sifarişi Tamamlama
  if (confirmOrder) {
    confirmOrder.addEventListener("click", () => {

      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const city = document.getElementById("city").value.trim();
      const street = document.getElementById("street").value.trim();
      const card = document.getElementById("cardNumber").value.trim();
      const exp = document.getElementById("cardExpiry").value.trim();
      const cvc = document.getElementById("cardCVC").value.trim();

      // Boşluq yoxlaması
      if (!name || !phone || !city || !street || !card || !exp || !cvc) {
        alert("❌ Xahiş edirik bütün məlumatları doldurun.");
        return;
      }

      alert("✅ Sifarişiniz uğurla tamamlandı!");
      localStorage.removeItem("cart");
      location.reload();
    });
  }
});

  // ===============================
  // ✅ TRENDYOL TİPLİ SLİDER (OX + AUTO)
  // ===============================
  
  document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let index = 0;
    showSlide(index);
  
    if (slides.length === 0) return;
  
    function showSlide(i) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[i].classList.add("active");
    }
  
    window.nextSlide = function () {
      index++;
      if (index >= slides.length) index = 0;
      showSlide(index);
    };
  
    window.prevSlide = function () {
      index--;
      if (index < 0) index = slides.length - 1;
      showSlide(index);
    };
  
    // Avtomatik dəyişmə
    setInterval(() => {
      window.nextSlide();
    }, 4000);
  });
  // ===============================
// ✅ YUXARIDAKI SƏBƏT SAYINI CANLI YENİLƏ
// ===============================

function updateCartCount() {
    const cartCountEl = document.querySelector(".cart-count");
    if (!cartCountEl) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
  
    cart.forEach(item => {
      count += item.qty;
    });
  
    cartCountEl.textContent = count;
  }
  
  // Səhifə açılan kimi də yenilə
  updateCartCount();
  