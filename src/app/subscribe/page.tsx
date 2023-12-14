"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { buySubscription, loadUser } from "../redux/action/userAction";
import toast from "react-hot-toast";
import Script from "next/script";
import logo from "../../app/assets/images/images.jpeg";
import { useRouter } from "next/navigation";

const Page = () => {
  const [key, setKey] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { loading, error, subscriptionId, success } = useSelector(
    (state: any) => state.subscribe
  );

  const { error:courseError } = useSelector(
    (state: any) => state.courses
  );

  const { user } = useSelector((state: any) => state.user);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const { data } = await axios.get("/api/v1/payment/getrazorId");
    setKey(data.key);

    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: "clearError" });
    }

    if (courseError) {
      toast.error(courseError.message);
      dispatch({ type: "clearError" });
    }

    if (subscriptionId) {
      const openPop = () => {
        try {
          const options = {
            key,
            name: "course bundler",
            description: "Get access to all premium content",
            image: logo,
            subscription_id: subscriptionId,
            handler: async function (response: any) {
              const { data } = await axios.post(
                "/api/v1/payment/paymentverification",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              );
              if (!data.success) {
                toast.success(data.message);
                setTimeout(() => {
                  router.push("/paymentfail");
                }, 3000);
              }

              if (data.success) {
                toast.success(data.message);
                router.push(
                  `/paymentsuccess?reference=${response.razorpay_payment_id}`
                );
                dispatch(loadUser())
              }
            },
            prefill: {
              name: user?.name,
              email: user?.email,
              contact: "",
            },
            notes: {
              address: "course bundler course payment",
            },
            theme: {
              color: "#FFC800",
            },
          };

          const razor = (window as any).Razorpay(options);
          razor.open();
        } catch (error) {
          console.log(error);
        }
      };
      openPop();
    }
  }, [courseError, dispatch, error, key, router, subscriptionId, user?.email, user?.name]);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <Container h={"90vh"} p={16}>
        <Heading my={8} textAlign={"center"}>
          welcome
        </Heading>
        <VStack
          boxShadow={"lg"}
          alignItems={"stretch"}
          borderRadius={"lg"}
          spacing={0}
        >
          <Box
            bgColor={"yellow.400"}
            p={4}
            css={{ borderRadius: "8px 8px 0 0 " }}
          >
            <Text>Pro Pack - ₹299.00</Text>
          </Box>
          <Box p={4}>
            <VStack textAlign={"center"} px={8} mt={4} spacing={8}>
              <Text>Join pro pack and get access to all content.</Text>
              <Heading size={"md"}> ₹299 only</Heading>
            </VStack>
          </Box>
          <Button
            my={8}
            colorScheme="yellow"
            w={"full"}
            onClick={submitHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
          <Box
            bg={"blackAlpha.600"}
            p={4}
            css={{
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Heading size={"sm"} color={"white"} textTransform={"uppercase"}>
              100% refund at cancellation
            </Heading>
            <Text fontSize={"xs"} color={"white"}>
              *terms and conditions apply
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Page;
