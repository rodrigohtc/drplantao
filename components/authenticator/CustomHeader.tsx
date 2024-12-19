import { Heading, useTheme, HeadingLevel } from '@aws-amplify/ui-react';

export const CustomHeader = (text: string, level = 5) => {
  const { tokens } = useTheme();
  return (
    <Heading
      padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
      level={level as HeadingLevel}
    >
      {text}
    </Heading>
  );
};
