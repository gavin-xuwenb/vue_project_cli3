<template>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  <el-tab-pane label="指令测试" name="first" :key="'first'">
			  <order-test v-if="activeName=='first'"></order-test>
		  </el-tab-pane>
		  <el-tab-pane label="待拓展..." name="second" :key="'second'">
		  			  <time-reset v-if="activeName=='second'"></time-reset>
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
