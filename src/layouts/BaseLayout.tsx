import { Layout, Menu } from 'antd';

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      {children}
      <Layout.Footer className='absolute bottom-0 w-full'></Layout.Footer>
    </Layout>
  );
}
