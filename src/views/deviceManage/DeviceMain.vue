<template>
<div>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  
		  <el-tab-pane label="设备查询" name="first" :key="'first'">
		  			  <device-query v-if="activeName=='first'"></device-query>
		  </el-tab-pane>
		  
		  <el-tab-pane label="设备状态" name="second" :key="'second'">
		  	  <device-check v-if="activeName=='second'"></device-check>
		  </el-tab-pane>
		  
		  <el-tab-pane label="时间查询" name="third" :key="'third'">
		  	  <device-time v-if="activeName=='third'"></device-time>
		  </el-tab-pane>
		</el-tabs>
	</div>
</div>
</template>

<script>
import deviceQuery from '@/views/deviceManage/DeviceQuery.vue'
import deviceCheck from '@/views/deviceManage/DeviceCheck.vue'
import deviceTime from '@/views/deviceManage/DeviceTime.vue'
export default {
	name : "deviceMain",
	components : {
		deviceQuery,
		deviceCheck,
		deviceTime
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
