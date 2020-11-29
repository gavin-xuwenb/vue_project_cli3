<template>
	<div>
		<el-tabs v-model="activeName" type="border-card" @tab-click='tabClick' >
		  <el-tab-pane label="人员基本资料" name="first" :key="'first'">
				<userInfo v-if="activeName=='first'"></userInfo>
		  </el-tab-pane>
		  <el-tab-pane label="权限批次设定" name="second" :key="'second'">
		  		<authBatchSet v-if="activeName=='second'"></authBatchSet>
		  </el-tab-pane>
		  <el-tab-pane label="实际设码查询" name="third" :key="'third'">
		  		<setCodeQuery v-if="activeName=='third'"></setCodeQuery>
		  </el-tab-pane>
		  <el-tab-pane label="权限群组设定" name="fourth" :key="'fourth'">
				<group v-if="activeName=='fourth'"></group>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import userInfo from '@/views/userManage/UserInfo.vue'
import group from '@/views/userManage/Group.vue'
import setCodeQuery from '@/views/userManage/SetCodeQuery.vue'
import authBatchSet from '@/views/userManage/AuthBatchSet.vue'
export default {
	name : "UserMain",
	components : {
		userInfo,
		group,
		setCodeQuery,
		authBatchSet
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
