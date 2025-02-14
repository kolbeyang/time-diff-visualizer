"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Vday = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("https://hgvday.carrd.co/");
  });
  return <div className="flex">hello</div>;
};

export default Vday;
