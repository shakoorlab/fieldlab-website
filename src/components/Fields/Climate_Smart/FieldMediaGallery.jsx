import CS1 from "../../../assets/gallery/CS/CS1.webp";
import CS2 from "../../../assets/gallery/CS/CS2.webp";
import CS3 from "../../../assets/gallery/CS/CS3.webp";
import CS4 from "../../../assets/gallery/CS/CS4.webp";
import CS5 from "../../../assets/gallery/CS/CS5.webp";
import CS6 from "../../../assets/gallery/CS/CS6.webp";
import CS7 from "../../../assets/gallery/CS/CS7.webp";
import CS8 from "../../../assets/gallery/CS/CS8.webp";

import MasonryLightboxGallery from "../LightboxGallery";

export default function FieldMediaGallery() {
  const MEDIA = [
    {
      src: CS1,
      alt: "UAV canopy mosaic over Climate Smart plots",
      caption: "UAV Imagery · Sorghum Canopy",
    },
    {
      src: CS2,
      alt: "UAV canopy mosaic over Climate Smart plots",
      caption: "UAV Imagery · Sorghum Canopy",
    },
    {
      src: CS3,
      alt: "Minirhizotron root image",
      caption: "Minirhizotron · Root Architecture",
    },
    {
      src: CS4,
      alt: "Wireless soil sensor probe installed in field",
      caption: "Wireless Soil Sensor · Installation",
    },
    {
      src: CS5,
      alt: "PheNode weather & phenotyping node",
      caption: "PheNode · Weather & Phenotyping Node",
    },
    {
      src: CS6,
      alt: "FieldDock and UAV Drone",
      caption: "FieldDock · Edge Gateway",
    },
    {
      src: CS7,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      src: CS8,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
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
