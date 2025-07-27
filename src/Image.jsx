export default function Image({src, ...rest}) {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // Already a full URL, do nothing
  } else if (src.startsWith('/uploads/')) {
    src = 'https://house-rent-bk.onrender.com' + src;
  } else {
    src = 'https://house-rent-bk.onrender.com/uploads/' + src;
  }
  return (
    <img {...rest} src={src} alt={''} />
  );
}
