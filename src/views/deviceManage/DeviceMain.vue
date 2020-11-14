<template>
<div>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  <el-tab-pane label="设备状态" name="first" :key="'first'">
		  			  <device-check v-if="activeName=='first'"></device-check>
		  </el-tab-pane>
		  <el-tab-pane label="设备查询" name="second" :key="'second'">
			  <device-query v-if="activeName=='second'"></device-query>
		  </el-tab-pane>
		  
		</el-tabs>
	</div>
</div>
</template>

<script>
import deviceQuery from '@/views/deviceManage/DeviceQuery.vue'
import deviceCheck from '@/views/deviceManage/DeviceCheck.vue'
export default {
	name : "deviceMain",
	components : {
		deviceQuery,
		deviceCheck
	},
	data () {
		return {
			//默认第一个选项卡
			activeName : 'first',
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
