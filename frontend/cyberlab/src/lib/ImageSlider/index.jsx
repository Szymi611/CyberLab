import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import phishingOffice from "../../assets/images/phishingOffice.png";
import phishingNetflix from "../../assets/images/phishingNetflix.png";
import phishingGitHub from "../../assets/images/phishingGitHub.png";
import phishingGoogle from "../../assets/images/phishingGoogle.png";
import phishingPayPal from "../../assets/images/phishingPayPal.png";
import phishingUPS from "../../assets/images/phishingUPS.png";
import phishingFedex from "../../assets/images/phishingFedex.png";
import phishingDropBox from "../../assets/images/phishingDropBox.png";

const images = [
  phishingOffice,
  phishingNetflix,
  phishingGitHub,
  phishingGoogle,
  phishingPayPal,
  phishingUPS,
  phishingFedex,
  phishingDropBox,
];

export default function Slider() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 , pauseOnMouseEnter: true}}
      modules={[Navigation, Autoplay]}
      navigation
      style={{marginBottom: "1rem"}}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "85dvh" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
