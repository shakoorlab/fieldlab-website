import { useEffect } from "react";
import HPIPanel from "./Panel";
import FieldMediaGallery from "./FieldMediaGallery";

function HPI() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HPIPanel />
      <FieldMediaGallery />
    </>
  );
}

export default HPI;
