<template>
	<div class="content">
		<span label="DID(机器号)">DID(机器号)(范围00~FF)</span>
		<el-input v-model="DID" ref="DID"
		             maxlength="2"  minlength="2" 
					 autofocus
					 placeholder="请输入2位数机器号"
					 show-word-limit>
		</el-input>
        <el-button type="primary" @click="openDoor">开门</el-button>
	</div>
</template>

<script>
export default {
	name : "remoteOpenDoor",
	data () {
		return {
			DID:''
		}
    },
	mounted(){
		this.$refs['DID'].focus()
	},
    methods: {
		openDoor() {
			this.DID = this.DID.trim()
			if(this.DID.length!=2){
				this.showTips('请输入2位数的DID')
				this.$refs['DID'].focus()
				return false
			}
			console.log('开门中...')
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
	margin: 1px 10px;
}
.text-red {
	 color: red;
}
</style>
