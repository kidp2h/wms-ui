import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  LoginOutlined,
  StepForwardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row } from 'antd';
import React, { ChangeEvent } from 'react';

const FormItem = Form.Item;

type LoginModel = {
  username: string;
  password: string;
};
export default function Login() {
  return (
    <>
      <Form
        className='w-full lg:w-1/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
        layout='vertical'
        size='large'
        onFinish={(data: LoginModel) => {

        }}
      >
        <FormItem
          name='username'
          rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
          label={<div className='text-sm'>Mã nhân viên</div>}
          tooltip='Mã nhân viên'
          labelAlign='right'
          className=''
        >
          <Input
            placeholder={`Mã nhân viên`}
            size='large'
            // variant='filled'
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.toUpperCase())
            }
            prefix={<UserOutlined />}
          />
        </FormItem>

        <FormItem
          name='password'
          label={<div className='text-sm'>Mật khẩu</div>}
          tooltip='Độ dài mật khẩu tối thiểu là 6 ký tự'
          rules={[
            {
              required: true,
              min: 6,
              message: 'Độ dài mật khẩu tối thiểu là 6 ký tự',
            },
          ]}
        >
          <Input.Password
            type='password'
            placeholder={`Mật khẩu`}
            size='large'
            className='placeholder:text-black'
            // variant=
            required
            prefix={<LockOutlined />}
            iconRender={(visible: any) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </FormItem>

        <Row>
          <Button
            type='primary'
            icon={<StepForwardOutlined className='text-lg ' />}
            className='block w-full uppercase text-center flex items-center justify-center text-md'
            htmlType='submit'
            size='large'
          >
            Đăng nhập
          </Button>
        </Row>
      </Form>
    </>
  );
}
