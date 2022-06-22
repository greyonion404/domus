import { useEffect, useState } from 'react';
import create from 'zustand'
import { persist } from 'zustand/middleware'



// persistance util
const useStorePersistance = () => {
    const [hasHydrated, setHasHydrated] = useState(false);
    useEffect(() => {
        setHasHydrated(true);
    }, []);
    return hasHydrated;
};
function getPersistantState(hasPersistance, state) {
    if (hasPersistance) return state;
}

// preferenceStore
let userPreferencesStore = (set) =>
({
    isViewingAsOwner: true,
    userID: "USER_NOT_LOGGED_IN",

    toggleViewerMode: () => set((state) => ({ isViewingAsOwner: !state.isViewingAsOwner })),
    setUserID: (userID) => set((state) => ({userID: userID})),

});
userPreferencesStore = persist(userPreferencesStore, { name: 'userPreference' });
const useUserPreferencesStore = create(userPreferencesStore);


// preferenceStore
let modalStore = (set) =>
({
    isModalOpen: false,
    toggleIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

});
const useModalStore = create(modalStore);




export {
    useStorePersistance,
    getPersistantState,

    useUserPreferencesStore,
    useModalStore,
}