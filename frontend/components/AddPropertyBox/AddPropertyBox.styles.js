import styled from 'styled-components'
import data from '../../styles/data'

let AddPropertyBoxContainer = styled.div`

    background-color: ${data.styles.color.primary};
    word-wrap: break-word;
    margin: auto;
    overflow-y: scroll;
    width: max-content;
    height: max-content;
    min-height: 50%;
    min-width: 50%;
    max-width: 100%;
    max-height: 100%;
    border-top: .5px solid ${data.styles.color.text.light};
    border-bottom: .5px solid ${data.styles.color.text.light};
    padding: 20px;
    padding-left: 20%;
    padding-right: 20%;

    @media ${data.styles.devices.tablet} {

        padding: 20px;
        min-height: 95%;
        min-width: 90%;
    }
`

export {
    AddPropertyBoxContainer,
}

