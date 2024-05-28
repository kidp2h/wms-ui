import { RoutesConfig } from '@/routes';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

const App = (): JSX.Element => {
  return (
    <>
      <CookiesProvider
        defaultSetOptions={{
          path: '/',
          secure: true,
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "'Poppins', sans-serif",
                },

                algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
              }}
            >
              <RoutesConfig />
            </ConfigProvider>
          </PersistGate>
        </Provider>
      </CookiesProvider>
    </>
  );
};

export default App;
