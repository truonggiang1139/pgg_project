/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      spacing: {
        200: "200px",
        300: "300px",
        320: "320px",
        348: "348px",
        450: "450px"
      },
      height: {
        40: "40px",
        46: "46px",
        414: "414px",
        600: "600px"
      },
      colors: {
        white: "rgb(255 255 255)",
        selectedIcon: "rgb(251, 253, 255)",
        input: "#f1f3f5",
        itemSelectedSideBar: "rgb(241, 243, 245)",
        hoverItemSideBar: "rgba(193, 200, 205, 0.08)",
        hoverSelectedSideBar: "rgba(0, 145, 255, 0.16)",
        headerTable: "rgb(236,238,240)",
        bodyTable: "rgb(248,249,250)",
        rightContent: "rgb(245,245,250)",
        gray: "rgb(104, 112, 118)",
        link: "rgb(104, 112, 118)",
        blue1: "rgb(0, 145, 255)",
        blueHover: "rgb(0, 129, 241)",
        default: "rgb(248, 249, 250);",
        black: "rgb(17, 24, 28)",
        red1: "rgb(243, 174, 175)",
        red2: "rgb(255, 239, 239)",
        required: "rgb(229, 72, 77)"
      },
      boxShadow: {
        form: "rgba(236, 238, 240, 0.5) 0px 10px 5px",
        header: "rgb(236, 238, 240) 0px 3px 15px",
        selected: "rgba(148, 186, 44, 0.15) 0px 6px 9px"
      },
      inset: {
        135: "135px"
      },
      margin: {
        "08": "-8px"
      },
      maxWidth: {
        1170: "1170px",
        300: "300px"
      },
      minWidth: {
        175: "175px",
        290: "290px"
      },
      minHeight: {
        600: "600px"
      }
    }
  },
  plugins: []
};
