import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function MyImageGallery(props) {
  return (
    <ImageGallery items={props.images} showNav={false} showPlayButton={false} />
  );
}
