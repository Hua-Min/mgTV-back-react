import React,{Component} from 'react';

import { Table, Button, Card,Modal,message } from 'antd';
import {sowingList,deleteSowing,getSingleSowing} from './../../api/sowing'



class Sowing extends Component{

  state = {
    data:[]
  }
  columns = [
  {
    title: '标题',
    dataIndex: 'title',
     key: 'title',
     width: 200,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 250,
    
  },
  {
    title: '链接地址',
    dataIndex: 'imgURL',
    key: 'imgURL',
    width: 200,
    ellipsis: true,
  },
  {
    title: '缩略图',
    dataIndex: 'imgURL',
    key: 'pic',
    width:300,
    render: (url) => (<img src={url} alt='pic' width='250
    %' height="80px"></img>)
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: '_id',
    render: (id) => (
      <div><Button type="primary" onClick={() => this.handleEdit(id)}   style={{marginRight:'20px'}}>编辑</Button>
      <Button type="danger" onClick={()=>this.handleDelete(id)}>删除</Button></div>
    )
  },
];

  handleDelete(id) {
    return (
       Modal.confirm({
          title: '确定要删除这条轮播图吗!!!',
          content: '再也不见',
         onOk() {
           deleteSowing(id).then(result => {
             if (result.data.status === 200) {
               message.success('成功删除')
              window.location.reload()
             } else {
               message.success('删除失败')
             }
           })
          },
          onCancel() {
            // console.log('Cancel');
          },
      })
    )
  }
  handleEdit(id) {
   getSingleSowing(id).then(res => {
    this.props.history.push({pathname:'/edit',state:res.data.result})
    })
    
  }
  handleAdd() {
    this.props.history.push('/edit')
  }
  
// 初始化
  componentDidMount() {
    sowingList().then(res => {
      if (res.status === 200) {
        // console.log(res.data.result);
        this.setState({
          data:res.data.result
        })
      }
    })
  }
    render() {
        const extra = (<Button type="primary" onClick={()=>this.handleAdd()}>添加</Button>)
        return (
              <div>
                 <Card title="轮播图" extra={extra} style={{ width: '100%' }}>
                    <Table pagination={{pageSize: 6}} columns={this.columns} dataSource={this.state.data} />
                  </Card>
              </div>
        )
    }
}

export default Sowing;