const production = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
	site: {
		// production URL
		url: 'https://boodal2.github.io/bitcoin',
		name: 'boodal2',
	},
	colorMode: {
		preference: 'light',
	},
	content: {
		documentDriven: true,
	},
	ogImage: {
		fonts: [
			'Nanum+Gothic',
		],
		googleFontMirror: true,
	},
	googleFonts: {
		families: {
			'Nanum Gothic': true,
			'Nanum Myeongjo': true,
		},
		download: false,
	},

	app: {
		baseURL: production ? '/bitcoin/' : '/',
		buildAssetsDir: '_nuxt/',
		head: {
			title: '비트코인 살껄',
			charset: 'utf-8',
		},
	},
	nitro: {
		baseURL: production ? '/bitcoin/' : '',
		prerender: {
			crawlLinks: true,
			routes: ['/'],
		},
	},

	devtools: {
		enabled: true,
	},

	modules: [// Simple usage
		'@nuxt/content', '@nuxt/eslint', '@nuxt/ui', '@nuxtjs/device', 'nuxt-og-image', '@nuxtjs/google-fonts', '@nuxtjs/sitemap', '@nuxt/fonts'],

	eslint: {
		checker: true,
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				// ...
			},
		},
	},

	routeRules: {
		'/api/**': {
			// 랜더링하지 않기
			prerender: false,
		},
	},

	compatibilityDate: '2024-09-25',
});
