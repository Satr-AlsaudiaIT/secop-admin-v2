/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle .5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        }
      }
,
      colors: {
        "main-red": "#BC2231",
        "primary": "#2a3c90",
        "variant": "#ffdc74",
        "dark-main-bg":"#0f172a",
        "dark-layout-bg":"#141414",
        "dark-border":"#424242",
        "dark-standard-color":"#94a3b8",
        "light-main-bg":"#fafafa",
        "light-layout-bg":"#ffffff",
        "light-border":"#d9d9d9",
        "light-standard-color":"#64748b",

      },
      backgroundImage: {
        "texture-light": 'url(bg/bg-17.png)',
        "texture-dark": 'url(bg/bg-4.png)',
        contact: "url('/src/assets/contact.png')",
        shapeA: "url('bg/shapeA.avif')",
        shapeB: "url('bg/shapeB.avif')",
      },
    
    },
  },
  plugins: [],
  darkMode: "class",

  corePlugins: {
    preflight: false, // <== disable this!
  },
};
