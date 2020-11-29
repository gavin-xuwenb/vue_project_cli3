<template>
<div> 
    <div class="wrap">
	<el-row type="flex" class="row-bg" justify="center">
		<el-col :span="10">
			<div class="border-box">
				<div class="selectContainer">
				    <el-form :inline="true" :model="form1" class="demo-form-inline">
				        <el-form-item label="" size="mini">
				            <el-input v-model="form1.id" style="width: 100px;" placeHolder="人员编号"></el-input>
				        </el-form-item>
						<el-form-item label="" size="mini">
						    <el-input v-model="form1.name" style="width: 100px;" placeHolder="姓名"></el-input>
						</el-form-item>
				        <el-form-item size="mini">
							<el-input v-model="form1.cardNo" style="width: 100px;" placeHolder="卡号"></el-input>
				        </el-form-item>
				    </el-form>
				</div>
				<div>
					<div>
						<div  class="content" style="margin-top:5px">
					      <el-table ref="multipleTable"
					          tooltip-effect="dark"
							  max-height="365"
							  highlight-current-row
							  size="mini"
					          @selection-change="handleSelectionChange"
					          :data="tableData1" border style="width: 100%;">
							  <el-table-column
								type="selection"
								width="55">
							  </el-table-column>
							  <el-table-column fixed prop="empno" label="人员编号" width="120"></el-table-column>
				              <el-table-column fixed prop="cname" label="姓名" width="100"></el-table-column>
					          <el-table-column prop="cardno" label="卡号" width="120"></el-table-column>
					      </el-table>
						</div>
						<div v-show="showTable1" class="pagination" >
							<el-pagination
							    background small
								:page-size="pageSize"
								@current-change="currentChange1"
							  layout="prev, pager, next, total" 
							  :total="totalNumber1">
							</el-pagination>
						</div>
					</div>
					
				</div>
			</div>
		</el-col>
		<el-col :span="4">
			<div class="actionBtn">
				<el-button-group>
				  <el-button type="primary" icon="el-icon-arrow-left"></el-button>
				  <el-button type="primary" icon="el-icon-arrow-right"></el-button>
				</el-button-group>
			</div>
		</el-col>
		<el-col :span="10">
			<div class="border-box">
				<div class="selectContainer">
				    <el-form :inline="true" :model="form2" class="demo-form-inline">
				       
				        <el-form-item label="" size="mini">
				            <el-input v-model="form2.id" style="width: 100px;"  placeHolder="人员编号"></el-input>
				        </el-form-item>
						<el-form-item label="" size="mini">
						    <el-input v-model="form2.name" style="width: 100px;"  placeHolder="姓名"></el-input>
						</el-form-item>
				        <el-form-item size="mini">
				            <el-input v-model="form2.cardNo" style="width: 100px;"  placeHolder="卡号"></el-input>
				        </el-form-item>
				    </el-form>
				</div>
				<div>
					<div>
						<div  class="content" style="margin-top:5px">
					      <el-table ref="multipleTable"
					          tooltip-effect="dark"
							  max-height="365"
							  highlight-current-row
							  size="mini"
					          @selection-change="handleSelectionChange"
					          :data="tableData2" border style="width: 100%;">
							  <el-table-column
								type="selection"
								width="55">
							  </el-table-column>
							  <el-table-column fixed prop="empno" label="人员编号" width="120"></el-table-column>
				              <el-table-column fixed prop="cname" label="姓名" width="100"></el-table-column>
					          <el-table-column prop="cardno" label="卡号" width="120"></el-table-column>
					      </el-table>
						</div>
						<div v-show="showTable2" class="pagination" >
							<el-pagination
							    background small
								:page-size="pageSize"
								@current-change="currentChange2"
							  layout="prev, pager, next, total" 
							  :total="totalNumber2">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      form1: {
        id: '',
		name:'',
		cardNo:''
      },
	  form2: {
	    id: '',
		name:'',
		cardNo:''
	  },
	  totalNumber1:0,
	  totalNumber2:0,
	  pageSize:20,
      tableData1: [],
	  tableData2: [],
      showTable1: false,
	  showTable2: false
    }
  },
  created:  function () {
      const params = {
        pageNum: 1,
		pageSize:this.pageSize
      };
	  
	  this.$http.get("/employee/selectAll", {"params":params}).then(res => {
	    if (res.status === 200) {
		   this.tableData1 = res.data.list
		   this.totalNumber1 = res.data.recordNumber
		   this.showTable1 = true
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
				   this.tableData1 = res.data.list
				   this.totalNumber1 = res.data.recordNumber
				   this.showTable1 = true
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
					this.tableData1 = res.data.list
					this.totalNumber1 = res.data.recordNumber
					this.showTable1 = true;
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
	currentChange1 (index) {
		const params = {
			pageNum: index,
			pageSize:this.pageSize
		};
		this.$http.get("/employee/selectAll", {"params":params}).then(res => {
		  if (res.status === 200) {
			   this.tableData1 = res.data.list
			   this.totalNumber1 = res.data.recordNumber
			   this.showTable1 = true
		  }
		})
	},
	
	currentChange2 (index) {
		console.log('current page'+index)
		const params = {
			pageNum: index,
			pageSize:this.pageSize
		};
		
		this.$http.get("/employee/selectAll", {"params":params}).then(res => {
		  if (res.status === 200) {
			   this.tableData2 = res.data.list
			   this.totalNumber2 = res.data.recordNumber
			   this.showTable2 = true
		  }
		})
	}
  }
}
</script>
<style scoped="scoped">
.wrap{
	width: 80%;
	margin: -14px auto;
	text-align: center;
}
.selectContainer{
    height: 30px;
    padding: 1px 1px 0 34px;
    text-align: center;
}

.pagination {
	margin-top: 5px;
	
}

.el-row {
	margin-bottom: 20px;
	&:last-child {
	  margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}

.actionBtn{
	height:450px;
	position: relative;
	top: 44%; /*偏移*/
}
.border-box{
	border:solid 1px dimgrey;
	border-radius: 4px;
	height: 440px;
}
</style>
