import { LoginModel, useAuthorizeMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  StepForwardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row, notification } from 'antd';
import React, { ChangeEvent, useEffect } from 'react';
import { config } from '@/routes';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/features/auth/auth.slice';

const FormItem = Form.Item;

export default function Login() {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const dispatch = useDispatch();
  const [authorize, { data, isLoading, isSuccess, isError }] =
    useAuthorizeMutation();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (isSuccess) {
      navigate(config.dashboard.root);
    }

    if (isError) {
      api.warning({
        message: `Thông báo`,
        description: 'Đăng nhập thất bại, vui lòng thử lại.',
        placement: 'bottomRight',
      });
    }
  }, [isSuccess, isError]);
  return (
    <>
      {contextHolder}
      <Form
        className='w-full px-3 lg:w-1/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
        layout='vertical'
        size='large'
        onFinish={async (data: LoginModel) => {
          const result = await authorize(data);
          if (result.data) {
            const { data } = result.data;
            if (data) {
              dispatch(setCredentials({ accessToken: data.accessToken }));
            }
          }
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
            defaultValue={'E00001'}
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
            defaultValue={'123456'}
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
            disabled={isLoading}
          >
            Đăng nhập
          </Button>
        </Row>
      </Form>
    </>
  );
}
