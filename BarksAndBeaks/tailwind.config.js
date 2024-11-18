/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"], // Path to your Vue files
  theme: {
    extend: {
      colors: {
        primary: "#94A3B8", // Grayish color
        secondary: "#E5E7EB", // Light gray
        accent: "#CBD5E1", // Border color
      },
      spacing: {
        // Custom spacing units to replace hardcoded pixels
        "1/4": "25%",
        "1/2": "50%",
        "1/3": "33%",
        "3/4": "75%",
        full: "100%",
      },
      borderRadius: {
        // Custom border radius to replace pixel values
        sm: "4px",
        md: "6px",
        lg: "16px",
        xl: "24px",
      },
      fontSize: {
        // Custom font sizes for better flexibility
        sm: ["14px", "1.5rem"],
        md: ["16px", "1.75rem"],
        lg: ["20px", "2rem"],
      },
    },
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
