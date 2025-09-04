import { useEffect } from "react";
import ClimateSmartPanel from "./Panel";
import FieldMediaGallery from "./FieldMediaGallery";

function ClimateSmart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ClimateSmartPanel />
      <FieldMediaGallery />
    </>
  );
}

export default ClimateSmart;
