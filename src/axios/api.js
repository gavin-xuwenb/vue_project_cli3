//和业务对接，提供业务接口

import service from './request'

export const getUserList = data => {
  return service({
    url: '/employee/selectAll',
    method: 'get',
    data,
	params:data
  })
};

export const getEmpByName = data => {
  return service({
    url: '/employee/getEmpByName',
    method: 'get',
    data,
	params:data
  })
};


//具体组件调用的时候
// import {getUserList} from '../axios/api.js'
// export default {
//   created: async function () {
//     const params = {
//       card_no: '111'
//     };
//     let res = await getUserList(params);
//     console.log(res);
//   }
// }