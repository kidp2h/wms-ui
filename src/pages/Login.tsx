import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row } from 'antd';
import React, { ChangeEvent } from 'react';

const FormItem = Form.Item;

export default function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <>
      <Form
        className='w-1/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
        onFinish={(v) => {
          console.log(v);
        }}
      >
        <FormItem
          name='username'
          rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
          className=''
        >
          <Input
            placeholder={`Mã nhân viên`}
            size='large'
            variant='filled'
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              (e.target.value = e.target.value.toUpperCase())
            }
            prefix={<UserOutlined />}
          />
        </FormItem>

        <FormItem
          name='password'
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
            required
            prefix={<LockOutlined />}
            iconRender={(visible: any) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </FormItem>

        <Row>
          <Button type='primary' className='block w-full' htmlType='submit'>
            Đăng nhập
          </Button>
        </Row>
      </Form>
    </>
  );
}
