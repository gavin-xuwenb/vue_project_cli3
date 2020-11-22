<template>
<div>
	<div class="wrap">
	    <div class="left">
	        <div class="selectContainer">
	            <el-form :inline="true" :model="formInline" class="demo-form-inline">
	               
	                <el-form-item label="" size="mini">
	                    <el-select v-model="selected" style="width: 70px;">
	                    <el-option label="账号" value="1"></el-option>
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
				<div v-if="tableData.length>0">
					<div  class="content" style="margin-top:5px">
				      <el-table ref="multipleTable"
				          tooltip-effect="dark"
						  max-height="450"
						  @cell-click="clickRow" 
						  highlight-current-row
						  size="mini"
				          @selection-change="handleSelectionChange"
				          :data="tableData" border style="width: 100%;">
                          <el-table-column fixed prop="F999_01" label="账号" width="100"></el-table-column>
				          <el-table-column fixed prop="F999_03" label="更新日期" width="160"></el-table-column>
				      </el-table>
					</div>
				</div>
				
			</div>
	    </div>
	    <div class="right">
			<div style="padding-top:-4px;padding-bottom:4px;">
				<el-row>
				  <el-button type="primary" :disabled="true">保存</el-button>
				  <el-button type="primary">删除</el-button>
				  <el-button type="primary">添加</el-button>
				</el-row>
			</div>
			<div v-if='userInfo!=null'>
				<el-form :inline="true" ref="form" :model="userInfo">
					<el-form-item label="账号" size="mini" >
				         <el-input v-model="userInfo.F999_01"  :disabled="true"></el-input>
				    </el-form-item>
					<el-form-item label="密码" size="mini">
						<el-input v-model="userInfo.F999_02" type="password" 
							 maxlength="20" ></el-input>
					</el-form-item>
				</el-form>
				
				<div v-show="userInfo!=null">
					<el-row>
					<el-col :span="5">
						<el-table ref="multipleTable1"
							  tooltip-effect="dark"
							  max-height="600"
							  size="mini"
							  :data="userInfoAuth" border style="width: 100%;">
							  <el-table-column 
								type="selection"
								width="35">
							  </el-table-column>
							  <el-table-column  prop="name" label="人員資料管理" width="100"></el-table-column>
						</el-table>		
					</el-col>
					<el-col :span="5">
						<el-table ref="multipleTable2"
							  tooltip-effect="dark"
							  max-height="600"
							  size="mini"
							  :data="deviceAuth" border style="width: 100%;">
							  <el-table-column
								type="selection"
								width="35">
							  </el-table-column>
							  <el-table-column  prop="name" label="設備資料管理" width="100"></el-table-column>
						</el-table>	
					</el-col>
					<el-col :span="10">
						<el-table ref="multipleTable3"
							  tooltip-effect="dark"
							  max-height="450"
							  size="mini"
							  :data="reportAuth" border style="width: 100%;">
							  <el-table-column
								type="selection"
								width="35">
							  </el-table-column>
							  <el-table-column  prop="name" label="報表查詢列印" width="300"></el-table-column>
						</el-table>	
					</el-col>
					<el-col :span="4">
						<el-table ref="multipleTable4"
							  tooltip-effect="dark"
							  max-height="450"
							  size="mini"
							  :data="systemAuth" border style="width: 100%;">
							  <el-table-column
								type="selection"
								width="35">
							  </el-table-column>
							  <el-table-column  prop="name" label="系統權限設定" width="100"></el-table-column>
						</el-table>	
					</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
