export default function Image({src, ...rest}) {
  if (!src) return null;
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // Already a full URL, do nothing
  } else if (src.startsWith('/uploads/')) {
    src = 'http://localhost:4000' + src;
  } else {
    src = 'http://localhost:4000/uploads/' + src;
  }
  return (
    <img {...rest} src={src} alt={''} />
  );
}