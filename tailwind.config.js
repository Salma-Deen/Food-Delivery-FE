/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // fromLeft: {
        //   from: { left: '400px' },
        //   to: { left: '0px' },
        // },
        fromRight: {
          from: { right: '400px' },
          to: { right: '0px' },
        },
      },
      animation: {
        // 'from-left': 'fromLeft 250ms ease-in-out',
        'from-right': 'fromRight 250ms ease-in-out',
      },
    },
  },
  plugins: [],
};