//import { loadOptions } from '@/utils/loading.js'
export default {
  name : "authMain",
  data () {
    return {
	  selected:"1",
      formInline: {
        inputData: '',
      },
	  totalNumber:0,
	  pageSize:10,
      tableData: [],
	  userInfo:null,
	  userInfoAuth:[{
		  id:'M11',
		  name:'人員基本資料',
		  isChecked:true
	  },{
		  id:'M12',
		  name:'卡片序號',
		  isChecked:false
	  },{
		  id:'M13',
		  name:'權限設碼',
		  isChecked:false
	  },{
		  id:'M14',
		  name:'儲存資料',
		  isChecked:false
	  },{
		  id:'M15',
		  name:'權限刪碼',
		  isChecked:false
	  },{
		  id:'M16',
		  name:'刪除資料',
		  isChecked:false
	  },{
		  id:'M17',
		  name:'新增資料',
		  isChecked:false
	  },{
		  id:'M18',
		  name:'匯入照片',
		  isChecked:false
	  },{
		  id:'M19',
		  name:'員工匯入資料',
		  isChecked:false
	  },{
		  id:'M1A',
		  name:'廠商匯入資料',
		  isChecked:false
	  },{
		  id:'M1B',
		  name:'停/啟用',
		  isChecked:false
	  },{
		  id:'M1C',
		  name:'權限批次設定',
		  isChecked:false
	  },{
		  id:'M1D',
		  name:'實際設碼查詢',
		  isChecked:false
	  },{
		  id:'M1F',
		  name:'權限群組設定',
		  isChecked:false
	  }],
	  deviceAuth:[{
		  id:'M21',
		  name:'設備狀態查詢',
		  isChecked:false
	  },{
		  id:'M22',
		  name:'設備設定',
		  isChecked:false
	  },{
		  id:'M23',
		  name:'儲存設備',
		  isChecked:false
	  },{
		  id:'M24',
		  name:'刪除設備',
		  isChecked:false
	  },{
		  id:'M25',
		  name:'新增設備',
		  isChecked:false
	  },{
		  id:'M26',
		  name:'設定設備',
		  isChecked:false
	  },{
		  id:'M27',
		  name:'重啟門禁',
		  isChecked:false
	  },{
		  id:'M28',
		  name:'刷卡間隔時間',
		  isChecked:false
	  },{
		  id:'M29',
		  name:'設備校時',
		  isChecked:false
	  },{
		  id:'M2A',
		  name:'設定時間群組',
		  isChecked:false
	  },{
		  id:'M2B',
		  name:'啟動定時開門',
		  isChecked:false
	  },{
		  id:'M2C',
		  name:'單機設碼',
		  isChecked:false
	  },{
		  id:'M2D',
		  name:'單機多筆設碼',
		  isChecked:false
	  },{
		  id:'M2E',
		  name:'單機刪碼',
		  isChecked:false
	  }],
	  reportAuth:[{
		  id: 'M31',
		  name:'刷卡紀錄',
		  isChecked:false
	  },{
		  id: 'M32',
		  name:'緊急疏散人員報表查詢',
		  isChecked:false
	  },{
		  id: 'M33',
		  name:'無塵室、員工大廳與廠商出入口進出人數報表查詢',
		  isChecked:false
	  },{
		  id: 'M34',
		  name:'門禁權限列表(資料庫)',
		  isChecked:false
	  },{
		  id: 'M35',
		  name:'門禁權限列表(控制器)',
		  isChecked:false
	  },{
		  id: 'M36',
		  name:'系統操作紀錄',
		  isChecked:false
	  },{
		  id: 'M37',
		  name:'指令執行紀錄',
		  
	  }],
	  systemAuth:[{
		  id: 'M41',
		  name:'系統權限設',
		  isChecked:false
	  }]
    }
  },
  
  watch:{
	  multipleTable1(n,o){
		  this.$nextTick( ()=> {
			  this.$refs.multipleTable1.toggleRowSelection(this.multipleTable1[0],true);
		  })
	  },
  },
  created:  function () {
      const params = {
        pageNum: 1,
		pageSize:this.pageSize
      };
	  
	  this.$http.get("/systemUser/selectAll", {"params":params}).then(res => {
	    if (res.status === 200) {
		   this.tableData = res.data.list
		   this.totalNumber = res.data.recordNumber
	    }
	  })
  },
  methods: {
    queryData: function() {
		// if(this.formInline.inputData.trim() == ''){
		// 	const params = {
		// 	  pageNum: 1,
		// 			pageSize:this.pageSize
		// 	};
			
		// 	this.$http.get("/employee/selectAll", {"params":params}).then(res => {
		// 	  if (res.status === 200) {
		// 		   this.tableData = res.data.list
		// 		   this.totalNumber = res.data.recordNumber
		// 	  }
		// 	})
		// }else{
		// 	const params = {
		// 	   cname:this.formInline.inputData,
		// 	   pageNum: 1,
		// 	   pageSize:this.pageSize
		// 	};
			
		// 	this.$http.get("/employee/getEmpByName", {params:params}).then(res => {
		// 	  if (res.status === 200) {
		// 			this.tableData = res.data.list
		// 			this.totalNumber = res.data.recordNumber
		// 	  }
		// 	})
		// }
    },
    handleClick (row) {
      console.log(row)
    },
	clickRow(row){
		var self = this;
		self.userInfo = row
		console.log(row)
		
		setTimeout(function(){
			self.userInfoAuth.filter(item=>{
				self.$refs.multipleTable1.toggleRowSelection(item,self.userInfo[item.id]);
			})
			
			self.deviceAuth.filter(item=>{
				self.$refs.multipleTable2.toggleRowSelection(item,self.userInfo[item.id]);
			})
			
			self.reportAuth.filter(item=>{
				self.$refs.multipleTable3.toggleRowSelection(item,self.userInfo[item.id]);
			})
			
			self.systemAuth.filter(item=>{
				self.$refs.multipleTable4.toggleRowSelection(item,self.userInfo[item.id]);
			})
		},500)
		
		
	},
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteRow (row) {
      console.log('删除' + row.id + '行')
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const cIndex = this.tableData.findIndex(item => item.id === row.id)
        console.log('index====>' + cIndex)
        this.tableData.splice(cIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
			console.log('current page'+index)
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
}

.pagination {
	margin-top: 1px;
	margin-left: -10px;
}

.wrap {
	display: -webkit-box;
	width:100%;
	min-height: 500px;
}
.left{
	width:23%;
	padding: 5px;
	border:1px solid #DCDFE6;
}
.right {
	width:73%;
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
</style>
