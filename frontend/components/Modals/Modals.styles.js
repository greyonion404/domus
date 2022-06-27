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
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
        transform: translate(0%, 0%);
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
let SaveMarkerButtonBox = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export {
     ProfileImage, 
     ChangeNameInputContainer,
     ChangeNameInput,

     GenericModal, 

     LoadingModalContainer,

     MapBox,
     SaveMarkerButtonBox
    }