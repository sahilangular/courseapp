import React, { useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { RiMenu5Fill, RiLogoutBoxLine, RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { logOut } from "@/app/redux/action/userAction";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LinkButton = ({
  url = "/",
  title = "home",
  onClose,
}: {
  url: string;
  title?: string;
  onClose?(): void;
}) => (
  <Link onClick={onClose} href={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);

const Page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { onOpen, onClose, isOpen } = useDisclosure();

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter()

  const { loading, isAuthenticated, user, error, message } = useSelector(
    (state: any) => state.user
  );

  const logoutHandler = (e: any) => {
    e.preventDefault();
    dispatch(logOut());
    onClose()
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      router.push('/')
    }
  }, [dispatch, error, message,router]);

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="yellow"
        width={12}
        height={12}
        rounded={"full"}
        position={"fixed"}
        top={6}
        left={6}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={"blur(2px)"} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>
            COURSES BUNDLERS
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url="/home" title="home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courese"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Courese"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact" />
              <LinkButton onClose={onClose} url="/about" title="About" />
            </VStack>
            {isAuthenticated ? (
              <>
                <VStack>
                  <HStack position={"absolute"} bottom={"2rem"}>
                    <Link href={"/profile"}>
                      <Button
                        onClick={onClose}
                        variant={"ghost"}
                        colorScheme="yellow"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button
                      colorScheme="yellow"
                      variant={"ghost"}
                      onClick={logoutHandler}
                    >
                      <RiLogoutBoxLine />
                      Logout
                    </Button>
                  </HStack>
                  {user && user.role == "admin" && (
                    <Link href={"/admin/dashboard"} className="dashBoardBtn">
                      <Button colorScheme="purple" variant={"ghost"} onClick={onClose}>
                        <RiDashboardFill />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                </VStack>
              </>
            ) : (
              <>
                <HStack
                  bottom={"2rem"}
                  position={"absolute"}
                  borderTopWidth={"1px"}
                  paddingTop={"3"}
                >
                  <Link href={"/login"}>
                    <Button onClick={onClose} colorScheme="yellow">
                      login
                    </Button>
                  </Link>
                  <p>or</p>
                  <Link href={"/register"}>
                    <Button onClick={onClose} colorScheme="yellow">
                      sign up
                    </Button>
                  </Link>
                </HStack>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Page;
