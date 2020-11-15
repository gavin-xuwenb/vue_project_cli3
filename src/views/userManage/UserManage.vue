<template>
<div>
	<div class="wrap">
	    <div class="left">
	        <div class="selectContainer">
	            <el-form :inline="true" :model="formInline" class="demo-form-inline">
	               
	                <el-form-item label="" size="mini">
	                    <el-select v-model="formInline.region" style="width: 150px;">
	                    <el-option label="员工编号" value="1"></el-option>
	                    <el-option label="卡号" value="2"></el-option>
						<el-option label="姓名" value="3"></el-option>
						<el-option label="部门代码" value="4"></el-option>
						<el-option label="部门名称" value="5"></el-option>
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
                          <el-table-column fixed prop="cname" label="姓名" width="100"></el-table-column>
				          <el-table-column fixed prop="empno" label="员工编号" width="120"></el-table-column>
				          <el-table-column prop="cardno" label="卡号" width="120"></el-table-column>
				          <!--
						  <el-table-column fixed="right" label="操作" width="220">
				          <template slot-scope="scopeOne">
				              <el-button @click="handleClick(scopeOne.row)" type="text">查看</el-button>
				          </template>
				          </el-table-column>
						  -->
				      </el-table>
					</div>
					<div v-show="showTable" class="pagination" >
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
	    </div>
	    <div class="right">
			<div v-if='userInfo!=null'>
				<el-row>
				  <el-col :span="20">
					  <div class=" ">
						 <el-form :inline="true" :model="formInline" class="demo-form-inline">
						 	 <el-form-item label="使用群组" size="mini">
						 		 <el-input :value="userInfo.userfd7" :disabled="true" style="width: 200px;"></el-input>
						 	 </el-form-item>
						 </el-form>
						 
						 <el-form :inline="true" :model="formInline" class="demo-form-inline">
						 	 <el-form-item label="姓名" size="mini">
						 	 	<el-input :value="userInfo.cname" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="员工编号" size="mini">
						 	 	<el-input :value="userInfo.empno" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="部门代码" size="mini">
						 	 	<el-input :value="userInfo.dept" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="部门名称" size="mini">
						 	 	<el-input :value="userInfo.userfd4" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 </el-form>
						 
						 <el-form :inline="true" :model="formInline" class="demo-form-inline">
						 	 <el-form-item label="卡号" size="mini">
						 	 	<el-input :value="userInfo.cardno" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="有效期" size="mini">
						 	 	<el-input :value="userInfo.outdate" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="卡片序号" size="mini">
						 	 	<el-input :value="userInfo.seq" :disabled="true" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="门禁密码" size="mini">
						 	 	<el-input :value="userInfo.password" style="width: 100px;"></el-input>
						 	 </el-form-item>
						 	 <el-form-item label="厂商" size="mini">
						 	 	 <el-switch v-model="formInline.isvendor"></el-switch>
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
			</div>
		</div>
	</div>
</div>
</template>

<script>
//import { loadOptions } from '@/utils/loading.js'
export default {
  data () {
    return {
      formInline: {
        inputData: '',
        region: '',
		isvendor:false
      },
	  totalNumber:0,
	  pageSize:10,
      tableData: [],
      showTable: false,
	  userInfo:null
    }
  },
  created:  function () {
      const params = {
        pageNum: 1,
		pageSize:this.pageSize
      };
	  
	  this.$http.get("/employee/selectAll", {"params":params}).then(res => {
	    if (res.status === 200) {
		   this.tableData = res.data.list
		   this.totalNumber = res.data.recordNumber
	    }
	  })
  },
  methods: {
    queryData: function() {
		if(this.formInline.inputData.trim() == ''){
			const params = {
			  pageNum: 1,
					pageSize:this.pageSize
			};
			
			this.$http.get("/employee/selectAll", {"params":params}).then(res => {
			  if (res.status === 200) {
				   this.tableData = res.data.list
				   this.totalNumber = res.data.recordNumber
			  }
			})
		}else{
			const params = {
			   cname:this.formInline.inputData,
			   pageNum: 1,
			   pageSize:this.pageSize
			};
			
			this.$http.get("/employee/getEmpByName", {params:params}).then(res => {
			  if (res.status === 200) {
					this.tableData = res.data.list
					this.totalNumber = res.data.recordNumber
			  }
			})
		}
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
		this.userInfo = row
		this.formInline.isvendor = row.isvendor === '1' ? true:false
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
	min-height: 550px;
}
.left{
	width:28%;
	padding: 5px;
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
</style>
