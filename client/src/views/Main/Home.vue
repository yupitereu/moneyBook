<template>
	<div class="home">
		<HomeCompBoard/>
		<HomeRemainBoard class="bg-primary-dark" boardTitle="잔액정보" :foldingButton="true">
			<template v-slot:contents>
				<div class="remain-board-contents">
					<InformationBoardContents class="item" titleIcon="won" title="예산" price="12342225"></InformationBoardContents>
					<InformationBoardContents class="item" titleIcon="plus" title="이월금" price="0"></InformationBoardContents>
					<InformationBoardContents class="item" titleIcon="minus" title="지출액" price="12345"></InformationBoardContents>
				</div>
			</template>
		</HomeRemainBoard>
		<HomeRemainBoard class="bg-white" :foldingButton="false">
			<template v-slot:title>
				<div class="title-left">
					<img src="../../assets/book.svg" class="icon">
					<span>미정산금액</span>
				</div>
				<div class="title-right third">-2,011,111</div>
			</template>
			<template v-slot:contents>
				<div class="unsettled-contents flex">
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 1000}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
					<AccountUnsettledMoney :accountData="{unsettledMoney: 0}"></AccountUnsettledMoney>
				</div>
			</template>
		</HomeRemainBoard>
	</div>
</template>

<script src="./Home.js" />
<style src="./Home.scss" lang="scss" scoped/>
