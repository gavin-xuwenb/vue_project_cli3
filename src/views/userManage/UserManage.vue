<template>
<div>
	<div class="wrap">
	    <div class="left">
	        <div class="selectContainer">
	            <el-form :inline="true" :model="formInline" class="demo-form-inline">
	               
	                <el-form-item label="部门" size="mini">
	                    <el-select v-model="formInline.region" placeholder="选择部门" style="width: 100px;">
	                    <el-option label="研发一部" value="1"></el-option>
	                    <el-option label="研发二部" value="2"></el-option>
	                    </el-select>
	                </el-form-item>
					<el-form-item label="姓名" size="mini">
					    <el-input v-model="formInline.user" placeholder="姓名" style="width: 60px;"></el-input>
					</el-form-item>
	                <el-form-item size="mini">
	                    <el-button type="primary" @click="queryData" >查询</el-button>
	                </el-form-item>
	            </el-form>
	        </div>
			<div>
				<div v-if="tableData.length>0">
					<div v-show="showTable" class="content" style="margin-top:5px">
				      <el-table ref="multipleTable"
				          tooltip-effect="dark"
						  max-height="450"
						  size="mini"
				          @selection-change="handleSelectionChange"
				          :data="tableData" border style="width: 100%;">
                          <el-table-column fixed prop="name" label="姓名" width="70"></el-table-column>
				          <el-table-column fixed prop="id" label="ID" width="100"></el-table-column>
				          <el-table-column prop="zip" label="卡号" width="120"></el-table-column>
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
import { loadOptions } from '@/utils/loading.js'
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
	  totalNumber:9999,
	  pageSize:10,
      tableData: [{
        id: 12311,
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 12312,
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        id: 12313,
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        id: 12314,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12315,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12316,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12317,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12318,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12319,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        id: 12319,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      showTable: false
    }
  },
  methods: {
    order11 () {
      console.log('token=' + this.$store.state.token)
      //let loadingInstance = this.$loading(loadOptions)
      this.$axios
        .post(process.env.HOST + '/user/testToken', {'name': 'xuwenbin'})
        .then(data => {
          //loadingInstance.close()

          if (data.status === 502) {
            this.$message.error(data.msg)
          } else {
            this.$message.error(data.status)
          }
        })
        .catch(() => {
          // loadingInstance.close()
        })
    },
    queryData () {
			let loadingInstance = this.$loading(loadOptions)
			setTimeout(function(){
				loadingInstance.close()
			},500)
		this.showTable = this.tableData.length > 0
		this.currentChange(1)
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
