import { useEffect, useState } from 'react'
import { BsBack } from 'react-icons/bs';
import { FlexBox, MessengerModalContainer } from './Modals.styles'
import { Text } from '../../styles/Text';
import { TiArrowBack } from 'react-icons/ti';
import { Input, InputArea } from '../AddPropertyBox/AddPropertyBox.styles';

const MODES =
{
    THREAD_OPEN: 'THREAD_OPEN',
    THREAD_CLOSED: 'THREAD_CLOSED',
    THREAD_SEARCHING: 'THREAD_SEARCHING'
}
export default function MessengerModal({ profile, currentThreadID }) {

    const [currentMode, setCurrentMode] = useState(MODES.THREAD_CLOSED);
    const [threadID, setThreadID] = useState(currentThreadID);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (threadID) {
            setCurrentMode(MODES.THREAD_OPEN);
        }
        else
            setCurrentMode(MODES.THREAD_CLOSED);
    }, [threadID]);


    useEffect(() => {
        if (searchInput !== '')
            setCurrentMode(MODES.THREAD_SEARCHING);
        else
            setCurrentMode(MODES.THREAD_CLOSED);

    }, [searchInput]);



    if (currentMode === MODES.THREAD_OPEN) {
        return (
            <MessengerModalContainer>
                <FlexBox>
                    <Text>
                        <TiArrowBack onClick={() => { setThreadID(null); setSearchInput(''); }} />
                    </Text>
                    <Input value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
                </FlexBox>
                <Text>
                    {threadID}
                </Text>

            </MessengerModalContainer>
        )

    }
    else if (currentMode === MODES.THREAD_CLOSED) {
        return (
            <MessengerModalContainer>
                <FlexBox>
                    <Input value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
                </FlexBox>
                <Text onClick={() => { setThreadID(1) }}>
                    history, id 1
                </Text>
                <Text onClick={() => { setThreadID(2) }}>
                    history, id 2
                </Text>
            </MessengerModalContainer>
        )

    }
    else if (currentMode === MODES.THREAD_SEARCHING) {
        return (
            <MessengerModalContainer>
                <FlexBox>
                    <Input value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
                </FlexBox>
                <Text onClick={() => { setThreadID(3) }}>
                    search result, id 3
                </Text>
                <Text onClick={() => { setThreadID(4) }}>
                    search result, id 4
                </Text>
            </MessengerModalContainer>
        )
    }


}