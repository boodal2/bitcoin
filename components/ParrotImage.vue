<template>
	<div
		class="wrapper"
	>
		<h1
			class="text-4xl font-bold text-center"
		>
			{{ props.message }}
		</h1>
		<img
			src="~/assets/images/parrot.png"
			class="mx-auto"
			alt=""
			srcset=""
		>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	message?: string;
}>();
</script>

<style scoped>
.wrapper {
    position: relative;
    /* max-width: 100%; */
    width: 577px;
    height: 433px;
    margin: 150px auto 30px;
}
 h1 {
    position: absolute;
    left: 10px;
    top: -94px;
    width: 300px;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    background-color: #fff;
    border-radius: 100px;
    border-width: 10px;
    border-color: #000;
    border-style: dotted;
 }
 @media screen and (max-width: 577px) {
    .wrapper {
        transform: scale(0.7) translateX(-10%);
        margin: 55px auto 0px;
    }
 }
 img {
    position: relative;
    width: 100%;
 }
</style>
