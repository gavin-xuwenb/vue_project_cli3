<template>
	<div class="content">
		<el-form ref="form" :model="form" label-width="150px">
		  <el-form-item label="HEAD">
		    <el-input v-model="form.HEAD"
			          maxlength="2" minlength="2" 
					  show-word-limit disabled></el-input>
		  </el-form-item>
		 
		  <el-form-item label="DID(机器号)">
		   <el-input v-model="form.DID" ref="DID"
		             maxlength="2"  minlength="2" 
					 autofocus
					 placeholder="请输入2位数机器号"
					 show-word-limit></el-input>
			<span class="text-red">范围00~FF</span>
		  </el-form-item>
		  
		  <el-form-item label="Command(指令)">
		   <el-input v-model="form.Command" ref="Command"
		             maxlength="2" minlength="2" 
					 placeholder="请输入2位数指令"
					 show-word-limit></el-input>
			<span class="text-red">范围00~FF</span>
		  </el-form-item>
		  
		  <el-form-item label="DATA">
		   <el-input v-model="form.DATA" ref="DATA"
					 maxlength="40" 
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
			  HEAD: '7E',
			  DID: '',
			  Command: '',
			  DATA: ''
			},
			textarea: ''
		}
    },
	mounted(){
		this.$refs['DID'].focus()
	},
    methods: {
		onSubmit() {
			this.form.DID = this.form.DID.trim()
			this.form.Command = this.form.Command.trim()
			this.form.DATA = this.form.DATA.trim()
			
			let _form = this.form
			if(_form.DID.length!=2){
				this.showTips('请输入2位数的DID')
				this.$refs['DID'].focus()
				return false
			}
			
			if(_form.Command.length!=2){
				this.showTips('请输入2位数的指令')
				this.$refs['Command'].focus()
				return false
			}
			
			if(_form.DATA.length==0 || _form.DATA.length%2!=0){
				this.showTips('请输入正确的DATA')
				this.$refs['DATA'].focus()
				return false
			}
			
			this.textarea = ''
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

