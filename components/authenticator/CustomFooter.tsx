import { View, Text, Button } from '@aws-amplify/ui-react';

export const CustomFooter = (
  text?: string,
  buttonAction?: () => void,
  buttonLabel?: string
) => {
  return (
    <View textAlign="center">
      {text && <Text>{text}</Text>}
      {buttonAction && buttonLabel && (
        <Button
          fontWeight="normal"
          onClick={buttonAction}
          size="small"
          variation="link"
        >
          {buttonLabel}
        </Button>
      )}
    </View>
  );
};
