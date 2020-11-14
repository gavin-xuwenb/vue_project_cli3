<template>
<div>
	<div class="wrap">
	    <div class="left">
	        <div class="selectContainer">
	            <el-form :inline="true" :model="formInline" class="demo-form-inline">
	                <el-form-item label="" size="mini">
	                    <el-select v-model="formInline.region" placeholder="请选择类别" style="width: 110px;">
	                    <el-option label="机号" value="1"></el-option>
	                    <el-option label="研发二部" value="2"></el-option>
	                    </el-select>
	                </el-form-item>
					<el-form-item label="" size="mini">
					    <el-input v-model="formInline.user" style="width: 100px;"></el-input>
					</el-form-item>
	                <el-form-item size="mini">
	                    <el-button type="primary" @click="queryData" >查询</el-button>
	                </el-form-item>
	            </el-form>
	        </div>
			<div>
				<div v-if="mList.length>0">
					<div v-show="showTable" class="content" style="margin-top:5px">
				      <el-table ref="multipleTable"
				          tooltip-effect="dark"
						  @cell-click="clickRow"
						  highlight-current-row
						  max-height="450"
						  size="mini"
				          @selection-change="handleSelectionChange"
				          :data="mList" border style="width: 100%;">
	                      <el-table-column fixed prop="add" label="机号" width="100"></el-table-column>
				          <el-table-column fixed prop="note00" label="名称"></el-table-column>
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
	name : "deviceQuery",
	data () {
		return {
			formInline: {
			  user: '',
			  region: ''
			},
			totalNumber:4,
			pageSize:10,
			mList: [{
				seq: 1,
				add:"0001",
				note00:'0001-721',
				note1:'0001-721',
				note2:'0001-1',
				note3:'',
				note4:'',
				note5:'',
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
			  }],
			showTable: false
		}
	},
	created:  function () {
		  this.$http.get("/machine/selectAll").then(res => {
		    if (res.status === 200) {
			   this.mList = res.data.list
			   this.totalNumber = this.mList.length;
			   this.showTable = this.mList.length > 0
		    }
		  })
	},
	methods: {
		queryData () {
			let loadingInstance = this.$loading(loadOptions)
			setTimeout(function(){
				loadingInstance.close()
			},500)
			this.showTable = this.mList.length > 0
			this.currentChange(1)
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
			console.log('current page'+index)
		},
		//行点击事件clickRow(row,column,event){
		clickRow(row){
			console.log(row.add)
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
	width:25%;
	padding: 5px;
	border:1px solid #DCDFE6;
}
.right {
	width:72%;
	margin-left:5px;
	padding: 10px;
	border:1px solid #DCDFE6;
}
</style>
