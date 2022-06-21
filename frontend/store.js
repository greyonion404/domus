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
    toggleViewerMode: () => set((state) => ({ isViewingAsOwner: !state.isViewingAsOwner })),

});
userPreferencesStore = persist(userPreferencesStore, { name: 'userPreference' });
const useUserPreferencesStore = create(userPreferencesStore);

export { useStorePersistance, useUserPreferencesStore, getPersistantState }