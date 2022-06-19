import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Text } from '../styles/Text';
import { supabase } from '../supabaseClient';


export default function Dashboard({ profile }) {

  return (
    <>
      <div>
        <img src={profile.authUser.picture} alt={profile.authUser.nickname} />
        <Text>{profile.authUser.nickname}</Text>
        <Text>{profile.authUser.email}</Text>
      </div>
      <button>
        <a href="/api/auth/logout">Logout</a>
      </button>
    </>
  )
}

async function getUserWithAuth0ID(auth0ID) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('authID', auth0ID);

  return { data, error };
}

async function addAuth0UserToDatabase(user) {


  let item = {
    authID: user.sub,
    authUser: user,
    name: user.nickname,
    ownedProperties: [],
    rentedProperties: []
  };

  const { data, error } = await supabase
    .from('users')
    .insert([item])

  return { insertedProfile: data, insertError: error }
}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {

    const auth0User = getSession(req, res);
    // not authenticated by auth0
    if (!auth0User || !auth0User?.user) return { notFound: true };

    // authenticated by auth0
    const { data, error } = await getUserWithAuth0ID(auth0User?.user?.sub);

    // error with supabase query
    if (error || !data) return { notFound: true };

    // found auth0 user in supabase users table
    if (data.length !== 0) return { props: { profile: data[0] } }

    // auth0 user is not in supabase users table (insert user)
    if (data.length === 0) {
      let { insertedProfile, insertError } = await addAuth0UserToDatabase(auth0User.user);

      // error inserting user to supabase
      if (insertError)
        return { notFound: true };

      return { props: { profile: insertedProfile } }
    }


    return { notFound: true };

  },
});

