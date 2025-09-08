/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#272D33",
        "custom-red": "#FF1B27",
        "custom-blue": "#89B9BD",
        "custom-gray": "#818181",
        "custom-blue-medium": "#3AA9D9",
        
      },
      keyframes: {
        bounceWhatsapp: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(-8px)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        bounceWhatsapp: "bounceWhatsapp 1.5s infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // 👈 agregado
  ],
};
