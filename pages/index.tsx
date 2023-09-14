import { Container, Flex, Box, SimpleGrid, Stack, Heading, Skeleton, Text} from "@chakra-ui/react"
import { ConnectWallet, useAddress, useContract, useMetadata, MediaRenderer, useContractRead, Web3Button } from "@thirdweb-dev/react";
//import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const contractAddress = "insert contract addres";
  const { contract } = useContract(contractAddress);
  
  const address = useAddress();

  const { data: metadata, isLoading: isLoadingMetadata} = useMetadata(contract);

  const { data: totalMinted, isLoading: isLoadingTotalMinted} = useContractRead(contract,"totalMinted");

  return (
    <Container maxW={"1200px"}>
      <Flex p={"20px"} justifyContent={"space-between"}>
      <Box></Box>
      <ConnectWallet />
      </Flex> 
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10} justifyItems={"center"}>
          <Box>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <MediaRenderer
                src={(metadata as {image: string})?.image}>

              </MediaRenderer>
            </Skeleton>
          </Box>
          <Flex direction={"column"} justifyContent={"center"}>
            <Stack direction={"column"} spacing={4}></Stack>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Heading>{(metadata as {name?: string})?.name}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Text>{(metadata as {description?: string})?.description}</Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingTotalMinted}>
              <p>Total minted: {totalMinted?.toNumber(0)}/5</p>
            </Skeleton>
            {address ? (
              <Web3Button 
                contractAddress={contractAddress}
                action={(contract) => contract.erc721.claim(1)}
              >Claim</Web3Button>
            ) : (
              <Text>Please connect your wallet to the website</Text>
            )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Home; 