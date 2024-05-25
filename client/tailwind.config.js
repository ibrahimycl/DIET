/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "lighterGreen": "#ffffff",
      "lightGreen": "#86efac",
      "green": "#166534",
      "footer": "#f3f4f6",
      "first": "#052e16",
      "white": "#ffffff",
      "black": "#020617",
      "gray": "#E8DFCA",
      "darkGray": "#333333",
      "blue-500": "#3b82f6",
      "red-500": "#ef4444",
      "gray-600": "#4b5563",
    }
  },
  plugins: [],
}
