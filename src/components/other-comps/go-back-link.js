"use client";
import { useRouter } from "next/navigation";

function GoBackLink({ children }) {
  const router = useRouter();
  return <div onClick={() => router.back()}>{children}</div>;
}

export default GoBackLink;
