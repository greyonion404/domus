import { supabase } from "../supabaseClient";

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

export { getUserWithAuth0ID, addAuth0UserToDatabase }