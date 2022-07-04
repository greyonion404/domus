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



export default function BottomNavigationBar() {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);


    const PAGES =
    {
        ADD_OWNED_PROPERTY: 'ADD_OWNED_PROPERTY',
        ADD_RENTED_PROPERTY: 'ADD_RENED_PROPERTY',
        HOME: 'HOME',
        OWNER_NOTIFICATION: 'OWNER_NOTIFICATION',
        RENTER_NOTIFICATION: 'RENTER_NOTIFICATION',
    }
    const Router = useRouter();
    const [currentPage, setCurrentPage] = useState(PAGES.HOME);

    useEffect(() => {
        if (!Router.pathname) return;
        if (Router.pathname.includes('add-rented-property')) setCurrentPage(PAGES.ADD_RENTED_PROPERTY);
        else if (Router.pathname.includes('add-owned-property')) setCurrentPage(PAGES.ADD_OWNED_PROPERTY);
        else if (Router.pathname.includes('renter-complaint-notifications')) setCurrentPage(PAGES.RENTER_NOTIFICATION);
        else if (Router.pathname.includes('owner-complaint-notifications')) setCurrentPage(PAGES.OWNER_NOTIFICATION);
        else setCurrentPage(PAGES.HOME);
    }, [Router.pathname]);

    useEffect(() => {
        if(isViewingAsOwner && currentPage === PAGES.ADD_RENTED_PROPERTY) Router.push('/add-owned-property');
        if(!isViewingAsOwner && currentPage === PAGES.ADD_OWNED_PROPERTY) Router.push('/add-rented-property');
        if(isViewingAsOwner && currentPage === PAGES.RENTER_NOTIFICATION) Router.push('/owner-complaint-notifications');
        if(!isViewingAsOwner && currentPage === PAGES.OWNER_NOTIFICATION) Router.push('/renter-complaint-notifications');

    }, [isViewingAsOwner]);



    return (

        <NavbarContainer>
            <NavbarMain>
                {
                    getPersistantState(hasPersistance, isViewingAsOwner) ?
                        <NavLink active={(currentPage === PAGES.ADD_OWNED_PROPERTY)} onClick={() => { Router.push('/add-owned-property') }}>
                            <Text size={3} style={centerChilds}>
                                <RiAddCircleFill />
                            </Text>
                        </NavLink>
                        :
                        <NavLink active={(currentPage === PAGES.ADD_RENTED_PROPERTY)} onClick={() => { Router.push('/add-rented-property') }}>
                            <Text size={3} style={centerChilds}>
                                <RiAddCircleFill />
                            </Text>
                        </NavLink>
                }


                <NavLink active={(currentPage === PAGES.HOME)} onClick={() => { Router.push('/') }}>
                    <Text size={3} style={centerChilds}>
                        <FaHome />
                    </Text>
                </NavLink>

                {
                    getPersistantState(hasPersistance, isViewingAsOwner) ?
                        <NavLink active={(currentPage === PAGES.OWNER_NOTIFICATION)} onClick={() => { Router.push('/owner-complaint-notifications') }}>
                            <Text size={3} style={centerChilds}>
                                <ImNotification />
                            </Text>
                        </NavLink>
                        :
                        <NavLink active={(currentPage === PAGES.RENTER_NOTIFICATION)} onClick={() => { Router.push('/renter-complaint-notifications') }}>
                            <Text size={3} style={centerChilds}>
                                <ImNotification />
                            </Text>
                        </NavLink>
                }


                <NavLink onClick={() => { Router.push('/api/auth/logout') }}>
                    <Text size={3} style={centerChilds}>
                        <AiOutlineLogout />
                    </Text>
                </NavLink>

            </NavbarMain>
        </NavbarContainer >

    )
}
