// ===============================
// Mobile Header Toggle JS Start
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".mobile_header_wrapper").forEach((wrapper) => {
    const menuIcon = wrapper.querySelector(".menuIcon");
    const crossIcon = wrapper.querySelector(".crossIcon");
    const mobileHeader = wrapper.querySelector(".mobile_header");
    const slideshow = wrapper.querySelector(".slideshowHeader");

    if (menuIcon && crossIcon && mobileHeader && slideshow) {
      menuIcon.addEventListener("click", function () {
        slideshow.classList.remove("hidden");
        mobileHeader.classList.add("active");
      });

      crossIcon.addEventListener("click", function () {
        slideshow.classList.add("hidden");
        mobileHeader.classList.remove("active");
      });
    }
  });
});
// ===============================
// Mobile Header Toggle JS End
// ===============================

// ===============================
// Popup JS Start
// ===============================
let plusDog = document.querySelectorAll(".plusDog");
let mainPopup = document.querySelectorAll(".main-popup");
let popupCross = document.querySelectorAll(".popupCross");
let overlay = document.querySelector(".popup-overlay");

plusDog.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    mainPopup.forEach((popup) => {
      popup.classList.remove("active");
    });

    mainPopup[index].classList.add("active");

    overlay.classList.add("active");

    document.body.classList.add("popup-open");
  });
});

function closePopup() {
  mainPopup.forEach((popup) => {
    popup.classList.remove("active");
  });

  overlay.classList.remove("active");

  document.body.classList.remove("popup-open");
}

popupCross.forEach((cross) => {
  cross.addEventListener("click", closePopup);
});
overlay.addEventListener("click", closePopup);

// ===============================
// Popup JS End
// ===============================

// ===============================
// Product Variant & Add To Cart JS Start
// ===============================
let allPopups = document.querySelectorAll(".main-popup");

allPopups.forEach((popup) => {
  let colorSwatch = popup.querySelectorAll(".option_button");
  let productSelect = popup.querySelector(".productSelect");
  let addToCartBtn = popup.querySelector(".button_bundle");

  let option1 = "";
  let option2 = "";
  let variantId = "";

  function updateCombination() {
    if (!option1 || !option2) return;

    let finalCombination = `${option2} / ${option1}`;

    let variantBox = popup.querySelectorAll(".variant_box");

    variantBox.forEach((variant) => {
      let variantValue = variant.getAttribute("productvariant");

      if (finalCombination.trim() === variantValue.trim()) {
        variantId = variant.getAttribute("productid");

        addToCartBtn.setAttribute("data-id", variantId);
      }
    });
  }

  colorSwatch.forEach((button) => {
    button.addEventListener("click", () => {
      colorSwatch.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      option1 = button.getAttribute("optionattr");

      updateCombination();
    });
  });

  if (productSelect) {
    productSelect.addEventListener("change", () => {
      option2 = productSelect.value;
      updateCombination();
    });
  }

  // ===============================
  // Add To Cart Functionality
  // ===============================
  addToCartBtn.addEventListener("click", () => {
    let mainProductId = addToCartBtn.getAttribute("data-id");

    if (!mainProductId) {
      alert("Please select variant");
      return;
    }

    let finalCombination = `${option2} / ${option1}`;

    let cartItems = [
      {
        id: mainProductId,
        quantity: 1,
      },
    ];

    if (finalCombination.trim() === "M / Black") {
      cartItems.push({
        id: 47971787440282,
        quantity: 1,
      });
    }

    // ===============================
    // Shopify AJAX Add To Cart
    // ===============================
    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "/cart";
      })
      .catch((error) => {
        console.log("Cart Error:", error);
      });
  });
});
// ===============================
// Product Variant & Add To Cart JS End
// ===============================
