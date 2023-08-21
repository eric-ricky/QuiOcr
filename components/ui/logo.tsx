import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-3xl leading-6 font-bold outline-none active:outline-none"
      aria-label="Logo"
    >
      <span className="text-blue-800">Qui</span>
      <span className="text-lime-500">Ocr</span>.
    </Link>
  );
};

export default Logo;
