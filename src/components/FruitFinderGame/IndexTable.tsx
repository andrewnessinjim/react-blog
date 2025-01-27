import styled from "styled-components";

function IndexTable({ fruits, numCols = 4 }: Props) {
  return (
    <Wrapper>
      <thead>
        <TableRow>
          <ColumnHeading>Row</ColumnHeading>
          <ColumnHeading>Column</ColumnHeading>
          <ColumnHeading>Fruit</ColumnHeading>
        </TableRow>
      </thead>
      <tbody>
        {fruits.map((fruit, index) => (
          <TableRow key={index}>
            <TableCell>{Math.floor(index / numCols) + 1}</TableCell>
            <TableCell>{(index % numCols) + 1}</TableCell>
            <TableCell>{fruit === "" ? "..." : fruit}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Wrapper>
  );
}

const Wrapper = styled.table`
  margin-left: auto;
  margin-right: auto;
  font-size: 1.25rem;
  border-collapse: collapse;
  border: 1px solid var(--color-decorative-500);
  padding: 16px;
  width: 250px;
  text-align: center;
`;

const ColumnHeading = styled.th`
  width: 33%.33;
  padding: 2px 2px;
  border: 1px solid var(--color-decorative-500);
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td`
  padding: 2px 2px;
  border: 1px solid var(--color-decorative-500);
`;

interface Props {
  fruits: string[];
  numCols: number;
}
export default IndexTable;
