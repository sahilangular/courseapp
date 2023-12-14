"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  HStack,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { deleteUser, getAllUsers, updateUserRole } from "@/app/redux/action/admin";
import Loader from "../../component/layout/Loader/page";
import toast from "react-hot-toast";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();

  const { users, loading, message, error } = useSelector(
    (state: any) => state.admin
  );

  const updateHandler = async(userId: any) => {
    await dispatch(updateUserRole(userId))
    // dispatch(getAllUsers());
  };

  const deletebuttonHandler = (userId: any) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box p={[0, 16]} overflowX={"auto"}>
            <Heading
              textTransform={"uppercase"}
              my={16}
              textAlign={["center", "left"]}
            >
              All Users
            </Heading>
            <TableContainer w={["100vw", "full"]}>
              <Table variant={"simple"} size={"lg"}>
                <TableCaption>All Available Users in the Database</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Subscription</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users &&
                    users?.map((item: any) => (
                      <Row
                        key={item._id}
                        item={item}
                        updateHandler={updateHandler}
                        deletebuttonHandler={deletebuttonHandler}
                      />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Page;

function Row({ item, updateHandler, deletebuttonHandler }: any) {
  return (
    <Tr>
      <Td>#{item?._id}</Td>
      <Td>{item?.name}</Td>
      <Td>{item?.email}</Td>
      <Td>{item?.role}</Td>
      <Td>
        {item?.subscription?.status === "active" ? "active" : "not active"}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => updateHandler(item._id)}
            colorScheme="purple"
            variant={"outline"}
          >
            Change Role
          </Button>
          <Button onClick={() => deletebuttonHandler(item._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
