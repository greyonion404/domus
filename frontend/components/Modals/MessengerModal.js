import { useState } from 'react'
import {MessengerModalContainer} from './Modals.styles'

const MODES =
{
    THREAD_OPEN: 'THREAD_OPEN',
    THREAD_CLOSED: 'THREAD_CLOSED',
    THREAD_SEARCHING: 'THREAD_SEARCHING'
}
export default function MessengerModal({profile, currentThreadID})
{

    const [currentMode, setCurrentMode] = useState(currentThreadID ? MODES.THREAD_OPEN : MODES.THREAD_CLOSED)
    return (
        <MessengerModalContainer>
            {JSON.stringify(profile)}
        </MessengerModalContainer>
    )
}