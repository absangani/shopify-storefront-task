/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme : {
    extend: {
      screens: {
        xs: "375px",
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        "2xl": "1600px",
        fullWidth: "1920px",
      },
      height: {
        100: "100px",
      },
      padding: {
        30: "30px",
        22: "22px",
        18: "18px",
      },
      spacing: {
        "05": "5px",
        30: "30px",
        15: "15px",
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: "#1a43bf",
        primary_hover:"#002697",
        // secondary: "#7f1b7f",
        borderColor: "#e0e0e0",
        backgroundGrey: "#f5f5f5",
        placeholderGrey: "#acacac",
        warning: "#FF8C22",
        "warning-light": "#FFECDB",
        success: "#24cc20",
        "success-light": "#dcf9dc",
        error: "#cc2b20",
        error_1: "#FF2226",
        "error-light": "#ffdfdd",
        popupBg: "rgba(0, 0, 0, 0.6)",
        color_00031F: "#00031F",
        active: "#00B215",
        not_active: "#F40105",
        tableHeader: "#929292",
        color_F2F5FF: "#F2F5FF",
        color_F5F5F5: "#F5F5F5",
      },
      backgroundImage: {},
      boxShadow: {
        cardShadow: "0px 0px 4px 3px #C1C1C11F",
        menuShadow: "0px 1.7px 6.78px 0px #807D7D40",
        activeShadow: "0px 0px 4px 0px #00F46E",
        inactive: "0px 0px 4px 0px #F40105",
        primaryShadow: "0px 0px 4px 0px #1A43BF61",
      },
      borderRadius: {
        5: "5px",
        10: "10px",
        15: "15px",
        20: "20px",
        25: "25px",
        27.5: "27.5px",
        30: "30px",
      },
      fontSize: {
        13: "13px",
        24: "24px",
        21: "21px",
        32: "32px",
        40: "40px",
        22: "22px",
      },
      lineHeight: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],

};