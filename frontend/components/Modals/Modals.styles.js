import data from "../../styles/data"
import styled from 'styled-components'


let GenericModal = styled.div`
    background-color: ${data.styles.color.primary};
    position: fixed;
    height: 75%;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    @media ${data.styles.devices.tablet} {
        height: 90%;
        width: 100%;
        top: 10%;
        left: 0%;
        transform: translate(0%, 0%);
    }
`

export { GenericModal }