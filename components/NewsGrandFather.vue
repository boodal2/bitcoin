<template>
	<div class="contents">
		<img src="~/assets/images/grandfather1.png">
		<div class="left-top">
			<p class="red">
				100억간다 했제? 손녀방문
			</p>
			<p class="white">
				했제할아버지와의만남
			</p>
		</div>

		<div class="right-top">
			<div class="column">
				<span class="red live">생중계</span>
				<p class="logo">
					BOO
				</p>
			</div>
			<p class="time">
				{{ time }}
			</p>
		</div>

		<footer>
			<h1 class="red">
				손녀 감사의 마음 전하러
			</h1>

			<p class="bottom">
				<span>BOO</span>
				<span class="red text-sm">주요뉴스</span>

				<span>
					100억간다했제?
				</span>
			</p>

			<p />
		</footer>
	</div>
</template>

<script setup lang="ts">
const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
</script>

<style scoped lang="scss">
.contents {
    background-color: #000;
    width: 800px;
    height: 533px;
    position: relative;
    display: block;

    > img {
        width: 100%;
        object-fit: contain;
        height: 533px;
    }

    .left-top {
        position: absolute;
        top: 30px;
        left: 30px;
        background-color: #000;
        color: #fff;
        display: flex;
        flex-direction: column;
        font-size: 14px;

        p {
            padding: 0px 10px;
            font-size: 14px;
            font-weight: bold;
        }
    }

    .right-top {
        position: absolute;
        top: 30px;
        right: 30px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: end;
        font-weight: bold;

        .column {
            display: flex;
            align-items: center;
            gap: 5px;
            height: 12px;
        }

        .live {
            padding: 0px 15px;
            font-size: 14px;
        }

        .logo {
            font-size: 24px;
            text-align: center;
            opacity: 0.6;
        }

        .time {
            font-size: 18px;
            text-align: center;
        }
    }

    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        font-weight: bold;
        width: 100%;

        .badge {
            background-color: #fff;
            color: #000;
            padding: 5px 10px;
            width: fit-content;
            font-size: 14px;
            font-weight: bold;
            margin-left: 50px;
        }

        h1 {
            font-size: 56px;
            padding: 0px 30px;
        }

        .bottom {
            background-color: rgba($color: #000000, $alpha: 0.7);
            font-size: 25px;
            font-weight: normal;
            padding: 3px 10px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }

    .red {
        background-color: #AB0000;
        color: #fff;
    }

    .white {
        background-color: #fff;
        color: #000;
    }
}
</style>
