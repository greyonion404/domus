import data from "../../styles/data"
import styled from 'styled-components'


let ModalContainer = styled.div`
    background-color: rgb(0,0,0, 0.3);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    @media ${data.styles.devices.tablet} {
    }
`
export { ModalContainer }