import { motion } from "framer-motion";
import styled from "styled-components";
import personData from "./data.json";

export const CLASS_PERSON_TABLE = "person-table";
export const CLASS_PERSON_ROW = "person-row";

interface Props {
  person: {
    id: number;
    memoryAddress: string;
    name: string;
    phoneNumber: string;
  };
}

function PersonsTable() {
  return (
    <Wrapper className={CLASS_PERSON_TABLE}>
      {personData.map((person) => {
        return <PersonRow key={person.id} person={person} />;
      })}
    </Wrapper>
  );
}

function PersonRow({ person }: Props) {
  return (
    <PersonRowContainer key={person.id} className={CLASS_PERSON_ROW}>
      <PersonMemAddress>{person.memoryAddress}</PersonMemAddress>
      <PersonId> {person.id}</PersonId>
      <PersonName>{person.name}</PersonName>
      <PersonPhone>{person.phoneNumber}</PersonPhone>
    </PersonRowContainer>
  );
}

const Wrapper = styled(motion.div)`
  position: absolute;
  right: 48px;
  top: 145px;
`;

const PersonRowContainer = styled.div`
  padding: 8px;
  display: flex;
  width: fit-content;
  background-color: var(--color-gray-300);
  color: white;
`;

const PersonMemAddress = styled.div`
  width: 75px;
`;
const PersonId = styled.div`
  width: 40px;
`;
const PersonName = styled.div`
  width: 130px;
`;
const PersonPhone = styled.div`
  width: 120px;
`;

export default PersonsTable;
