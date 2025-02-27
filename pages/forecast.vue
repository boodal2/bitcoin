<template>
	<main>
		<NewsGrandFather
			class="news"
		>
			<template #bottom-right>
				<small class="text-right flex-1">
					{{ futurePrices[futurePrices.length - 1].date }}
					|
					비트코인: {{ futurePrices[futurePrices.length - 1].krw.toLocaleString() }}원
				</small>
			</template>
		</NewsGrandFather>
		<div class="container max-w-xlg px-3 mx-auto">
			<UFormGroup
				label="매달 얼마씩 샀제"
				class="mb-2"
			>
				<UInput
					v-model="input"
					type="number"
				>
					<template #trailing>
						<span class="text-xs text-gray-500 dark:text-gray-400">￦</span>
					</template>
				</UInput>
			</UFormGroup>

			<p class="text-gray-500 dark:text-gray-400 text-sm">
				총 {{ futurePrices.length }}개월간 {{ formatKoreanCurrency(input * futurePrices.length) }}원 주고 샀제
				<br>
				<br>
				10년뒤, 비트코인 ₿{{ totalBtc }}개 보유 했제? (약 ￦{{ formatKoreanCurrency(totalBtc * futurePrices[futurePrices.length - 1].krw) }})
			</p>

			<UTable
				:columns="columns"
				:rows="futurePrices"
				class="my-5"
			>
				<template #caption>
					<caption class="text-sm text-gray-500 dark:text-gray-400 mb-3 text-left">
						<small>
							(해당 데이터는 과거 10년간 데이터 변동률로 예측한 데이터입니다)
						</small>
					</caption>
				</template>
				<template #date-data="{ row }">
					<!-- 2015-01-01 -> 15년 1월 -->
					{{ row.date.slice(2, 7).replace('-', '년 ') }}월
				</template>
				<!-- KRW 쉼표 3자리 단위 -->
				<template #krw-data="{ row }">
					￦{{ row.krw.toLocaleString() }}
				</template>
				<template #rate-data="{ row }">
					{{ row.rate }}%
				</template>
				<!-- DCA 쉼표 3자리 단위 -->
				<template #dca-data="{ row }">
					￦{{ row.dca.toLocaleString() }}
				</template>
				<!-- BTC 소수점 8자리까지 표시 -->
				<template #btc-data="{ row }">
					₿{{ row.btc }}
				</template>
			</UTable>
		</div>
	</main>
</template>

<script setup lang="ts">
import bitcoinPrices from '/public/db/bitcoin-prices.json';

useHead({
	title: '했제 할아버지',
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: 'grandfather.ico',
		},
	],
});

const baseURL = useRuntimeConfig().app?.baseURL;
useSeoMeta({
	ogTitle: '10년뒤 비트코인 가격은?',
	ogDescription: '했제 할아버지 충격 근황',
	ogImage: `${baseURL}grandfather-og-image.png`,
});

const columns = [
	{
		key: 'date',
		label: '날짜',
		sortable: true,
	},
	{
		key: 'krw',
		label: '비트코인 1개 가격(KRW)',
		sortable: true,
	},
	{
		key: 'rate',
		label: '전월대비 변동률(%)',
		sortable: true,
	},
	{
		key: 'btc',
		label: '수량(BTC)',
		sortable: true,
	},
	{
		key: 'dca',
		label: '투자금액',
	},
];
const nowBitcoinPrice = ref(bitcoinPrices[bitcoinPrices.length - 1].krw);
const input = ref(100000);

const futurePrices = computed(() => {
	const list: {
		date: string;
		krw: number;
		rate: string;
		btc: string;
		dca: number;
	}[] = [];

	bitcoinPrices
		.slice(-122)
		.slice(1)
		.forEach(({ krw }: { krw: number }, index: number) => {
			const ratePrice = bitcoinPrices[index].krw;
			const rate = ((krw - ratePrice) / ratePrice) * 100;
			const beforeMonthPrice = index === 0 ? nowBitcoinPrice.value : list[index - 1].krw;
			const futurePrice = beforeMonthPrice * (1 + Number(rate) / 100);

			list.push({
				date: getFormattedDateWithOffset(index),
				krw: Number(futurePrice.toFixed(0)),
				rate: rate.toFixed(2),
				btc: (input.value / futurePrice).toFixed(8),
				dca: input.value,
			});
		});

	return list;
});

const totalBtc = computed(() => {
	return Number(futurePrices.value.reduce((acc, row) => acc + Number(row.btc), 0).toFixed(8));
});

onMounted(async () => {
	const res = await fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=KRW');
	nowBitcoinPrice.value = await res.json().then(data => data.BTC.KRW);
});

function getFormattedDateWithOffset(monthOffset: number): string {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
	const newDate = new Date(year, month - 1 + monthOffset, 1); // monthOffset을 더한 새로운 날짜를 생성합니다.
	const newYear = newDate.getFullYear();
	const newMonth = String(newDate.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞춥니다.
	return `${newYear}-${newMonth}-01`;
}
const formatKoreanCurrency = (amount: number) => {
	const units = ['조', '억', '만'];
	const unitValues = [1e12, 1e8, 1e4];
	let result = '';

	for (let i = 0; i < units.length; i++) {
		const unitValue = unitValues[i];
		if (amount >= unitValue) {
			const unitAmount = Math.floor(amount / unitValue);
			result += `${unitAmount}${units[i]} `;
			amount %= unitValue;
		}
	}

	return result.trim() || '0';
};
</script>

<style scoped lang="scss">
main {
	overflow-x: hidden;

	.news {
		margin: 0 auto 15px;
	}

	.container {
		max-width: 800px;
		margin: auto;
	}
}
</style>
