import { Button } from 'react-bootstrap';

export default function LoginButton() {
  return (
    <Button
      variant="primary"
      rel="noreferrer"
      href="/oauth2/authorization/google"
    >
      Login with Google
    </Button>
  );
}
