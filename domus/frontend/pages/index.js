import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Profile({ user }) {

  return (
    <>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <a href="/api/auth/logout">Logout</a>
    </>
  )

}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    if (!auth0User) return { notFound: true };
    return { props: { user: auth0User } };
  },
});

