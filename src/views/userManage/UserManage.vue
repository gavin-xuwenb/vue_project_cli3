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
			
		</div>
	</div>
</div>
</template>

<script>
//import { loadOptions } from '@/utils/loading.js'
import {getUserList,getEmpByName} from '@/axios/api.js'
export default {
  data () {
    return {
      formInline: {
        inputData: '',
        region: ''
      },
	  totalNumber:0,
	  pageSize:10,
      tableData: [],
      showTable: false
    }
  },
  created: async function () {
      const params = {
        pageNum: 1,
		pageSize:this.pageSize
      };
      let res = await getUserList(params)
      this.tableData = res.list
	  this.totalNumber = res.recordNumber
  },
  methods: {
    queryData:async function() {
		if(this.formInline.inputData.trim() == '') return false;
		//let loadingInstance = this.$loading(loadOptions)
		const params = {
		   cname:this.formInline.inputData,
		   pageNum: 1,
		   pageSize:this.pageSize
		};
		let res = await getEmpByName(params)
		this.tableData = res.list
		this.totalNumber = res.recordNumber
		
		//this.currentChange(1)
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
</style>
