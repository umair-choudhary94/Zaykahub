function openMenuTab(tabName) {
    var menuContents = document.getElementsByClassName("menu-content");
    for (var i = 0; i < menuContents.length; i++) {
        menuContents[i].classList.remove("active");
    }

    var tabButtons = document.getElementsByClassName("menu-tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");

    var buttons = document.getElementsByClassName("menu-tab-btn");
    for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].getAttribute('onclick').includes(tabName)) {
            buttons[j].classList.add("active");
        }
    }
}

function createMenuItemHTML(item) {
    return `
      <div class="menu-item" data-id="${item.id || ''}">
        <img src="${item.img}" alt="${item.name}" class="menu-item-img" />
        <div>
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-price">${item.price}</div>
          <div class="menu-item-desc">${item.description}</div>
          
          <div class="quantity-controls">
            <button class="qty-btn minus-btn" onclick="decreaseQuantity(this)">−</button>
            <input type="number" class="item-qty" value="1" min="1" />
            <button class="qty-btn plus-btn" onclick="increaseQuantity(this)">+</button>
          </div>
  
          <button class="add-to-cart-btn" onclick="addToCart(this)">Add to Cart</button>
        </div>
      </div>`;
  }
  
  function addToCart(button) {
    const menuItem = button.closest('.menu-item');
    const id = menuItem.getAttribute('data-id');
    const name = menuItem.querySelector('.menu-item-name').textContent;
    const price = menuItem.querySelector('.menu-item-price').textContent;
    const img = menuItem.querySelector('.menu-item-img').getAttribute('src');
    const quantity = parseInt(menuItem.querySelector('.item-qty').value);
  
    const cartItem = {
      id,
      name,
      price,
      img,
      quantity
    };
  
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }
  
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert(`${name} added to cart!`);
  }
  

function increaseQuantity(button) {
    const input = button.parentElement.querySelector('.item-qty');
    input.value = parseInt(input.value) + 1;
  }
  
  function decreaseQuantity(button) {
    const input = button.parentElement.querySelector('.item-qty');
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  }
  

function loadMenuFromJSON() {
    fetch('js/menu.json') // Path to your JSON file
        .then(response => response.json())
        .then(data => {
            console.log('Executing')
        Object.keys(data.menu).forEach(category => {
            const menuContent = document.getElementById(category);
            if (menuContent) {
                data.menu[category].forEach(item => {
                    const html = createMenuItemHTML(item);
                    menuContent.innerHTML += html;
                });
            }
        });
        })
        .catch(error => {
            console.error("Error loading menu:", error);
        });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = function () {
    loadMenuFromJSON();
    openMenuTab("starters");
};
