import { RoutesConfig } from '@/routes';
import { ConfigProvider, theme } from 'antd';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import locale from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('vi-vn', {});
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

                algorithm: theme.defaultAlgorithm,
              }}
              locale={locale}
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
