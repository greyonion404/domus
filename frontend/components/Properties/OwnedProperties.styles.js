import styled from 'styled-components'
import data from '../../styles/data'


let OwnedPropertiesBox = styled.div`

    background-color: ${data.styles.color.primary};
    word-wrap: break-word;
    margin: auto;
    overflow-y: scroll;
    width: 100%;
    height: 98%;
    padding: 10px;

    @media ${data.styles.devices.tablet} {
        padding: 20px;
    }
`
let PropertyContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
    background-color: ${data.styles.color.primary};
    word-wrap: break-word;
    margin: auto;
    overflow-y: scroll;
    width: 100%;
    height: 90%;
    padding: 10px;
    @media ${data.styles.devices.tablet} {
        padding: 20px;
    }
`
let SearchPropertyInput = styled.input`
    all: unset;
    background-color: transparent;
    outline: none;
    border-bottom: 1px solid ${data.styles.color.secondaryMedium};
    color: ${data.styles.color.text.lighter};
    font-size: xx-large;
    margin-bottom: 10px;
    margin-left: 25%;
    margin-right: 25%;
    text-align: center;
    width: 50%;
    height: 7.5%;

    @media ${data.styles.devices.tablet} {     
        width: 100%;
        margin-left: 0%;
        margin-right: 0%;

    }
`
let Property = styled.div`
    background-color: ${data.styles.color.primaryMedium};
    height: max-content;
`
export { OwnedPropertiesBox, SearchPropertyInput, PropertyContainer, Property }