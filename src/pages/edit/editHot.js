import React,{Component} from "react"
import {
  Card,
  Form,
  Input,
  Button,
  message
} from 'antd';

import { addHot,editHot } from "./../../api/hot";


class EditHot extends Component{
  constructor(props) {
   super(props)
    this.state = {
      data: '',
      imgURL: '',
      imgFile: '',
      modelName:''
    };
 }

  componentDidMount() {
    this.setState((state, props) => ({
      data: props.location.state.data || '',
      modelName: props.location.state.modelName || '',
    }));   
    const pData = this.props.location.state.data || ''
    // 设置初始值
    this.props.form.setFieldsValue({
      title: pData ? pData.title :'',
      description: pData ? pData.description :'',
    });
  };

// 提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        values.id = this.state.data._id || '';
        values.parentId = this.state.data.parentId || '';
        const formData = new FormData()
        formData.append('id',values.id)
        formData.append('parenId',values.parentId)
        formData.append('title',values.title)
        formData.append('description',values.description)
        formData.append('file', this.state.imgFile)

        if (this.props.location.state.data) {

          formData.append('imgURL', this.state.data.imgURL)
          
         editHot(this.state.modelName,values.id,formData).then(result => {
          if (result.status === 200) {
            message.success('编辑成功!')
            return window.history.back()
          } else { 
             message.success('编辑失败!')
           }
         })
          return
        }
        addHot(this.state.modelName,formData).then(result => {
          if (result.status === 200) {
            message.success('添加成功!')
            return window.history.back()
          } else { 
             message.success('添加失败!')
           }
        })
      }
    });
  };

// 返回
  handleBack = () => {
    window.history.back()
  };

//设置预览图
  handleChange = () => {
    let imgData = document.getElementById('imgFile').files[0];
    this.setState({
      imgFile:imgData
    })
    this.getBase64(imgData).then((result) => {
      let newData = Object.assign({},this.state.data,{imgURL:result})
      this.setState({
        imgFile:imgData,
        data: newData
      })
   });
    
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const extra = ( <Button type="primary" onClick={()=>this.handleBack()}>返 回</Button>)
    return (
      <div>
        <Card title="编 辑" extra={extra} style={{ width: '100%' }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入正确标题!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message:  '请输入正确的描述内容!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('imgFile', {
            })(<div>
              <input type="file" id="imgFile" onChange={()=>this.handleChange()}></input>
              <img src={this.state.data.imgURL} width='50%'alt="pic"/>
            </div>)}
          </Form.Item>
        
          <Form.Item {...tailFormItemLayout}>
                <div>
                  <Button type="primary" htmlType="submit">提 交</Button>
            </div>
          </Form.Item>
        </Form>
        </Card>
      </div>
      )
    }
}

export default Form.create({name:'edit'})(EditHot)