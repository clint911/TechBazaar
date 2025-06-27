const products = [
  {
    id: 1,
    name: "Havic HV G-92 Gamepad",
    quantity: 20,
    image: [
      { frontUrl: './images/front.png' },
      { leftSideUrl: "./images/left.png" },
      { topUrl: "./images/top.png" },
      { rightSideUrl: "./images/right.png" },
      { backUrl: "./images/back.png" }
    ],
    category: "gaming",
    liked: true,
    price: 4000,
    description: "PlayStation 5 Controller Skin. High-quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive."
  },
  {
    id: 2,
    name: "Dell XPS 13 Laptop",
    quantity: 10,
    image: [
      { frontUrl: './images/dell_front.png' },
      { topUrl: './images/dell_top.png' }
    ],
    category: "laptop",
    liked: false,
    price: 120000,
    description: "13-inch laptop designed with precision engineered details, stunning display, and 11th Gen Intel Core processor performance."
  },
  {
    id: 3,
    name: "Apple iPhone 14 Pro",
    quantity: 15,
    image: [
      { frontUrl: './images/iphone_front.png' },
      { backUrl: './images/iphone_back.png' }
    ],
    category: "phones",
    liked: true,
    price: 140000,
    description: "iPhone 14 Pro with Super Retina XDR display, 48MP camera, A16 Bionic chip, and dynamic island feature."
  },
  {
    id: 4,
    name: "Samsung Smart Monitor M8",
    quantity: 8,
    image: [
      { frontUrl: './images/monitor_front.png' },
      { sideUrl: './images/monitor_side.png' }
    ],
    category: "monitor",
    liked: false,
    price: 85000,
    description: "Smart Monitor with 4K UHD, built-in apps like Netflix, YouTube, and support for Microsoft Office 365 without a PC."
  },
  {
    id: 5,
    name: "Logitech MX Master 3",
    quantity: 30,
    image: [
      { frontUrl: './images/mouse_front.png' },
      { sideUrl: './images/mouse_side.png' }
    ],
    category: "computer peripherals",
    liked: true,
    price: 12000,
    description: "Advanced wireless mouse with ergonomic design, ultra-fast scrolling, and app-specific customizations."
  },
  {
    id: 6,
    name: "Corsair K95 RGB Platinum XT Keyboard",
    quantity: 12,
    image: [
      { frontUrl: 'https://i.pinimg.com/736x/28/38/7a/28387a9c201e880f81a4dd2619923da7.jpg' },
      { topUrl: 'https://i.pinimg.com/736x/79/12/24/79122463901c8a7de9000b2fb4063c6b.jpg' }
    ],
    category: "computer peripherals",
    liked: true,
    price: 25000,
    description: "Mechanical gaming keyboard with dynamic RGB backlighting, macro keys, and aircraft-grade aluminum frame."
  }
];

export default products;
