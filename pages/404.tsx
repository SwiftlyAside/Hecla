import { Container, Divider, Heading, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Not found</Heading>
      <Text>Page not found</Text>
      <Divider my={5} />
    </Container>
  );
};

export default NotFound;
