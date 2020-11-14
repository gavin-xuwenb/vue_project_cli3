<template>
<div>
	<div class="wrap">
		<div v-if="mList.length>0">		    
			<el-button type="success">查询</el-button>
			<div style="margin-top: 20px;margin-bottom:20px;">
				<el-table ref="multipleTable"
					  tooltip-effect="dark"
					  highlight-current-row
					  max-height="450"

					  :data="mList" border style="width: 100%;">
					  <el-table-column
						type="selection"
						width="55">
					  </el-table-column>
					  <el-table-column  prop="add" label="机号" width="100"></el-table-column>
					  <el-table-column  prop="note00" label="名称"></el-table-column>
					  <el-table-column  prop="" label="时间" width="250"></el-table-column>
					  <el-table-column fixed="right" label="操作" width="100">
						  <template slot-scope="scopeOne">
							  <el-button type="success" plain @click="handleClick(scopeOne.row)">校时</el-button>
						  </template>
					  </el-table-column>
				</el-table>			
			</div>
			<div class="pagination" >
				<el-pagination
					background small
					:page-size="pageSize"
					@current-change="currentChange"
				  layout="prev, pager, next, total" 
				  :total="totalNumber">
				</el-pagination>
			</div>
		</div>
		<div v-else> 未查询到数据!!!</div>
	</div>
</div>
</template>

<script>
import { loadOptions } from '@/utils/loading.js'
export default {
	name : "deviceTime",
	data () {
		return {
			machineInfo:null,
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
			  }]
		}
	},
	created:  function () {
		  this.$http.get("/machine/selectAll").then(res => {
		    if (res.status === 200) {
			   this.mList = res.data.list
			   this.totalNumber = this.mList.length;
		    }
		  })
	},
	methods: {
		// 上一页,同时会触发  current-change事件
		// prevClick (index) {
		// 	console.log('pre page'+index)
		// },
		// // 下一页,同时会触发  current-change事件
		// nextClick (index) {
		// 	console.log('next page'+index)
		// },
		handleClick (row) {
		  console.log(row)
		},
		//点击数字
		currentChange (index) {
			console.log('current page'+index)
		},
		//行点击事件clickRow(row,column,event){
		// clickRow(row){
		// 	this.machineInfo = row
		// 	console.log(row)
		// }
	}
}
</script>

<style scoped="scoped">
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
	width:60%;
	text-align:center;
    margin:10px auto;
}
</style>
