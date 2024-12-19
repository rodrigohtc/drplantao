import { Theme } from '@aws-amplify/ui-react';
import { tokens } from './Tokens';

const authTheme: Theme = {
  name: 'Auth Example Theme',
  tokens: {
    components: {
      authenticator: {
        router: {
          boxShadow: '0 0 16px rgba(0, 0, 0, 0.1)',
          borderWidth: '1px',
          borderColor: tokens.colors.border.primary,
          backgroundColor: tokens.colors.background.white,
        },
        form: {
          padding: `${tokens.space.medium} ${tokens.space.large} ${tokens.space.medium}`,
        },
      },
      button: {
        primary: {
          backgroundColor: tokens.colors.brand.primary500,
          color: tokens.colors.neutral.neutral600,
          _hover: {
            backgroundColor: tokens.colors.brand.primary900,
          },
        },
        link: {
          color: tokens.colors.brand.primary900,
        },
      },
      fieldcontrol: {
        _focus: {
          borderColor: tokens.colors.neutral.neutral600,
          boxShadow: `0 0 0 4px ${tokens.colors.neutral.neutral600}`,
        },
      },
      tabs: {
        item: {
          color: tokens.colors.neutral.neutral400,
          _active: {
            borderColor: tokens.colors.brand.primary500,
            color: tokens.colors.brand.primary900,
          },
        },
      },
      text: {
        color: tokens.colors.neutral.neutral600,
      },
    },
  },
};

export default authTheme;
