<template>
	<div class="home-item">
		<div>
			<div v-for="n in 6" :class="connect? 'circle circleGreen' : 'circle circleRed'" :key="n"></div>
		</div>
		<img class="home-img"  src='~/assets/images/server.jpeg' alt="">
		<div class="home-right">
		  <span>{{item.name}}</span>
		  <span v-if="connect" class="el-icon-success fontGreen">
			  已连接
		  </span>
		  <span v-else class="el-icon-error fontRed">
			  未连接
		  </span>
		  <div class="openBtn">
			<el-button type="primary" plain :disabled="!connect" @click="openDoor">远端开门</el-button>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
	name : "sigleMachine",
	props:['item'],
	data () {
	    return {
			connect:false
	    }
	},

	mounted:  function () {
		if(this.item.ipadd && this.item.ipPort){
			let params = {"ip":this.item.ipadd,"port":this.item.ipPort};
			
			this.$http.get("/machine/checkCon", {"params":params}).then(res => {
			  if (res.status === 200) {
				this.connect = res.data === 1?true:false
			  }
			})
		}
		
	},
	methods: {
		openDoor () {
			let _this = this;
			console.log(_this.item.add)
			let params = {
				"tid":Number(_this.item.add),
				"ip":_this.item.ipadd,
				"port":_this.item.ipPort
			}
			_this.$http.get("/machine/openDoor", {"params":params}).then(res => {
				if (res.status === 200) {
					_this.$alert('完成！', '远程开门', {
						 confirmButtonText: '确定'
					});
				}else{
					_this.$alert('失败！', '远程开门', {
						 confirmButtonText: '确定'
					});
				}
			})
		}
	}
}
</script>

<style scoped="scoped">
/*div均分自动换行*/
.home-item {
	  border-style:solid;
	  border-width: 1px;
	  border-color: #E4E4E4;
	  width: calc(18% - 15px);
	  padding: 20px 0px 20px 10px;
	  margin-left: 24px;
	  margin-bottom: 10px;
	  display:flex;
	  align-items: center;
	  background: #fff;
	  
}
.home-img {
        display: inline-block;
        width: 60px;
        margin: 0;
        padding: 0;
      }
.home-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 10px
}

.home-num {
	  font-size: 40px;
	  margin: 5px 0;
}
.circle {
	margin-bottom:4px;
    width: 15px;
    height: 15px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
.circleRed{
	background-color: firebrick;
}
.circleGreen{
	background-color: seagreen;
}	
.fontRed{
	font-size: 14px;
	color: red;
}
.fontGreen{
	font-size: 14px;
	color: green;
}

.openBtn{
	height: 35px;
	margin-top: 20px;
}
</style>
