'use client';

import { I18n } from 'aws-amplify/utils';
import React from 'react';
import {
  Authenticator,
  ThemeProvider,
  View,
  useTheme,
  useAuthenticator,
  translations,
  Image,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/amplifyconfiguration.json';
import { useRouter } from 'next/navigation';
import authTheme from '../components/CustomTheme';
import { tokens } from '../components/Tokens';
import { CustomHeader } from '@/components/authenticator/CustomHeader';
import { CustomFooter } from '@/components/authenticator/CustomFooter';
import { CustomFormFields } from '@/components/authenticator/CustomFormFields';

I18n.putVocabularies(translations);
I18n.setLanguage('pt');

Amplify.configure(awsconfig);

export default function Home() {
  const router = useRouter();
  const customFormFields = CustomFormFields();
  const navigateToCalendar = () => {
    router.push('/calendario');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: tokens.colors.brand.primary200 }}
    >
      <ThemeProvider theme={authTheme}>
        <Authenticator formFields={customFormFields} components={components}>
          {({ signOut }) => {
            console.log(signOut);
            navigateToCalendar();
            return <div></div>;
          }}
        </Authenticator>
      </ThemeProvider>
    </div>
  );
}

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          src={'/assets/images/logo.png'}
          style={{ width: 300, height: 300 }}
          alt="DrPlantao logo"
        />
      </View>
    );
  },
  Footer() {
    return CustomFooter('© Todos os direitos reservados');
  },
  SignIn: {
    Header: () => CustomHeader('Entre na sua conta', 6),
    Footer: () => {
      const { toForgotPassword } = useAuthenticator();
      return CustomFooter(undefined, toForgotPassword, 'Esqueci minha senha');
    },
  },
  SignUp: {
    Header: () => CustomHeader('Criar uma nova conta'),
    Footer: () => {
      const { toSignIn } = useAuthenticator();
      return CustomFooter(undefined, toSignIn, 'Voltar para o login');
    },
  },
  ConfirmSignUp: {
    Header: () => CustomHeader('Digite a informação:'),
    Footer: () => CustomFooter('Footer Information'),
  },
  SetupTotp: {
    Header: () => CustomHeader('Digite a informação:'),
    Footer: () => CustomFooter('Footer Information'),
  },
  ConfirmSignIn: {
    Header: () => CustomHeader('Digite a informação:'),
    Footer: () => CustomFooter('Footer Information'),
  },
  ForgotPassword: {
    Header: () => CustomHeader('Digite a informação:'),
    Footer: () => CustomFooter('Footer Information'),
  },
  ConfirmResetPassword: {
    Header: () => CustomHeader('Digite a informação:'),
    Footer: () => CustomFooter('Footer Information'),
  },
};
