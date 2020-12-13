<template>
<div>
	<div class="wrap">
	    <div class="left">
	        <div class="selectContainer">
	            <el-form :inline="true" :model="formInline" class="demo-form-inline">
	               
	                <el-form-item label="" size="mini">
	                    <el-select  v-model="selected" style="width: 150px;" >
							<!--
							<el-option label="员工编号" value="1"></el-option>
							<el-option label="卡号" value="2"></el-option>
							 -->
							<el-option label="姓名" value="3"></el-option>
							<!--
							<el-option label="部门代码" value="4"></el-option>
							<el-option label="部门名称" value="5"></el-option>
							-->
	                    </el-select>
	                </el-form-item>
					<el-form-item label="" size="mini">
					    <el-input v-model="formInline.inputData" style="width: 100px;"></el-input>
					</el-form-item>
	                <el-form-item size="mini">
	                    <el-button type="primary" @click="queryData" >查询</el-button>
	                </el-form-item>
	            </el-form>
	        </div>
			<div>
				<div  class="content" style="margin-top:5px">
				  <el-table ref="multipleTable"
					  tooltip-effect="dark"
					  max-height="380"
					  @cell-click="clickRow" 
					  highlight-current-row
					  size="mini"
					  @selection-change="handleSelectionChange"
					  :data="tableData" border style="width: 100%;">
					  <el-table-column fixed prop="cname" label="姓名" width="100"></el-table-column>
					  <el-table-column fixed prop="empno" label="员工编号" width="120"></el-table-column>
					  <el-table-column prop="cardno" label="卡号" width="120"></el-table-column>
				  </el-table>
				</div>
				<div v-show="tableData.length>0" class="pagination" >
					<el-pagination
						background small
						:page-size="pageSize"
						@current-change="currentChange"
					  layout="prev, pager, next, total" 
					  :total="totalNumber">
					</el-pagination>
				</div>
			</div>
	    </div>
	    <div class="right">
			<div style="padding-top:-4px;padding-bottom:4px;">
				<el-row>
				  <el-button type="primary" :disabled="userInfo==null" @click="saveFn">存储资料</el-button>
				  <el-button type="primary" :disabled="userInfo==null" @click="setAuth">权限设码</el-button>
				</el-row>
			</div>
			
			<div v-if='userInfo!=null'>
				<el-row>
				  <el-col :span="20">
					  <div class=" ">
						 <el-form :inline="true" :model="formInline" class="demo-form-inline">
						 	 <el-form-item label="使用群组" size="mini">
						 		 <el-input :value="userInfo.userfd7" :disabled="true" style="width: 200px;"></el-input>
						 	 </el-form-item>
						 </el-form>
						 
						 <el-form :inline="true" :model="form2" class="demo-form-inline">
						 	 <el-form-item label="姓名" size="mini">
						 	 	<el-input v-model="form2.cname" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="员工编号" size="mini">
						 	 	<el-input v-model="form2.empno" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="部门代码" size="mini">
						 	 	<el-input v-model="form2.dept" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="部门名称" size="mini">
						 	 	<el-input v-model="form2.userfd4" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 </el-form>
						 
						 <el-form :inline="true" :model="form2" class="demo-form-inline">
						 	 <el-form-item label="卡号" size="mini">
						 	 	<el-input v-model="form2.cardno" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="有效期" size="mini">
						 	 	<el-input v-model="form2.outdate" style="width: 120px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="卡片序号" size="mini">
						 	 	<el-input v-model="form2.seq" :disabled="true" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="门禁密码" size="mini">
						 	 	<el-input v-model="form2.password" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="厂商" size="mini">
						 	 	 <el-switch v-model="form2.isvendor"></el-switch>
						 	 </el-form-item>
						 	 <el-form-item label="公司" size="mini">
						 	 	<el-input value="" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="电话" size="mini">
						 	 	<el-input value="" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 </el-form> 
					  </div>
				  </el-col>
				  <el-col :span="4">
					  <div class="pic">
						<img :src="'data:image/jpg;base64,'+userInfo.picBase64"/>
					  </div>
				  </el-col>
				</el-row>
				
				<div>
					<el-select v-model="form2.groupValue" placeholder="请选择">
						<el-option
					      v-for="item in groupList"
					      :key="item.F102_01"
					      :label="item.F102_02"
					      :value="item.F102_01">
					    </el-option>
					</el-select>
					&nbsp;&nbsp;&nbsp;&nbsp;
					 <el-button type="danger">套用</el-button>
					<div>
						<div class="mlist" v-for="item in machineList" :key='item.seq'>
							<el-checkbox v-for="subitem in item.subList" :key='subitem.name' v-model="subitem.isSelected">{{subitem.name}}</el-checkbox>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        inputData: ''
      },
	  form2:{
		seq:'',
		cname:'',
		dept:'',
		isvendor:'',
		password:'',
		cardno:'',
		outdate:'',
		userfd4:'',
		empno:'',
		doorsat1:''
	  },
	  selected:"3",
	  totalNumber:0,
	  pageSize:10,
	  pageNum:1,
      tableData: [],
	  userInfo:null,
	  machineList:null,
	  groupList:null,
	  checkFlag:false
    }
  },
  created:  function () {
	  var self = this;
		this.machineList = JSON.parse(sessionStorage.getItem('machineList'))
	    this.groupList = JSON.parse(sessionStorage.getItem('groupList'))
		this.machineList.forEach(function(item) {
			let list = [];
			// machineList 中，每条数据里面含有32个note+字段，每个有值的字段，代表一个读
			for(let i=1;i<33;i++){
				let column = 'note'+i
				if(item[column]){
					list.push({'seq':item.seq,'add':item.add,'name':item[column],'ipadd':item.ipadd,'ipPort':item.ipPort})
				}
			}
			//item.subList = list;
			self.$set(item,"subList",list)
		})
        this.queryData()
  },
  methods: {
    queryData: function() {
		this.pageNum = 1
		this.userInfo = null
		this.handleQuery("/employee/selectListByName")
    },
	saveFn:function(){
		this.$confirm('确认存储资料?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
			let str = ""
			this.machineList.forEach(function(item,index) {
				if(item.subList.length==1){
					let cstr1 = item.subList[0].isSelected?"1":"0"
					str += cstr1 + "0" 
				}else if(item.subList.length==2){
					let cstr1 = item.subList[0].isSelected?"1":"0"
					let cstr2 = item.subList[1].isSelected?"2":"0"
					str += (Number(cstr1) + Number(cstr2)) + "0"
				}
			})
			console.log(str)
			let doorsat1 = str.padEnd(128,'0');
			this.form2.doorsat1 = doorsat1;
			
			console.log("before update doorsat1="+this.userInfo.doorsat1)
			
			this.$http.get('/employee/updateBydoor', {params:this.form2}).then(res => {
				if (res.status === 200) {
					Object.assign(this.userInfo,this.form2)
					this.userInfo.isvendor = this.userInfo.isvendor?"1":"0"
					console.log("after update doorsat1="+this.userInfo.doorsat1)
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
				}
			})
		}).catch(() => {});
	},
	setAuth:function () {
		this.$confirm('确认权限设码?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
			this.$http.get('/employee/setAuth', {params:this.form2}).then(res => {
				if (res.status === 200) { 
					this.$message({
						type: 'success',
						message: '設碼指令傳送完成!'
					});
				}
			})
		}).catch(() => {});
	},
	handleQuery (path) {
		const params = {
		   cname:this.formInline.inputData.trim(),
		   pageNum: this.pageNum,
		   pageSize:this.pageSize
		};
		this.$http.get(path, {params:params}).then(res => {
			if (res.status === 200) {
				this.tableData = res.data.list
				this.totalNumber = res.data.recordNumber
			}
		})
	},
	
    handleClick (row) {
      console.log(row)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
	clickRow(row){
		let self  = this
		this.userInfo = row
		//this.form2 = [row]
		for(let key in this.form2){
			this.form2[key] = row[key]
		}

		this.form2.isvendor = row.isvendor === '1'?true:false
		
		self.machineList.forEach(function(item,index) {
			//计算出每个控制器开关的值0-3
			let num = row.doorsat1.substr(2*index,1)
			let list = []
			//item.subList 最多两个长度
			item.subList.forEach(function(item2,i) {
				switch(num){
					case "0":
						self.$set(item2,"isSelected",false)
						break;
					case "1":
						if(i==0) {
							self.$set(item2,"isSelected",true)
						}else{
							self.$set(item2,"isSelected",false)
						}
						break;
					case "2":
						if(i==1) {
							self.$set(item2,"isSelected",true)
						}else{
							self.$set(item2,"isSelected",false)
						}
						break;
					case "3":
						self.$set(item2,"isSelected",true)
						break;
					default:
						break;
				}
			})	
			//self.$set(self.machineList,index,item)
		})
		
		
		
	},
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
	// 上一页,同时会触发  current-change事件
	// prevClick (index) {
	// 	console.log('pre page'+index)
	// },
	// // 下一页,同时会触发  current-change事件
	// nextClick (index) {
	// 	console.log('next page'+index)
	// },
	//点击数字
	currentChange (index) {
		this.pageNum = index
		this.userInfo = null
		this.handleQuery("/employee/selectListByName")
	}
  }
}
</script>
<style scoped="scoped">
.selectContainer{
    height: 32px;
    padding: 6px 2px 0 2px;
    border:1px solid #DCDFE6;
    border-radius: 10px;
    text-align: center;
}
.content{
   border:1px solid #DCDFE6;
   padding-bottom: 12px;
   min-height:380px;
}

.pagination {
	margin-top: 1px;
	margin-left: -10px;
}

.wrap {
	display: -webkit-box;
	width:100%;
	margin-top:-14px;
}
.left{
	width:350px;
	padding: 2px;
	border:1px solid #DCDFE6;
}
.right {
	width:68%;
	margin-left:5px;
	padding: 10px;
	border:1px solid #DCDFE6;
}

.pic{
	align:center; 
}
.pic img{
	height: 160px;
	width: 124px;
	border-width: 0px;
	border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	border-radius:10px;
}
.mlist{
	height: 25px;
	border:1px solid green;
	margin:5px 0;
	padding: 6px 10px;
}
</style>
