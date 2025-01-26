import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { useFinchConnect } from "react-finch-connect";

import { useStorage } from 'services';
// import { Shell } from './shell';

import Notice from './Notice';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#36B2AA',
    },
    // text: {
    //   primary: 'rgb(255,255,255)',
    // },
    secondary: {
      // This is green.A700 as hex.
      main: '#945231',
    },
    error: {
      main: '#B2363E',
    },
    success: {
      main: '#7CB236',
    },
    // text: {
    //   primary: '#fff',
    //   secondary: 'rgba(255, 255, 255, 0.7)',
    //   disabled: 'rgba(255, 255, 255, 0.5)',
    // },
  },
});

export interface AppProps { compiler: string; framework: string; }

export default function App (props: AppProps) {

  const [ message, setMessage ] = useStorage('MessageNotice', null);
  const onSuccess = ({ code }: any) => localStorage.setItem('finch-code', code);
  const onError = ({ errorMessage }: any) => console.error(errorMessage);
  const onClose = () => console.log("User exited Finch Connect");

  const { open } = useFinchConnect({
    clientId: "18806c9a-7182-4f6c-ba52-c944a4fbf978",
    // payrollProvider: '<payroll-provider-id>',
    products: ["company", "directory", "individual", "employment", "payment", "pay_statement"],
    onSuccess,
    onError,
    onClose,
  });

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => open()}>Open Finch Connect</Button>
      { message && <Notice message={message} stickMs={1500} reset={() => setMessage(null)} />}
    </ThemeProvider>
  );

}
