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

async function changeNameOfUser(userID, name) {

    const { data, error } = await supabase
        .from('users')
        .update({ name: name })
        .eq("authID", userID)

    return { updatedProfile: data, updateError: error }
}

async function addPropertyToDatabase(property) {
    const { data, error } = await supabase
        .from('properties')
        .insert([property])

    return { insertedProperty: data, insertError: error }
}

async function addPropertyIdToOwner(propertyID, profile) {

    let updatedOwnedProperties = [...profile.ownedProperties, propertyID]
    const { data, error } = await supabase
        .from('users')
        .update({ ownedProperties: updatedOwnedProperties })
        .eq("authID", profile.authID)

    return { updatedProfile: data, updateError: error }

}

async function getOwnedPropertiesOfUser(ID) {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('ownerID', ID);
    return { data, error };
}


async function deleteOwnedPropertyByID(ID) {
    const { data, error } = await supabase
        .from('properties')
        .delete()
        .match({ propertyID: ID });

    return { data, error };
}

async function deleteOwnedPropertyFromOwner(propertyID, profile) {
    let updatedOwnedProperties = [...profile.ownedProperties];
    updatedOwnedProperties = updatedOwnedProperties.filter((currentID) => (currentID !== propertyID));
    console.log(updatedOwnedProperties);
    const { data, error } = await supabase
        .from('users')
        .update({ ownedProperties: updatedOwnedProperties })
        .eq("authID", profile.authID)

    return { updatedProfile: data, updateError: error }

}

async function updatePropertyByID(propertyID, property) {

    const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq("propertyID", propertyID)

    return { updatedProperty: data, updateError: error }
}

async function getPropertyBySecretKey(KEY) {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('propertySecretKey', KEY);
    return { data, error };
}

export {
    getUserWithAuth0ID, 
    addAuth0UserToDatabase, 
    changeNameOfUser,

    getOwnedPropertiesOfUser, getPropertyBySecretKey,
    addPropertyToDatabase, addPropertyIdToOwner, 
    updatePropertyByID,
    deleteOwnedPropertyByID, deleteOwnedPropertyFromOwner,

}