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

async function addIssueToDatabase(issue) {
    const { data, error } = await supabase
        .from('issues')
        .insert([issue])

    return { insertedIssue: data, insertError: error }
}

async function getIssuesOfProperty(propertyId) {
    const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('propertyID', propertyId);
    return { issues: data, error };
}

async function changeStatusOfIssue(issueID, currentStatus) {

    const { data, error } = await supabase
        .from('issues')
        .update({ currentStatus: currentStatus })
        .eq("id", issueID)
    return { updatedIssue: data, updateError: error }
}

async function deleteIssueOfProperty(propertyID) {
    const { data, error } = await supabase
        .from('issues')
        .delete()
        .match({ propertyID: propertyID });

    return { data, error };
}



async function setClosingTimeOfIssue(issueID, issueClosedAt) {
    const { data, error } = await supabase
        .from('issues')
        .update({ issueClosedAt: issueClosedAt })
        .eq("id", issueID)
    return { updatedIssue: data, updateError: error }
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

async function addHistoryToDatabase(history) {
    const { data, error } = await supabase
        .from('histories')
        .insert([history])

    return { data, error }
}


async function getRentedPropertiesOfUser(ID) {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('renterID', ID);
    return { data, error };
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



async function updatePropertyRenterID(propertyID, profile) {

    const { data, error } = await supabase
        .from('properties')
        .update({ renterID: profile.authID })
        .eq("propertyID", propertyID)

    return { updatedProperty: data, updateError: error }
}



export {
    getUserWithAuth0ID,
    addAuth0UserToDatabase,
    changeNameOfUser,
    getRentedPropertiesOfUser,
    getOwnedPropertiesOfUser, getPropertyBySecretKey,
    addPropertyToDatabase,
    updatePropertyByID, updatePropertyRenterID,
    deleteOwnedPropertyByID,
    addIssueToDatabase,
    getIssuesOfProperty,
    changeStatusOfIssue,
    setClosingTimeOfIssue,
    deleteIssueOfProperty,
    addHistoryToDatabase,

}