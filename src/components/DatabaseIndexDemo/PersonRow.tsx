import styled from "styled-components";

interface Props {
  person: {
    id: number;
    memoryAddress: string;
    name: string;
    phoneNumber: string;
  };
  className: string;
}

function PersonRow({ person, className }: Props) {
  return (
    <PersonRowContainer key={person.id} className={className}>
      <PersonMemAddress>{person.memoryAddress}</PersonMemAddress>
      <PersonId> {person.id}</PersonId>
      <PersonName>{person.name}</PersonName>
      <PersonPhone>{person.phoneNumber}</PersonPhone>
    </PersonRowContainer>
  );
}

const PersonRowContainer = styled.div`
  padding: 8px;
  display: flex;
  width: fit-content;
  background-color: var(--color-gray-300);
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

export default PersonRow;
