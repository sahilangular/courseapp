"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Stack,
  VStack,
  Avatar,
  Button,
  HStack,
  Text,
  Input,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../app/component/layout/Loader/page";
import UploadWidget from "../cloudinary/uploadwidget";
import { AppDispatch } from "../redux/store";
import { updateProfilePicture } from "../redux/action/profileAction";
import { cancelSubscription, loadUser } from "../redux/action/userAction";
import toast from "react-hot-toast";
import { removeFromPlayList } from "../redux/action/course";
import fileUploadCss from "../fileupload";

const Page = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch: AppDispatch = useDispatch();

  const { user, loading, error, message } = useSelector(
    (state: any) => state.user
  );

  const { loading:cancelSubscribe,message:cancelSubscribeMesage } = useSelector(
    (state: any) => state.subscribe
  );

  const { proMessage } = useSelector((state: any) => state.profile);

  const removeFromPlaylistHandler = async (id: any) => {
    await dispatch(removeFromPlayList(id));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = async(e: any) => {
    e.preventDefault();
    await dispatch(cancelSubscription());
    dispatch(loadUser())
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

    if (cancelSubscribeMesage) {
      toast.success(cancelSubscribeMesage);
      dispatch({ type: "clearMessage" });
    }

    if (proMessage) {
      toast.success(proMessage);
      dispatch({ type: "clearMessage" });
    }

  }, [cancelSubscribeMesage, dispatch, error, message, proMessage]);

  // const changeImageSubmitHandler = (e:any,image: any) => {
  //   e.preventDefault();
  //   console.log(image);
  // };

  return (
    <Container minH={"95vh"} maxW={"container.lg"} py={8}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Heading margin={8} textTransform={"uppercase"}>
            profile
          </Heading>
          <Stack
            justifyContent={"flex-start"}
            direction={["column", "row"]}
            alignItems={"center"}
            spacing={[8, 16]}
            padding={8}
          >
            <VStack>
              <Avatar src={user?.avatar?.url} boxSize={48} />
              <Button variant={"ghost"} colorScheme="yellow" onClick={onOpen}>
                Change Photo
              </Button>
            </VStack>
            <VStack spacing={8} alignItems={["center", "flex-start"]}>
              <HStack>
                <Text fontWeight={"bold"}>Name:</Text>
                <Text>{user?.name}</Text>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"}>Email:</Text>
                <Text>{user?.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"}>createdAt:</Text>
                <Text>{user?.createdAt.split("T")[0]}</Text>
              </HStack>
              {user?.role !== "admin" && (
                <HStack>
                  <Text fontWeight={"bold"}>Subscription:</Text>
                  {user?.subscription &&
                    user?.subscription?.status === "active" ? (
                    <Button
                      color={"yellow.400"}
                      variant={"unstyled"}
                      onClick={cancelSubscriptionHandler}
                      isLoading={cancelSubscribe}
                    >
                      Cancel Subscription
                    </Button>
                  ) : (
                    <Link href={"/subscribe"}>
                      <Button colorScheme="yellow">Subscribe</Button>
                    </Link>
                  )}
                </HStack>
              )}
              <Stack direction={["column", "row"]} alignItems={"center"}>
                <Link href={"/updateprofile"}>
                  <Button>Update Profile</Button>
                </Link>
                <Link href={"/changePassword"}>
                  <Button>Update password</Button>
                </Link>
              </Stack>
            </VStack>
          </Stack>
          <Heading size={"md"} my={8}>
            Playlist
          </Heading>
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            flexWrap={"wrap"}
            p={4}
          >
            {user?.Playlist &&
              user?.Playlist.map((item: any, index: any) => (
                <VStack w={48} m={2} key={item.course}>
                  <Image
                    boxSize={"full"}
                    objectFit={"contain"}
                    src={item.poster}
                    alt=" image poster"
                  />
                  <HStack>
                    <Link href={`/courses/${item.course}`}>
                      <Button variant={"ghost"} colorScheme="yellow">
                        Watch Out
                      </Button>
                    </Link>
                    <Button
                      onClick={() => removeFromPlaylistHandler(item.course)}
                    >
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              ))}
            {/* {user?.Playlist?.map(
            (
              element: {
                course: React.Key | null | undefined;
                poster: string | undefined;
              },
              index: any
            ) => (
              <VStack w={48} m={2} key={element.course}>
                <Image
                  boxSize={"full"}
                  objectFit={"contain"}
                  src={element.poster}
                  alt=" image poster"
                />
                <HStack>
                  <Link href={`/courses/${element.course}`}>
                    <Button variant={"ghost"} colorScheme="yellow">
                      Watch Out
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeFromPlaylistHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            )
          )} */}
          </Stack>
          <ChangePhotoBox
            isOpen={isOpen}
            onClose={onClose}
          // handleOnUpload={handleOnUpload}
          />
        </>
      )}
    </Container>
  );
};

export default Page;

function ChangePhotoBox({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [avatarPreview, setavatarPreview] = useState<any | null>("");

  const dispatch: AppDispatch = useDispatch();

  const handleOnUpload = async (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
    }
    console.log(result.info);
    setavatarPreview(result.info.secure_url);
    await dispatch(
      updateProfilePicture(result.info.public_id, result.info.secure_url)
    );
    dispatch(loadUser());
  };

  // const changeImage = (e: any) => {
  //   const file = e.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setavatarPreview(reader.result);
  //     setAvatar(file);
  //   };
  // };

  const onCloseHandler = () => {
    onClose();
    setavatarPreview("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <VStack spacing={8}>
              {avatarPreview && <Avatar src={avatarPreview} boxSize={48} />}
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <Button css={fileUploadCss} onClick={handleOnClick}>
                      Upload Avatar
                    </Button>
                  );
                }}
              </UploadWidget>
              {/* <Button
                  type="
                  css={{ "&::file-selector-button": fileUploadCss }}
                  onChange={changeImage}
                /> */}
              {/* <Button type="submit" w={"full"} colorScheme="yellow">
                  Change
                </Button> */}
            </VStack>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onCloseHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
