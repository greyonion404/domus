import data from "../../styles/data"
import styled from 'styled-components'


let ProfileImage = styled.img`
    height: 10%;
    aspect-ratio: 1;
    border-radius: 50%;
    margin: 50px;
    margin-left: 50%;
    transform: translateX(-50%);
    
    @media ${data.styles.devices.tablet} {
    }
`
let ChangeNameInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
    width: 100%;
    display: grid;
    grid-template-columns: 90% 10%;
`
let ChangeNameInput = styled.input`
    all: unset;
    background-color: transparent;
    outline: none;
    border-bottom: 1px solid ${data.styles.color.secondaryMedium};
    color: ${data.styles.color.text.lighter};
    font-size: xx-large;
    width: 90%;
    margin: auto;
    text-align: center;
 
`

let GenericModal = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 75%;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    word-wrap: break-word;
    overflow-y: scroll;
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
        transform: translate(0%, 0%);
    }
`

let EditPropertyModalContainer = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
    padding: 10px;
    word-wrap: break-word;
    overflow-y: scroll;
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
    }
`

let AddIssueModalContainer = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
    padding: 10px;
    word-wrap: break-word;
    overflow-y: scroll;
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
    }
`

let IssueHistoryModalContainer = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
    padding: 10px;
    word-wrap: break-word;
    overflow-y: scroll;
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
    }
`
let IssueHistoryOfOwnerModalContainer = styled.div`
background-color: ${data.styles.color.primary};
position: fixed;
height: 80%;
width: 80%;
top: 10%;
left: 10%;
padding: 10px;
word-wrap: break-word;
overflow-y: scroll;
@media ${data.styles.devices.tablet} {
    height: 90%;
    width: 100%;
    top: 10%;
    left: 0%;
}
`

let LoadingModalContainer = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 80%;
    width: 100%;     
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${data.styles.devices.tablet} {

    }
`

let MapBox = styled.div`
    width: 100%;
    height: 85%;
`
let EditingMapBox = styled.div`
    margin-top: 5%;
    margin-left: 20%;
    width: 60%;
    height: 60%;
    @media ${data.styles.devices.tablet} {
        margin-left: 5%;
        width: 90%;
        height: 70%;
    }
`

let SaveMarkerButtonBox = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`
let DeletePropertyButton = styled.button`
  
    height: 7vh;
    width: 7vh;
    background-color: ${data.styles.color.secondaryMedium};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 3vh;
    margin-top: 3vh;
    padding: 50px;
    @media ${data.styles.devices.tablet} {
        height: 5vh;
        width: 5vh;
    }
`

let FlexBox = styled.div`
    display: flex;
`

let IssueSnippetsContainer = styled.div`
    height: 80%;
    overflow-y: scroll;
`


let IssueSnippetContainer = styled.div`
    display: flex;
    background-color: ${data.styles.color.primary};
    width: 75%;
    padding: 5px;
    margin: auto;
    margin-top: 5px;
    justify-content: space-between;
    border: 1px solid ${data.styles.color.text.light}80;
    &:hover {
        border: 1px solid ${data.styles.color.text.light};
    }
    @media ${data.styles.devices.tablet} {
        width: 100%;
    }
`

export {
    ProfileImage,
    ChangeNameInputContainer,
    ChangeNameInput,

    GenericModal,

    LoadingModalContainer,

    MapBox,
    SaveMarkerButtonBox,
    EditingMapBox,

    DeletePropertyButton,
    FlexBox,

    EditPropertyModalContainer,

    AddIssueModalContainer,

    IssueHistoryModalContainer,
    IssueHistoryOfOwnerModalContainer,
    
    IssueSnippetsContainer,
    IssueSnippetContainer,
}