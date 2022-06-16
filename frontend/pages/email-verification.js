
import { getSession } from '@auth0/nextjs-auth0';

import { Text } from '../styles/Text';
export default function EmailVerification() {
  return (
    <div>
      <Text size={1}>
        Verify your email
      </Text>
    </div>
  )
}


export const getServerSideProps = async ({ req, res }) => {
  const auth0User = getSession(req, res);
  if (auth0User)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };

  return { props: {} }
};

