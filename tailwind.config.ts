import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
	theme: {
		extend: {
			screens: {
				'max-sm': { max: '640px' }, // 640px 이하일 때 적용
			},
		},
	},
};
