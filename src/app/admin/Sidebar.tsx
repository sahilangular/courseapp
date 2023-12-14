"use client";
import React from "react";
import { VStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
  RiAddCircleFill,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <VStack spacing={8} p={16} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
      <Link href={"/admin/dashboard"}>
        <Button
          fontSize={"larger"}
          variant={"ghost"}
          colorScheme={pathname === "/admin/dashboard" ? "purple" : ""}
        >
          <RiDashboardFill
            style={{
              margin: "4px",
            }}
          />
          Dashboard
        </Button>
      </Link>
      <Link href={"/admin/createcourse"}>
        <Button
          fontSize={"larger"}
          variant={"ghost"}
          colorScheme={pathname === "/admin/createcourse" ? "purple" : ""}
        >
          <RiAddCircleFill
            style={{
              margin: "4px",
            }}
          />
          Create Course
        </Button>
      </Link>
      <Link href={"/admin/course"}>
        <Button
          fontSize={"larger"}
          variant={"ghost"}
          colorScheme={pathname === "/admin/course" ? "purple" : ""}
        >
          <RiEyeFill
            style={{
              margin: "4px",
            }}
          />
          Courses
        </Button>
      </Link>
      <Link href={"/admin/users"}>
        <Button
          fontSize={"larger"}
          variant={"ghost"}
          colorScheme={pathname === "/admin/users" ? "purple" : ""}
        >
          <RiUser3Fill
            style={{
              margin: "4px",
            }}
          />
          Users
        </Button>
      </Link>
    </VStack>
  );
};

export default Sidebar;
