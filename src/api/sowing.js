import axios from 'axios'


const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {'Content-Type': 'multipart/form-data'}
});

// 获取全部list
export const sowingList = () => {
  return instance.get('/sowing/api/list')
}

// add
export const addSowing = (data) => {
 return instance.post('/sowing/api/add',data)
}
// 删除一条
export const deleteSowing = (id) => {
 return instance.get(`/sowing/api/delete/${id}`)
}
// 获取一条
export const getSingleSowing = (id) => {
 return instance.get(`/sowing/api/getonesowing/${id}`)
}
// 编辑
export const editSowing = (data) => {
 return instance.post('/sowing/api/edit/',data)
}
