<template>
	<header class="header" :style="{backgroundColor: headerState.backgroundColor}">
		<div class="left-button"><div role="button" class="material-icons" v-if="headerState.showLeftButton">west</div></div>
		<div class="month-selection">
			<span role="button" class="material-icons">arrow_left</span>
			<span>
				<select class="month-picker" v-model="selectedYear">
					<option v-for="year in +$moment().add(10, 'years').format('YYYY')" :key="year" :value="year">{{ year.toString().lpad('0', 4) }}</option>
				</select>
				<span>. </span>
				<select class="month-picker" v-model="selectedMonth">
					<option v-for="month in 12" :key="month" :value="month">{{ month.toString().lpad('0', 2) }}</option>
				</select>
			</span>
			<span role="button" class="material-icons">arrow_right</span>
		</div>
		<div class="right-button"><div role="button" class="material-icons" v-if="headerState.showRightButton">menu</div></div>
	</header>
</template>

<script src="./HeaderUI.js"/>
<style src="./HeaderUI.scss" lang="scss" scoped />