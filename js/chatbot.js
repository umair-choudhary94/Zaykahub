document.addEventListener("DOMContentLoaded", () => {
    // Menu data
    const menuData = {
      menu: {
        starters: [
          {
            id: 1,
            name: "Garlic Bread",
            price: 5.99,
            description: "Freshly baked bread with garlic butter and herbs",
            image:
              "https://www.allrecipes.com/thmb/sueXmRXgK-S27uRzTrJuGb-_Smc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/216077-garlic-bread-spread-step-beauty-4x3-BP-3169-ef03a4a12d8c46e196055555be5b8d79.jpg",
          },
          {
            id: 2,
            name: "Bruschetta",
            price: 7.99,
            description: "Toasted bread topped with tomatoes, basil, and olive oil",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            name: "Mozzarella Sticks",
            price: 8.99,
            description: "Breaded mozzarella with marinara sauce",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 4,
            name: "Soup of the Day",
            price: 6.99,
            description: "Ask your server for today's special soup",
            image: "https://via.placeholder.com/150",
          },
        ],
        mains: [
          {
            id: 5,
            name: "Grilled Salmon",
            price: 24.99,
            description: "Fresh Atlantic salmon with lemon butter sauce and vegetables",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 6,
            name: "Chicken Alfredo",
            price: 18.99,
            description: "Fettuccine pasta with creamy alfredo sauce and grilled chicken",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 7,
            name: "Beef Steak",
            price: 29.99,
            description: "10oz ribeye steak with mashed potatoes and seasonal vegetables",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 8,
            name: "Vegetable Stir Fry",
            price: 16.99,
            description: "Mixed vegetables stir-fried with tofu in a savory sauce",
            image: "https://via.placeholder.com/150",
          },
        ],
        desserts: [
          {
            id: 9,
            name: "Chocolate Cake",
            price: 8.99,
            description: "Rich chocolate cake with vanilla ice cream",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 10,
            name: "Cheesecake",
            price: 7.99,
            description: "New York style cheesecake with berry compote",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 11,
            name: "Apple Pie",
            price: 6.99,
            description: "Homemade apple pie with cinnamon and caramel",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 12,
            name: "Ice Cream Sundae",
            price: 5.99,
            description: "Three scoops of ice cream with toppings",
            image: "https://via.placeholder.com/150",
          },
        ],
        drinks: [
          {
            id: 13,
            name: "Soft Drinks",
            price: 2.99,
            description: "Coke, Sprite, Fanta, Dr. Pepper",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 14,
            name: "Iced Tea",
            price: 3.5,
            description: "Sweet or unsweet with lemon",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 15,
            name: "Coffee",
            price: 3.99,
            description: "Regular or decaf with cream and sugar",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 16,
            name: "House Wine",
            price: 7.99,
            description: "Red or white wine by the glass",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
    }
  
    // DOM Elements
    const chatButton = document.getElementById("chatButton")
    const chatBox = document.getElementById("chatBox")
    const closeChat = document.getElementById("closeChat")
    const chatMessages = document.getElementById("chatMessages")
    const userInput = document.getElementById("userInput")
    const sendButton = document.getElementById("sendButton")
  
    // Toggle chat box
    chatButton.addEventListener("click", () => {
      chatBox.classList.add("active")
    })
  
    closeChat.addEventListener("click", () => {
      chatBox.classList.remove("active")
    })
  
    // Send message function
    function sendMessage() {
      const message = userInput.value.trim()
      if (message === "") return
  
      // Add user message to chat
      addMessage(message, "user")
  
      // Process the message and get bot response
      setTimeout(() => {
        const botResponse = processUserMessage(message)
        addMessage(botResponse, "bot")
      }, 500)
  
      // Clear input
      userInput.value = ""
    }
  
    // Add message to chat
    function addMessage(message, sender) {
      const messageElement = document.createElement("div")
      messageElement.classList.add("message", sender)
      messageElement.textContent = message
      chatMessages.appendChild(messageElement)
  
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  
    // Process user message and generate response
    function processUserMessage(message) {
      message = message.toLowerCase()
  
      // Create a flattened array of all menu items
      const allItems = [
        ...menuData.menu.starters,
        ...menuData.menu.mains,
        ...menuData.menu.desserts,
        ...menuData.menu.drinks,
      ]
  
      // Check if asking about price
      if (message.includes("price") || message.includes("cost") || message.includes("how much")) {
        // Try to find the item they're asking about
        for (const item of allItems) {
          const itemName = item.name.toLowerCase()
          if (message.includes(itemName)) {
            return `The ${item.name} costs $${item.price.toFixed(2)}.`
          }
        }
  
        // If no specific item found
        return "I'd be happy to tell you the price of any item. Could you specify which dish you're asking about?"
      }
  
      // Check if asking about menu categories
      if (message.includes("starter") || message.includes("appetizer")) {
        const starters = menuData.menu.starters.map((item) => `${item.name} ($${item.price.toFixed(2)})`).join(", ")
        return `Our starters include: ${starters}`
      }
  
      if (message.includes("main") || message.includes("entree")) {
        const mains = menuData.menu.mains.map((item) => `${item.name} ($${item.price.toFixed(2)})`).join(", ")
        return `Our main courses include: ${mains}`
      }
  
      if (message.includes("dessert") || message.includes("sweet")) {
        const desserts = menuData.menu.desserts.map((item) => `${item.name} ($${item.price.toFixed(2)})`).join(", ")
        return `Our desserts include: ${desserts}`
      }
  
      if (message.includes("drink") || message.includes("beverage")) {
        const drinks = menuData.menu.drinks.map((item) => `${item.name} ($${item.price.toFixed(2)})`).join(", ")
        return `Our drinks include: ${drinks}`
      }
  
      // Check if asking about a specific item
      for (const item of allItems) {
        const itemName = item.name.toLowerCase()
        if (message.includes(itemName)) {
          return `${item.name}: ${item.description}. It costs $${item.price.toFixed(2)}.`
        }
      }
  
      // Default responses
      if (message.includes("menu")) {
        return "We have starters, main courses, desserts, and drinks. What would you like to know about?"
      }
  
      if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        return "Hello! How can I help you with our menu today?"
      }
  
      if (message.includes("thank")) {
        return "You're welcome! Let me know if you have any other questions."
      }
  
      // Fallback response
      return "I'm here to help with questions about our menu and prices. Could you please ask about specific dishes or categories?"
    }
  
    // Event listeners for sending messages
    sendButton.addEventListener("click", sendMessage)
  
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  })
  