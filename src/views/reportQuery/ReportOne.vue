<template>
	<div>
		<div class="wrap">
		    <div class="left">
				<div class="dateSelect">
					<div class="block">
					  <span class="demonstration" style="margin-right:15px;">起始日期:</span>
					  <el-date-picker
						v-model="date1"
						type="datetime"
						placeholder="选择日期时间">
					  </el-date-picker>
					</div>
					<div class="block" style="margin-top:2px">
					  <span class="demonstration" style="margin-right:15px;">结束日期:</span>
					  <el-date-picker
					    v-model="date2"
					    type="datetime"
					    placeholder="选择日期时间">
					  </el-date-picker>
					</div>
				</div>
				<div style="margin: 20px;"></div>
				<div class="dateSelect">
					<el-form label-position="right" label-width="80px" :model="formLabelAlign">
					  <el-form-item label="员工编号" size="mini">
					    <el-input v-model="formLabelAlign.id"></el-input>
					  </el-form-item>
					  <el-form-item label="姓名" size="mini">
					    <el-input v-model="formLabelAlign.name"></el-input>
					  </el-form-item>
					  <el-form-item label="卡号" size="mini">
					    <el-input v-model="formLabelAlign.cardNoe"></el-input>
					  </el-form-item>
					  <el-form-item label="部门" size="mini">
					    <el-input v-model="formLabelAlign.dept"></el-input>
					  </el-form-item>
					</el-form>
				</div>	
				
				<div class="btn-query">
					<el-button type="primary" >查询</el-button>
				</div>	
							
						
			</div>
			<div class="right">
			</div>
		</div>
	</div>
</template>

<script>
 export default {
	data() {
		return {
			date1: '',
			date2: '',
			formLabelAlign: {
			  id:'',
			  name: '',
			  cardNo: '',
			  dept: ''
			}
		}
	}
 }
</script>

<style scoped="scoped">
.wrap {
	display: -webkit-box;
	width:100%;
	min-height: 440px;
	font-size: 14px;
}
.left{
	width:26%;
	padding: 5px;
	border:1px solid #DCDFE6;
}
.right {
	width:71%;
	margin-left:5px;
	padding: 10px;
	border:1px solid #DCDFE6;
}	
.dateSelect{
	text-align: center;
	border:1px solid #DCDFE6;
	padding-top: 10px;
	padding-bottom: 10px;
}

.btn-query{
	text-align: center;
	margin-top: 10px;
}


</style>
