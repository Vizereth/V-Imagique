/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      backgroundImage: {
        "01": "url('./assets/backgrounds/01.jpg')",
      },
      margin: {
        25: "25px",
        50: "50px",
        75: "75px",
        100: "100px",
        150: "150px",
        200: "200px",
      },
      fontSize: {
        small: "0.9rem",
        base: "1rem",
        big: "1.2rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "4xl": "4rem",
        "6xl": "6rem",
        "8xl": "8rem",
      },
      width: {
        190: "190px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      flex: {
        0.7: "0.7 1 0%",
      },
      maxHeight: {
        370: "370px",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      colors: {
        primaryColor: "#131c21",
        primaryColorDark: "#0d1518",
        primaryColorLight: "#434f56",
        accentColor: "#f0696f",
        textColor: "#94a0ae",
        hoverColor: "#d8af81",
      },
      backgroundColor: {
        blackOverlay: "rgba(0, 0 ,0 ,0.7)",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },

        "slide-fwd": {
          "0%": {
            "-webkit-transform": "translateZ(0px)",
            transform: "translateZ(0px)",
          },
          "100%": {
            "-webkit-transform": "translateZ(160px)",
            transform: "translateZ(160px)",
          },
        },
      },
      transitionDuration: {
        250: "250ms",
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-fwd":
          " slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      transitionProperty: {
        height: "height",
      },
    },
    cursor: {
      "zoom-in": "zoom-in",
      pointer: "pointer",
    },
  },
  variants: {
    // backgroundColor: ['active'],
    extend: {},
  },
  plugins: [],
};
