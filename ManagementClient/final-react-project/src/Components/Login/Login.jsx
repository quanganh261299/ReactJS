import React, {useState, useContext} from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import axios, { isCancel, AxiosError } from "axios";
import { loginAPI } from '../../enviroment';
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom';
import SetCurrentContext from '../../context/Current';

const Login = () => {

  const[formItems, setFormItems] = useState({username: '', password: ''});

  const setCurrent = useContext(SetCurrentContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('username', formItems.username);
    formData.append('password', formItems.password);

  
    axios.post(loginAPI, formData)
      .then(response => {
        console.log(response);
        const token  =  response.headers['authorization'];
        localStorage.setItem("token", token);
  
        //set token to axios common header
        setAuthToken(token);

        setCurrent('departments'); 
        navigate('/departments');
      })
      .catch(err => console.log(err));
  };

  const handleChangeInput = (event) => {
    const formName = event.target.name;
    const value = event.target.value;
    setFormItems({
      ...formItems,
      [formName]: value,
  });
  }

    return(
      <Row justify="center" align="middle" style={{minHeight: '82vh'}}>
        <Col span={10}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={() => {}}
              onFinishFailed={() => {}}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    min: 6,
                    message: 'Username must have at least 6 characters!',
                  },
                ]}
              >
                <Input 
                name='username'
                onChange={handleChangeInput}
                value={formItems.username}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Password must have at least eight characters, at least one letter and one number',
                  },
                ]}
                
                
              >
              <Input.Password 
              name='password' 
              onChange={handleChangeInput}
              value={formItems.password}/>
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </Col>
      </Row>

    )
};

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}

export default Login;