import {
  Table,
  Td,
  Th,
  Thead,
  Tr,
  SkeletonText,
  Tbody,
} from "@chakra-ui/react";

export const TableSkeleton = () => {
  return (
    <Table size="md" p={8} bg="white" w="80%">
      <Thead bg="gray.200">
        <Tr>
          <Th>Idea Name</Th>
          <Th>Difficulty</Th>
          <Th>Demo Available</Th>
          <Th>Info</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[1, 2, 3, 4].map((item) => (
          <Tr key={item}>
            <Td py={7}>
              <SkeletonText noOfLines={1} w="100px" />
            </Td>

            <Td>
              <SkeletonText noOfLines={1} w="80px" />
            </Td>

            <Td>
              <SkeletonText noOfLines={1} w="70px" />
            </Td>

            <Td>
              <SkeletonText noOfLines={1} w="40px" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
