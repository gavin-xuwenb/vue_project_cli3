<template>
	<!--
	   table 固定表头
	-->
<div>
    <div class="selectContainer">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.user" placeholder="姓名" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-select v-model="formInline.region" placeholder="选择部门" size="mini">
                <el-option label="研发一部" value="1"></el-option>
                <el-option label="研发二部" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-if="tableData.length>0">
      <div v-show="showTable" class="content" style="margin-top:20px">
          <el-table ref="multipleTable"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              :data="tableData" border style="width: 100%;" height="380">
              <el-table-column fixed type="selection" width="55"></el-table-column>
              <el-table-column fixed prop="id" label="ID" width="100"></el-table-column>
              <el-table-column fixed prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="date" label="日期" width="150"></el-table-column>
              <el-table-column prop="province" label="省份" width="120"></el-table-column>
              <el-table-column prop="city" label="市区" width="120"> </el-table-column>
              <el-table-column prop="address" label="地址" width="300"></el-table-column>
              <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
              <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scopeOne">
                  <el-button @click="handleClick(scopeOne.row)" type="text" size="small">查看</el-button>
                  <el-tooltip class="item" effect="dark" content="编辑内容" placement="top-start">
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除内容" placement="top-end">
                    <el-button type="primary" icon="el-icon-delete" @click="deleteRow(scopeOne.row)"></el-button>
                  </el-tooltip>
              </template>
              </el-table-column>
          </el-table>
					<div class="pagination">
						<el-pagination
						  background
							:page-size="pageSize"
						  layout="prev, pager, next, total" 
						  :total="totalNumber">
						</el-pagination>
					</div>
          <div style="margin: 20px 20px 0 20px">
              <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
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
        user: '',
        region: ''
      },
			totalNumber:999,
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
    onSubmit () {
      this.showTable = this.tableData.length > 0
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
   border:1px solid #DCDFE6;
   padding-bottom: 12px;
}

.pagination {
	float:right;
	margin-top: 5px;
	margin-right: 15px;
}
</style>
