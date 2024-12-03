module.exports = {
	important: true, // 确保 tailwind css 有更高的优先级
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Noto Sans SC', 'Graphik', 'sans-serif'],
			serif: ['Noto Serif SC', 'Merriweather', 'serif'],
			roboto: ['Roboto', 'sans-serif'],
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1720px',
		},
		minHeight: {
			60: '60px',
		},
	},
	plugins: [require('tailwindcss-animated')], // 扩展动画效果
};
