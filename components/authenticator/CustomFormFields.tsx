export const CustomFormFields = () => {
  return {
    signIn: {
      username: {
        placeholder: 'Digite seu e-mail',
      },
    },
    signUp: {
      password: {
        label: 'Senha:',
        placeholder: 'Digite sua senha',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirme sua senha',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Digite sua senha',
      },
    },
    forgotPassword: {
      username: {
        placeholder: 'Digite seu e-mail',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Digite seu código de confirmação',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Por favor, digite sua senha',
      },
    },
    setupTotp: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
};
