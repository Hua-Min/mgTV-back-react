import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/hot/api/',
  timeout: 10000,
  headers: {'Content-Type': 'multipart/form-data'}
});

// 获取全部list
export const hotList = (name) => {
  return instance.get(`list/${name}`)
}

// add
export const addHot = (name,data) => {
 return instance.post(`add/${name}`,data)
}
// 删除一条
export const deleteHot = (name,id) => {
 return instance.get(`delete/${id}/${name}`)
}
// 获取一条
export const getSingleHot = (name,id) => {
 return instance.get(`getSingle/${id}/${name}`)
}
// 编辑
export const editHot = (name,id,data) => {
 return instance.post(`edit/${id}/${name}`,data)
}
