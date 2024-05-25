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
              fontFamily: "'Poppins', sans-serif",
            },

            algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
          }}
        >
          {routes}
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default App;
