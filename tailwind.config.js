/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      store:{
        'columns': 'repeat minmax(200px, 1fr)'
      }
    },
  },
  
  
  plugins: [],
};
