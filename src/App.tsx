import { routes } from '@/routes/';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import config from '@/themes/dark';
const App = (): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              wireframe: false,
            },
            algorithm: theme.darkAlgorithm,
          }}
        >
          {routes}
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default App;
