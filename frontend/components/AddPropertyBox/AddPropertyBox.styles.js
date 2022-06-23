import styled from 'styled-components'
import data from '../../styles/data'

let AddPropertyBoxContainer = styled.div`

    background-color: ${data.styles.color.primary};
    word-wrap: break-word;
    margin: auto;
    overflow-y: scroll;
    width: 80%;
    height: 90%;
    padding: 20px;

    @media ${data.styles.devices.tablet} {

        padding: 20px;
        min-height: 95%;
        min-width: 90%;
    }
`
let AddPropertyInputBox = styled.div`
    background-color: ${data.styles.color.primary};
    width: 100%;
    height: max-content;
    display: flex;
    padding: 5px;
`
let Input = styled.input`
    all: unset;
    background-color: transparent;
    outline: none;
    border-bottom: 1px solid ${data.styles.color.secondaryMedium};
    color: ${data.styles.color.text.lighter};
    font-size: x-large;
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
`
let InputArea = styled.textarea`
    all: unset;
    background-color: transparent;
    outline: none;
    border-bottom: 1px solid ${data.styles.color.secondaryMedium};
    color: ${data.styles.color.text.lighter};
    font-size: x-large;
    height: 30vh;
    width: 100%;
    margin-left: 20px;
`

export {
    AddPropertyBoxContainer,
    AddPropertyInputBox,
    Input,
    InputArea
}

