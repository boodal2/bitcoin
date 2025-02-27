<template>
	<UHorizontalNavigation
		:links="links"
		class="border-b border-gray-200 dark:border-gray-800"
	/>
	<NuxtPage />
	<div class="text-center my-10 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-5">
		by. <a href="http://x.com/boom30908979489">
			부달이
		</a>
	</div>
	<UNotifications />
</template>

<script setup lang="ts">
const baseURL = useRuntimeConfig().app?.baseURL;

const links = [
	{
		label: '비트코인 살껄',
		avatar: {
			src: `${baseURL}favicon.ico`,
		},
		to: '/',
	}, {
		label: '했제 할아버지',
		avatar: {
			src: `${baseURL}grandfather.ico`,
		},
		to: '/forecast',
	},
];
</script>

<style>
 * {
	font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", 'Nanum Gothic';
	word-break: keep-all;
 }
</style>
