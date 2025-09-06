import HPI1 from "../../../assets/gallery/HPI/HPI1.webp";
import HPI2 from "../../../assets/gallery/HPI/HPI2.webp";
import HPI3 from "../../../assets/gallery/HPI/HPI3.webp";
import HPI4 from "../../../assets/gallery/HPI/HPI4.webp";
import HPI5 from "../../../assets/gallery/HPI/HPI5.webp";
import HPI6 from "../../../assets/gallery/HPI/HPI6.webp";
import HPI7 from "../../../assets/gallery/HPI/HPI7.webp";
import HPI8 from "../../../assets/gallery/HPI/HPI8.webp";
import HPI9 from "../../../assets/gallery/HPI/HPI9.webp";
import HPI10 from "../../../assets/gallery/HPI/HPI10.webp";
import HPI11 from "../../../assets/gallery/HPI/HPI11.webp";
import HPI12 from "../../../assets/gallery/HPI/HPI12.webp";

import MasonryLightboxGallery from "../LightboxGallery";

export default function FieldMediaGallery() {
  const MEDIA = [
    {
      src: HPI1,
      alt: "UAV canopy mosaic over HPI plots",
      caption: "UAV Imagery · Sorghum Canopy ",
    },
    {
      src: HPI2,
      alt: "A researcher collecting phenotyping data at the HPI field",
      caption: "Phenotyping · Collecting Data at HPI Fields",
    },
    {
      src: HPI3,
      alt: "UAV canopy mosaic over HPI plots",
      caption: "UAV Imagery · Sorghum Canopy ",
    },
    {
      src: HPI4,
      alt: "Wireless soil sensor probe installed in field",
      caption: "Wireless Soil Sensor9 · Installation",
    },
    {
      src: HPI5,
      alt: "A researcher collecting phenotyping data at the HPI field",
      caption: "Phenotyping · Collecting Data at HPI Fields",
    },
    {
      src: HPI6,
      alt: "Planting sorghum seeds with GPS-guided equipment",
      caption: "Planting · HPI Fields",
    },
    {
      src: HPI7,
      alt: "UAV canopy mosaic over HPI plots",
      caption: "UAV Imagery · Sorghum Canopy ",
    },
    {
      src: HPI8,
      alt: "FieldDock and UAV Drone",
      caption: "UAV · FieldDock",
    },
    {
      src: HPI9,
      alt: "FieldDock and UAV Drone",
      caption: "UAV · FieldDock",
    },
    {
      src: HPI10,
      alt: "PheNode weather & phenotyping node",
      caption: "PheNode · Weather & Phenotyping Node",
    },
    {
      src: HPI11,
      alt: "FieldDock and UAV Drone",
      caption: "UAV · FieldDock",
    },
    {
      src: HPI12,
      alt: "Sorghum plant closeup",
      caption: "Sorghum · Upclose",
    },
  ];

  return (
    <MasonryLightboxGallery
      media={MEDIA}
      title="High-Precision Instrumentation"
      subtitle="A selection of HPI imagery from the field showing sensors, platforms, and outcomes."
      ratio={16 / 10}
      enableMobileBack={true}
    />
  );
}
