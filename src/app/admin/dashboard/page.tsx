import React from "react";
import {
  Grid,
  Box,
  Text,
  Heading,
  Stack,
  HStack,
  Progress,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import { LineChart,DoughnutChart } from "../dashboard/chart";

const Databox = ({
  title,
  qty,
  qtyPercentage,
  profit,
}: {
  title: string;
  qty: number | undefined;
  qtyPercentage: number | undefined;
  profit: boolean;
}) => (
  <Box
    w={["full", "20%"]}
    boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}
    p={8}
    borderRadius={"lg"}
  >
    <Text>{title}</Text>
    <HStack spacing={6}>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        {qty}
      </Text>
      <HStack>
        <Text>{qtyPercentage}%</Text>
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.1}>Since last month</Text>
  </Box>
);

const Bar = ({
  title,
  value,
  profit,
}: {
  title: string;
  value: number;
  profit: boolean;
}) => (
  <Box py={4} px={[0, 20]}>
    <Heading size={"sm"} mb={2}>
      {title}
    </Heading>
    <HStack width={"full"} alignItems={"center"}>
      <Text>{profit ? "0%" : `-${value}%`}</Text>
      <Progress
        width={"full"}
        value={profit ? value : 0}
        colorScheme="purple"
      />
      <Text>{`${value > 100 ? value : 100}%`}</Text>
    </HStack>
  </Box>
);

const page = () => {
  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Box boxSizing="border-box" py={16} px={[4, 0]}>
        <Text textAlign={"center"} opacity={0.8}>
          Last change was on {String(new Date()).split("G")[0]}
        </Text>

        <Heading ml={[0, 16]} mb={16} textAlign={["center", "left"]}>
          Dashboard
        </Heading>
        <Stack
          direction={["column", "row"]}
          minH={24}
          justifyContent={"space-evenly"}
        >
          <Databox title="views" qty={123} qtyPercentage={30} profit={true} />
          <Databox title="users" qty={13} qtyPercentage={70} profit={true} />
          <Databox
            title="subscription"
            qty={73}
            qtyPercentage={20}
            profit={false}
          />
        </Stack>
        <Box
          m={[0, 16]}
          p={[0, 16]}
          borderRadius={"lg"}
          mt={[4, 16]}
          boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}
        >
          <Heading
            textAlign={["center", "left"]}
            size={"md"}
            pt={[8, 0]}
            ml={[0, 16]}
          >
            Views Graph
          </Heading>
          <LineChart />
        </Box>
        <Grid templateColumns={["1fr", "2fr 1fr"]}>
          <Box p={4}>
            <Heading
              textAlign={["center", "left"]}
              size={"md"}
              my={8}
              ml={[0, 16]}
            >
              Progress Bar
            </Heading>
            <Box>
              <Bar profit={true} title={"views"} value={30} />
              <Bar profit={true} title={"users"} value={20} />
              <Bar profit={false} title={"subscription"} value={20} />
            </Box>
          </Box>
          <Box p={[0, 16]} boxSizing="border-box" py={4}>
            <Heading textAlign={"center"} size={"md"} mb={4}>
              Users
            </Heading>
            <DoughnutChart />

          </Box>
        </Grid>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default page;
