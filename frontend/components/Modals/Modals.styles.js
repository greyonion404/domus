import data from "../../styles/data"
import styled from 'styled-components'


let ProfileImage = styled.img`
    height: 10%;
    aspect-ratio: 1;
    border-radius: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    @media ${data.styles.devices.tablet} {
    }
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
    position: fixed;
    height: 75%;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`

export { ProfileImage, GenericModal, LoadingModalContainer}