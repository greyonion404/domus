import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, Input } from "./AddPropertyBox.styles";
import { FaAddressBook} from 'react-icons/fa'
import { useState } from "react";

export default function AddPropertyBox({ profile }) {

    const [secretKey, setSecretKey] = useState("");

    return (
        <AddPropertyBoxContainer>

          <AddPropertyInputBox>
              <Text size={2} style={centerChilds}> <FaAddressBook/> </Text>
              <Input type="text" placeholder="address" spellCheck="false"/>
          </AddPropertyInputBox>

          <AddPropertyInputBox>
              <Text size={2} style={centerChilds} onClick={()=>{ setSecretKey("random")}}> <FaAddressBook/> </Text>
              <Input type="text" value={secretKey} spellCheck="false"/>
          </AddPropertyInputBox>


        </AddPropertyBoxContainer>
    )
}
