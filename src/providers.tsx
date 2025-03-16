// import RoutersProvider from "utlis/navigation/provider/routers";
import ErrorBoundaryProvider from "utlis/library/helpers/error-handler/ErrorBoundaryProvider";
import FallBackUI from "components/fallback-ui";
import { ConfigProvider, theme as antdTheme} from "antd";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "store/store";
import AppLocale from "utlis/config/translation";
import { IntlProvider } from "react-intl";
import { useEffect, useLayoutEffect } from "react";
import ToastProvider from "components/ToastProvider/index";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { FileBasedProvider } from "react-router-filebased";
import themeSwitcherActions from "store/themeSwitcher/actions";
import instance from "utlis/library/helpers/axios";
import FileBasedProvider from "routers/components/Provider";
const { changeTheme } = themeSwitcherActions;
type Locale = keyof typeof AppLocale;
const queryClient = new QueryClient()

function AppProvider() {
  const dispatch = useDispatch();
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );
  const {themeName , isDark} = useSelector(
    ({ ThemeSwitcher }: { ThemeSwitcher: ISelectedTheme }) =>
      ThemeSwitcher
  );

  const reChangeTheme = () => {
    dispatch(changeTheme("system"));
  };

  const dir = locale === "ar" ? "rtl" : "ltr";
  const currentAppLocale = AppLocale[locale as Locale];
  useLayoutEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    instance.defaults.headers.common['Accept-Language'] = locale==="ar"? "ar-EG" :"en-US"; // Update the Accept-Language header
    instance.defaults.headers.common['X-Language'] = locale==="ar"? "ar" :"en"; // Update the Accept-Language header
  }, [locale, dir]);
  useEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (themeName === "system") {
      darkModePreference.addEventListener("change", reChangeTheme);
    }
    return () => {
      if (themeName === "system") {
        darkModePreference.removeEventListener("change", reChangeTheme);
      }
    };
  }, [themeName]);

  useLayoutEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  
  return (
    <ErrorBoundaryProvider fallBackUIComponent={<FallBackUI />}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <ConfigProvider
          locale={currentAppLocale.antd}
          direction={dir}
          theme={{
            algorithm: antdTheme[isDark?"darkAlgorithm":"defaultAlgorithm"],
            token: {
              colorPrimary: "#2a3c90",
              // colorPrimaryBg: "#3730a3",
              // colorBorder: "#3730a3",

              colorLink: "#2a3c90",
              colorInfo: "#2a3c90",
            },
          }}
        >
          {/* <RoutersProvider /> */}
          <QueryClientProvider client={queryClient}>
          <FileBasedProvider />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
          <ToastProvider />
        </ConfigProvider>
      </IntlProvider>
    </ErrorBoundaryProvider>
  );
}
function MainProvider() {
  return (
    <Provider store={store}>
      <AppProvider />
    </Provider>
  );
}

export default MainProvider;
