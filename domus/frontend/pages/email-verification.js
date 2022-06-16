
import { getSession } from '@auth0/nextjs-auth0';

export default function EmailVerification() {
  return (
    <div>
      Verify your email
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

