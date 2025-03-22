"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/home/hero.module.css";
import Image from "next/image";

const images = [
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg",
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJhbLS.SL1500.jpg",
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg",
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg",
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057718636-headphone5.jpg",
  "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/169104038525-51Prg4Smx-L.SL1500.jpg",
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.imageSection}>
      <div className={styles.slider}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
          >
            <Image src={image} alt={`Slide ${index}`} width={800} height={400} />
          </div>
        ))}
      </div>
    </div>
  );
}
