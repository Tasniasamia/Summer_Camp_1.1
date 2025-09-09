/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // সবকিছু src এর ভিতরে
    "./app/**/*.{js,ts,jsx,tsx}",   // app router থাকলে
    "./pages/**/*.{js,ts,jsx,tsx}", // পুরনো pages router থাকলে
    "./components/**/*.{js,ts,jsx,tsx}", // যদি আলাদা components folder রাখো
  ],
  theme: {
    screens: {
      'xs': '446px',
      'ssm-range': { 'raw': '(min-width: 446px) and (max-width: 639px)' },
      'sm': '640px',
      'custom-xl3': { 'raw': '(min-width: 1024px) and (max-width: 1279px)' },
      'custom-xl2': { 'raw': '(min-width: 1280px) and (max-width: 1341px)' },
      'custom-xl1': { 'raw': '(min-width: 1342px) and (max-width: 1439px)' },
      'custom-2xl': { 'raw': '(min-width: 1440px) and (max-width: 1535px)' },
      '2xl1': '1536px',  
      '2xl2': '1700px',  
    },
    extend: {
      colors: {
        primary: "#398A2F",
        secondary: "#6FC464",
        textMain: "#1A1A1A",
        text_secondary: "#7C7C86",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
