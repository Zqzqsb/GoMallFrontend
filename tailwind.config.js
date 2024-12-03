/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // 指定包含 Tailwind CSS 类名的文件
  ],
  theme: {
    extend: {}, // 可自定义主题
  },
  plugins: [],
};
