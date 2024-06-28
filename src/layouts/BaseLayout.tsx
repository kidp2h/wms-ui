import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className='h-full'>
      <Content className='w-full h-full'>{children}</Content>

      {/* <Footer */}
      {/*   style={{ textAlign: 'center' }} */}
      {/*   className=' hidden md:block absolute bottom-0 w-full text-sm border-t-2' */}
      {/* > */}
      {/*   Workforce Management System © {new Date().getFullYear()} */}
      {/* </Footer> */}
    </Layout>
  );
}
