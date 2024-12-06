/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/App.vue", "./src/**/*.{vue,js,ts,jsx,tsx}"], // Path to your Vue files
  theme: {
    extend: {
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
      fontFamily: {
        josefin: ['Josepfin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        primary: "#314596",
        secondary: "#576395",
        accent: "#94A3B8",
        neutral: "#E5E7EB",
        "base-100": "#F3F4F6",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        },
    }
    ],
  },
};
