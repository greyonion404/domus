import { useEffect, useState } from 'react'
import {
  FlexBox, Message, MessengerInputContainer, MessengerModalContainer,
  MessengerProfileImage, MessengerThreadContainer, MessengerTopbar, MessnegerSearchInput,
  MessengerTimeStamp,
  MessageSenderInfo,
  MessageProfileImage,
  MessageContent
} from './Modals.styles'
import { centerChilds, Text } from '../../styles/Text';
import { TiArrowBack } from 'react-icons/ti';
import { BiHash } from 'react-icons/bi';


const sendTo = { name: 'maruf', id: 1 };
const self = { name: 'grey', id: 2 }

const messages = [
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 2,
    senderName: "maruf",
    recieverID: 1,
    recieverName: "grey",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 2,
    senderName: "maruf",
    recieverID: 1,
    recieverName: "grey",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
  {
    id: 123123,
    senderID: 1,
    senderName: "grey",
    recieverID: 2,
    recieverName: "maruf",
    content: "this is the first demo message, hello",
    timestamp: "sunday, 28/11/2022 12:15 AM",
  },
];


const MODES =
{
  THREAD_OPEN: 'THREAD_OPEN',
  THREAD_CLOSED: 'THREAD_CLOSED',
  THREAD_SEARCHING: 'THREAD_SEARCHING'
};

function MessageContainer({ message, isSelfMessage }) {
  if (isSelfMessage === false) {
    return (
      <Message>
        <MessageSenderInfo style={{ marginLeft: "auto" }}>
          <MessageProfileImage src={"/default_profile_picture.png"} alt={message.senderName} />
          <Text style={centerChilds}>
            <BiHash />
            {message.senderName}
          </Text>
        </MessageSenderInfo>
        <MessageContent style={{ marginLeft: "auto" }}>
          <Text>
            {message.content}
          </Text>
        </MessageContent>
        <MessengerTimeStamp style={{ marginLeft: "auto" }}>
          {message.timestamp}
        </MessengerTimeStamp>
      </Message>
    )
  }
  else {
    return (
      <Message>
        <MessageSenderInfo>
          <Text style={centerChilds}>
            <BiHash />
            {message.senderName}
          </Text>
          <MessageProfileImage src={"/default_profile_picture.png"} alt={message.senderName} />
        </MessageSenderInfo>
        <MessageContent>
          <Text>
            {message.content}
          </Text>
        </MessageContent>
        <MessengerTimeStamp>
          {message.timestamp}
        </MessengerTimeStamp>
      </Message>
    )
  }
}

function Thread({ profile, threadID, setThreadID, setSearchInput }) {


  return (
    <MessengerModalContainer>
      <MessengerTopbar>
        <Text size={1} style={{ width: "max-content" }} onClick={() => { setThreadID(null); setSearchInput(''); }}>
          <TiArrowBack /> Back
        </Text>
        <MessengerProfileImage src={"/default_profile_picture.png"} alt={sendTo.name} />
        <Text size={1} style={{ width: "max-content", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BiHash />
          {sendTo.name}
        </Text>
      </MessengerTopbar>
      <MessengerThreadContainer>
        {
          messages.map((message, index) => {
            return (<MessageContainer key={index} message={message} isSelfMessage={(message.senderID === self.id)} />)
          })
        }
      </MessengerThreadContainer>
      <MessengerInputContainer>

      </MessengerInputContainer>

    </MessengerModalContainer>
  )

}


export default function MessengerModal({ profile, currentThreadID }) {



  //

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
      <Thread profile={profile} setThreadID={setThreadID} setSearchInput={setSearchInput} threadID={threadID} />
    )

  }
  else if (currentMode === MODES.THREAD_CLOSED) {
    return (
      <MessengerModalContainer>
        <FlexBox>
          <MessnegerSearchInput type="text" placeholder="🔎 search user" spellCheck="false"
            value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
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
          <MessnegerSearchInput type="text" placeholder="🔎 search user" spellCheck="false"
            value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
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