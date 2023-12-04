import { Button, ButtonProps, Group } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';
import { GoogleIcon } from './GoogleIcon.tsx';

export function GoogleButton(props: ButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon size="1rem" color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}

export function SocialButtons() {
    return (
      <Group position="center" sx={{ padding: 15 }}>
        <GoogleButton>Continue with Google</GoogleButton>
        <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
          Follow on Twitter
        </TwitterButton>
      </Group>
    );
  }