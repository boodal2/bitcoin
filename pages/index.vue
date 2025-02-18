<template>
	<main>
		<Parrot
			:message="`${timeDifference}전에 살껄!!`"
		/>
		<div class="max-w-lg mx-auto p-3">
			<!-- 기간 -->
			<UFormGroup
				label="이 때 부터 살껄"
				class="mb-5"
				:hint="`${timeDifference} 전(${bitcoinPrices[fromDateReverseStep].date}) 부터 살껄`"
			>
				<URange
					v-model="fromDateStep"
					color="orange"
					:min="0"
					:max="bitcoinPrices.length - 1"
				/>
			</UFormGroup>

			<UFormGroup
				label="매달 얼마씩 살껄"
				:help="`총 ${rows.length}개월간 ${formatKoreanCurrency(input * rows.length)}원 주고 살껄`"
				class="mb-5"
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
		</div>
		<UTable
			:columns="columns"
			:rows="rows"
			class=" max-w-lg mb-5 px-3 mx-auto "
		>
			<template #caption>
				<caption class="text-sm text-gray-500 dark:text-gray-400 mb-3 text-left">
					라고 할때 샀다면 비트코인 ₿{{ totalBtc }}개 보유 (약 ￦{{ formatKoreanCurrency(totalBtc * nowBitcoinPrice) }})
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
			<!-- DCA 쉼표 3자리 단위 -->
			<template #dca-data="{ row }">
				￦{{ row.dca.toLocaleString() }}
			</template>
			<!-- BTC 소수점 8자리까지 표시 -->
			<template #btc-data="{ row }">
				₿{{ row.btc }}
			</template>
		</UTable>
	</main>
</template>

<script setup lang="ts">
import bitcoinPrices from '/public/db/bitcoin-prices.json';

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
		key: 'btc',
		label: '수량(BTC)',
		sortable: true,
	},
	{
		key: 'dca',
		label: '투자금액',
	},
];
const input = ref(100000);
const fromDateStep = ref(bitcoinPrices.length - 1);
const fromDateReverseStep = computed(() => bitcoinPrices.length - 1 - fromDateStep.value);
const timeDifference = computed(() => calculateTimeDifference(bitcoinPrices[fromDateReverseStep.value].date));
const nowBitcoinPrice = ref(bitcoinPrices[bitcoinPrices.length - 1].krw);

const rows = computed(() => {
	return bitcoinPrices.map((price) => {
		// 소수점 8자리까지 표시
		const btc = (input.value / price.krw).toFixed(8);
		return {
			date: price.date,
			krw: price.krw,
			dca: input.value,
			btc,
		};
	}).slice(fromDateReverseStep.value);
});
const totalBtc = computed(() => {
	return rows.value.reduce((acc, row) => acc + Number(row.btc), 0).toFixed(8);
});

onMounted(async () => {
	const res = await fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=KRW');
	nowBitcoinPrice.value = await res.json().then(data => data.BTC.KRW);
});

const calculateTimeDifference = (dateString: string) => {
	const now = new Date();
	const targetDate = new Date(dateString);

	let years = now.getFullYear() - targetDate.getFullYear();
	let months = now.getMonth() - targetDate.getMonth();
	let days = now.getDate() - targetDate.getDate();

	if (days < 0) {
		months -= 1;
		days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
	}

	if (months < 0) {
		years -= 1;
		months += 12;
	}

	let result = '';
	if (years > 0) {
		result += `${years}년 `;
	}
	if (months > 0) {
		result += `${months}개월 `;
	}
	if (
		years === 0
		&& months === 0
		&& days > 0
	) {
		result += `${days}일 `;
	}

	return result.trim();
};
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

	return result.trim() || '0원';
};
</script>

<style scoped>
main {
	overflow-x: hidden;
}
</style>
