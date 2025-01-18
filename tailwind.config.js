module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Colorlogo: "#008000",
      },
      screens: {
        sm340: "340px",
        sm375: "376px", // Custom breakpoint for 375px
        sm425: "425px",
        smd523: "523px",
        lgm: "1025px",
        lgsm: "1325px",
      },
      fontFamily: {
        Koulen: ["Koulen", "sans-serif"],
        KhmerOSBattambang: ["KhmerOSBattambang", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
