<template>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  <el-tab-pane label="刷卡记录" name="first" :key="'first'">
			  <report-one v-if="activeName=='first'"></report-one>
		  </el-tab-pane>
		  <el-tab-pane label="紧急疏散人员报表查询" name="second" :key="'second'">
			  <report-two v-if="activeName=='second'"></report-two>
		  </el-tab-pane>
		  <el-tab-pane label="退出人员报表查询" name="third" :key="'third'">
			  <report-three v-if="activeName=='third'"></report-three>
		  </el-tab-pane>
		  <el-tab-pane label="门禁权限列表(资料库)" name="Fourth" :key="'Fourth'">
			  <report-four v-if="activeName=='Fourth'"></report-four>
		  </el-tab-pane>
		  <el-tab-pane label="门禁权限列表(控制器)" name="fifth" :key="'fifth'">
			  <report-five v-if="activeName=='fifth'"></report-five>
		  </el-tab-pane>
		  <el-tab-pane label="系统操作记录" name="sixth" :key="'sixth'">
			  <report-six v-if="activeName=='sixth'"></report-six>
		  </el-tab-pane>
		  <el-tab-pane label="指令执行记录" name="seventh" :key="'seventh'">
			  <report-seven v-if="activeName=='seventh'"></report-seven>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import reportOne from '@/views/reportQuery/ReportOne.vue'
import reportTwo from '@/views/reportQuery/ReportTwo.vue'
import reportThree from '@/views/reportQuery/ReportThree.vue'
import reportFour from '@/views/reportQuery/ReportFour.vue'
import reportFive from '@/views/reportQuery/ReportFive.vue'
import reportSix from '@/views/reportQuery/ReportSix.vue'
import reportSeven from '@/views/reportQuery/ReportSeven.vue'
export default {
	name : "reportMain",
	components : {
		reportOne,
		reportTwo,
		reportThree,
		reportFour,
		reportFive,
		reportSix,
		reportSeven
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
