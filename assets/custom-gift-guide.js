// popup Module Javascript
// let plusDog = document.querySelectorAll(".plusDog");
// let main_popup = document.querySelectorAll(".main-popup");
// let popupCross = document.querySelectorAll(".popupCross");

// plusDog.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     main_popup.forEach((popup) => {
//       popup.classList.remove("active");
//     });

//     main_popup[index].classList.add("active");
//   });
// });

// popupCross.forEach((cross) => {
//   cross.addEventListener("click", () => {
//     main_popup.forEach((popup) => {
//       popup.classList.remove("active");
//     });
//   });
// });

//Variant Javascript
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

    console.log("finalCombination:", finalCombination);

    let variant_box = popup.querySelectorAll(".variant_box");

    variant_box.forEach((variant) => {
      let variantValue = variant.getAttribute("productvariant");

      if (finalCombination.trim() === variantValue.trim()) {
        variantId = variant.getAttribute("productid");

        console.log("Matched Variant ID:", variantId);

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

  // Add To Cart

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

    // FREE GIFT CONDITION
    if (finalCombination.trim() === "M / Black") {
      cartItems.push({
        id: 47971787440282,
        quantity: 1,
      });

      console.log("Free gift added");
    }

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
        console.log("Added to cart:", data);

        window.location.href = "/cart";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});

// popup
let plusDog = document.querySelectorAll(".plusDog");
let main_popup = document.querySelectorAll(".main-popup");
let popupCross = document.querySelectorAll(".popupCross");
let overlay = document.querySelector(".popup-overlay");

// Open popup
plusDog.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    main_popup.forEach((popup) => {
      popup.classList.remove("active");
    });

    main_popup[index].classList.add("active");
    overlay.classList.add("active");

    // Body scroll stop
    document.body.classList.add("popup-open");
  });
});

// Close popup
function closePopup() {
  main_popup.forEach((popup) => {
    popup.classList.remove("active");
  });

  overlay.classList.remove("active");

  // Body scroll start
  document.body.classList.remove("popup-open");
}

popupCross.forEach((cross) => {
  cross.addEventListener("click", closePopup);
});

overlay.addEventListener("click", closePopup);
