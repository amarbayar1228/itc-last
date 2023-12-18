/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#031842", //
          100: "#10B7EB", // logo 2 color
          150: "#9BA6B4", // gray
        },
      },
      boxShadow: {
        "4xl": "8px 7px 5px 1px #7b7272cc",
        shadowRB: "3px 1px 4px 1px #e9e9e9",
        shadowSimple: "0px 0px 1px 7px rgb(219 234 254)",
      },
      keyframes: {
        "trans-right": {
          "0% , 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(10px)" },
        },
        "trans-top": {
          "0% , 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        fadeInOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0, scale: 70, transform: "translate3d(10px, 0, 0)" },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInTop: {
          "0%, 30%": {
            opacity: 0,
            scale: 70,
            transform: "translate3d(0px, 20px, 0)",
          },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInTop1: {
          "0%, 50%": {
            opacity: 0,
            scale: 60,
            transform: "translate3d(0px, 20px, 0)",
          },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInTop2: {
          "0%, 60%": {
            opacity: 0,
            scale: 50,
            transform: "translate3d(0px, 20px, 0)",
          },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInTop3: {
          "0%, 65%": {
            opacity: 0,
            scale: 45,
            transform: "translate3d(0px, 20px, 0)",
          },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInRight1: {
          "0%, 65%": {
            opacity: 0.2,
            scale: 60,
            transform: "translate3d(-30px, 0, 0)",
          },
          "100%": { opacity: 1, scale: 100, transform: "translate3d(0,0,0)" },
        },
        fadeInRight2: {
          "0%, 65%": {
            transform: "translate3d(-20px, 0, 0)",
          },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        fadeInRight3: {
          "100%": {
            transform: "translate3d(-20px, 0, 0)",
          },
          "0%": { transform: "translate3d(-20,0,0)" },
        },
        fadeInRightBack: {
          "0%, 65%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": { transform: "translate3d(-20px,0,0)" },
        },
      },
      animation: {
        "trans-right": "trans-right 1s ease-in-out infinite ",
        "trans-top": "trans-top 1.3s ease-in-out infinite",
        fadeInOut: "fadeInOut 1.5s ease-in-out",
        fadeIn: "fadeIn 0.8s ease-in-out",
        fadeInTop: "fadeInTop 1.3s ease-in-out",
        fadeInTop1: "fadeInTop1 1.8s ease-in-out",
        fadeInTop2: "fadeInTop2 2.1s ease-in-out",
        fadeInTop3: "fadeInTop3 2.7s ease-in-out",
        fadeInRight1: "fadeInRight1 0.8s ease-in-out",
        fadeInRight2: "fadeInRight2 0.5s ease-in-out",
        fadeInRight3: "fadeInRight3 0.5s ease-in-out",
        fadeInRightBack: "fadeInRightBack 0.5s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-background": "url('/img/bg-1.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
