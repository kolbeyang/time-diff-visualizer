import { useState, useEffect } from "react";

const defaultHeight = 500;

const useDocumentHeight = () => {
  const [docHeight, setDocHeight] = useState(defaultHeight);

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
