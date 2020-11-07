<template>
	<div class="content">
		<el-form :inline="true" ref="form" :model="form" label-width="150px">
			<el-form-item label="输入指令">
		         <el-input v-model="form.cmdStr" ref="cmdStr" 
					 maxlength="50" 
					 show-word-limit></el-input>
		    </el-form-item>
		  
			<el-form-item>
				<el-button type="primary" @click="onSubmit">发送</el-button>
			</el-form-item>
		</el-form>
		
		<div class="sub-title">服务器返回数据</div>
		<div class="returnData">
			<el-input
			  type="textarea"
			  v-model="textarea"
			  rows="6"
			  disabled
			>
			</el-input>
		</div>
	</div>
</template>

<script>
export default {
	name : "orderTest",
	data () {
		return {
			form: {
				cmdStr : ''
			},
			textarea:''
		}
    },
	mounted(){
		this.$refs['cmdStr'].focus()
	},
    methods: {
		onSubmit() {
			 
			this.form.cmdStr = this.form.cmdStr.trim()
			
			let _form = this.form
			if(_form.cmdStr.length==0){
				this.showTips('请输入指令！')
				this.$refs['cmdStr'].focus()
				return false
			}
			console.log('发送中...')
		},
		showTips(message){
			this.$notify.error({
			  title: '错误',
			  message: message
			});
		}
    }
}
</script>

<style scoped="scoped">
.el-input {
	width: 200px;
}
.text-red {
	 color: red;
}
.returnData {
	width: 50%;
}
</style>

