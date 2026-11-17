/** Design tokens taken directly from the Figma file (CLAN-UI) */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: "#0170c2", // primary blue: buttons, links, footer
        navy:  "#072460", // large headings
        ink:   "#132e42", // nav, card titles, labels
        muted: "#5a6a75", // secondary text
        line:  "#dce2e5", // hairline dividers
        mist:  "#f5f7f7", // alternate section background
        tint:  "#f0f7fc", // selected service card
      },
      fontFamily: {
        display: ['"DM Sans"', "system-ui", "sans-serif"], // headings
        sans: ["Inter", "system-ui", "sans-serif"],        // body & UI
      },
    },
  },
  plugins: [],
};
