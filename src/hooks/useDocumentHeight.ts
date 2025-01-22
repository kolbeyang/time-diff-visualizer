import { useState, useEffect } from "react";

const useDocumentHeight = () => {
  const [docHeight, setDocHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      setDocHeight(document.documentElement.clientHeight);
    };
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return docHeight;
};

export default useDocumentHeight;
