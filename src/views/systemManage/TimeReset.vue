<template>
	<div class="content">
		<span>当前系统时间:</span>
		<span class="date">{{sysdate}}</span>
		
		
		<el-button type="primary" @click="dialogVisible = true">矫正</el-button>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <span>确定矫正时间？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="reset">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import {dateFormat} from '@/utils/dateUtil.js'
export default {
	name : "timeReset",
	data () {
		return {
			sysdate: dateFormat.call(new Date(),"yyyy-MM-dd hh:mm:ss"),
			tt: '',
			dialogVisible: false
		}
	},
	created() {
		let _this = this;
		clearInterval(this.tt)
		this.tt = setInterval(function(){
			_this.sysdate = dateFormat.call(new Date(),"yyyy-MM-dd hh:mm:ss")
		},1000)
	},
	beforeDestroy() {
		clearInterval(this.tt)
	},
	methods: {
		reset(){
			this.dialogVisible = false
			console.log('确认矫正...')
		}
	}
}
</script>

<style scoped="scoped">
.date {
	margin: 1px 10px;
}
</style>

