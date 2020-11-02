<template>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  <el-tab-pane label="时间矫正" name="first" :key="'first'">
			  <time-reset v-if="activeName=='first'"></time-reset>
		  </el-tab-pane>
		  <el-tab-pane label="指令测试" name="third" :key="'third'">
			  <order-test v-if="activeName=='third'"></order-test>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import timeReset from '@/views/systemManage/TimeReset.vue'
import orderTest from '@/views/systemManage/OrderTest.vue'
export default {
	name : "systemMain",
	components : {
		timeReset,
		orderTest
	},
	data () {
		return {
			//默认第一个选项卡
			activeName : 'first'
		}
    },
    methods: {
        tabClick (tab) {
			this.activeName = tab.name
		}
    }
}
</script>

<style scoped="scoped">
</style>
