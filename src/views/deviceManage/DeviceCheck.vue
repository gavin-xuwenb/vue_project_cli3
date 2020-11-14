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
			<template v-for="(item,index) in filterList">
				<sigleMachine :item="item" :key="item.seq+index"></sigleMachine>
			</template>
		</div>
    </div>
</div>
</template>

<script>
import sigleMachine from '@/components/SigleMachine.vue'
export default {
	name : "deviceCheck",
	components : {
		sigleMachine
	},
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
		note5:''
      }, {
        seq: 2,
        add:"0002",
		note00:'0002-716',
		note1:'0002-716',
		note2:'',
		note3:'',
		note4:'',
		note5:''
      }, {
        seq: 3,
        add:"0003",
		note00:'0003-206',
		note1:'0003-206',
		note2:'0003-2',
		note3:'',
		note4:'',
		note5:''
      }, {
        seq: 4,
        add:"0004",
		note00:'0004-800',
		note1:'0004-800',
		note2:'0004-800-2',
		note3:'',
		note4:'',
		note5:''
      }]
    }
  },
  created:  function () {
  	  this.$http.get("/machine/selectAll").then(res => {
  	    if (res.status === 200) {
  		   this.mList = res.data.list
  	    }
  	  })
  },
  computed:{
	realList:function(){
		let list = [];
		this.mList.forEach(function(item) {
			// mList 中，每条数据里面含有32个note+字段，每个有值的字段，代表一个读
			for(let i=1;i<33;i++){
				let column = 'note'+i
				if(item[column]){
					list.push({'seq':item.seq,'add':item.add,'name':item[column],'ipadd':item.ipadd,'ipPort':item.ipPort})
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

.clearfix:after {
    clear: both;
}
.clearfix:after, .clearfix:before {
    content: "";
    display: table;
}
</style>
