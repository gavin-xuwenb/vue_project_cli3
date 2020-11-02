<template>
<div>
    <div class="selectContainer">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="formInline.mname" placeholder="输入名称进行过滤" clearable></el-input>
            </el-form-item>
        </el-form>
    </div>
	
	<div v-if="filterList.length>0" style="margin:0 auto;">
		<div class="home-card">
			<div class="home-item" v-for="(item,index) in filterList" :key="item.seq+index">
				<div>
					<div v-for="n in 6" :class="item.connect? 'circle circleGreen' : 'circle circleRed'" :key="n"></div>
				</div>
				<img class="home-img"  src='~/assets/images/server.jpeg' alt="">
				<div class="home-right">
				  <span>{{item.name}}</span>
				  <span v-if="item.connect" class="el-icon-success fontGreen">
					  已连接
				  </span>
				  <span v-else class="el-icon-error fontRed">
					  未连接
				  </span>
				  <div class="openBtn">
					<el-button type="primary" plain :disabled="!item.connect">远端开门</el-button>
				  </div>
				</div>
			</div>
		</div>
    </div>
</div>
</template>

<script>
import { loadOptions } from '@/utils/loading.js'
export default {
name : "deviceCheck",
data () {
    return {
      formInline: {
        mname: ''
      },
      mList: [{
        seq: 1,
		add:"0001",
		note00:'0001-721',
		note1:'0001-721',
		note2:'0001-1',
		note3:'',
		note4:'',
		note5:'',
		connect:true
      }, {
        seq: 2,
        add:"0002",
		note00:'0002-716',
		note1:'0002-716',
		note2:'',
		note3:'',
		note4:'',
		note5:'',
		connect:false
      }, {
        seq: 3,
        add:"0003",
		note00:'0003-206',
		note1:'0003-206',
		note2:'0003-2',
		note3:'',
		note4:'',
		note5:'',
		connect:false
      }, {
        seq: 4,
        add:"0004",
		note00:'0004-800',
		note1:'0004-800',
		note2:'0004-800-2',
		note3:'',
		note4:'',
		note5:'',
		connect:false
      }]
    }
  },
  computed:{
	realList:function(){
		let list = [];
		this.mList.forEach(function(item) {
			// mList 中，每条数据里面含有32个note+字段，每个有值的字段，代表一个读
			for(let i=1;i<33;i++){
				let column = 'note'+i
				if(item[column]){
					list.push({'seq':item.seq,'add':item.add,'name':item[column],'connect':item.connect})
				}
			}
		})
		return list
	},
	
	//根据realList，进行过滤，一般realList只计算一次
	filterList:function(){
		if(this.realList && this.realList.length>0){
			let mname = this.formInline.mname.trim()
			if(mname){
				return this.realList.filter((item)=>{
				    return item.name.indexOf(mname) >-1
				})
			}else{
				return this.realList
			}
		}else{
			return []
		}
		
	}
  },
  methods: {
	tabClick (tab) {
		this.activeName = tab.name
	},
    queryData () {
		let loadingInstance = this.$loading(loadOptions)
		setTimeout(function(){
			loadingInstance.close()
		},2000)
        // this.showTable = this.tableData.length > 0
    }
  }
}
</script>
<style scoped="scoped">
	
.selectContainer{
    height: 40px;
    padding: 6px 10px 0 10px;
    border:1px solid #DCDFE6;
    border-radius: 10px;
    text-align: center;
}
.content{
   margin-top:5px;
   border:1px solid #DCDFE6;
   padding-bottom: 12px;
   text-align: center;
}


.home-card {
    width:100%;
    overflow:hidden;
    padding:10px 0px;
    display:flex;
    flex-wrap: wrap;
}
/*div均分自动换行*/
.home-card  .home-item {
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
.home-card  .home-img {
        display: inline-block;
        width: 60px;
        margin: 0;
        padding: 0;
      }
.home-card .home-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 10px
}

.home-card .home-num {
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
.clearfix:after {
    clear: both;
}
.clearfix:after, .clearfix:before {
    content: "";
    display: table;
}
</style>
