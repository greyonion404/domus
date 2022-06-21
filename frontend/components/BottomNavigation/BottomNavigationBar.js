import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { ImNotification } from 'react-icons/im'
import { RiAddCircleFill } from 'react-icons/ri'


import {
    getPersistantState, 
    useStorePersistance, 
    useUserPreferencesStore
} from "../../store";
import { Text } from "../../styles/Text";
import { NavbarContainer, NavbarMain, NavLink, centerChilds } from "./BottomNavbar.styles";


function OwnerNavigation() {

    const PAGES =
    {
        ADD_OWNED_PROPERTY: 'ADD_OWNED_PROPERTY',
        HOME: 'HOME',
        NOTIFICATION: 'NOTIFICATION',
    }

    const Router = useRouter();
    const [currentPage, setCurrentPage] = useState(PAGES.HOME);

    useEffect(() => {
        if (!Router.pathname) return;
        if (Router.pathname.includes('add-owned-property')) setCurrentPage(PAGES.ADD_OWNED_PROPERTY);
        else if (Router.pathname.includes('owner-complaint-notifications')) setCurrentPage(PAGES.NOTIFICATION);
        else setCurrentPage(PAGES.HOME);
    }, [Router.pathname]);


    return (
        <NavbarMain>
            <NavLink active={(currentPage === PAGES.ADD_OWNED_PROPERTY)} onClick={() => { Router.push('/add-owned-property') }}>
                <Text size={3} style={centerChilds}>
                    <RiAddCircleFill />
                </Text>
            </NavLink>
            <NavLink active={(currentPage === PAGES.HOME)} onClick={() => { Router.push('/') }}>
                <Text size={3} style={centerChilds}>
                    <FaHome />
                </Text>
            </NavLink>
            <NavLink active={(currentPage === PAGES.NOTIFICATION)} onClick={() => { Router.push('/owner-complaint-notifications') }}>
                <Text size={3} style={centerChilds}>
                    <ImNotification />
                </Text>
            </NavLink>

            <NavLink onClick={() => { Router.push('/api/auth/logout') }}>
                <Text size={3} style={centerChilds}>
                    <AiOutlineLogout />
                </Text>
            </NavLink>
        </NavbarMain>
    )
}

export default function BottomNavigationBar() {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);



    return (

        <NavbarContainer>

            {
                getPersistantState(hasPersistance, isViewingAsOwner) ?
                    <OwnerNavigation /> : null
            }

        </NavbarContainer >

    )
}
