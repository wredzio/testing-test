import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { getTest, TestDto } from "./test-api";

export interface TestPageProps {
  id: string;
}

export const TestPage = (props: TestPageProps) => {
  const { id } = props;

  const { isLoading, error, data } = useQuery<TestDto, Error>(
    ["test", id],
    () => getTest(id)
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return <div>as</div>;
};
