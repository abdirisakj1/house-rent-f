import Image from "./Image.jsx";

export default function PlaceImg({place, index=0, className=null}) {
  if (!place || !place.photos || !Array.isArray(place.photos) || !place.photos.length) {
    return null;
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={place.photos[index]} alt=""/>
  );
}