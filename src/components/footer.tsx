const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b1d1f] w-full">
      <div className="flex justify-center items-center">
        <a
          className="text-[#808791] transition duration-200 hover:text-white py-20 text-xs md:text-sm"
          href="https://kysclient-me.vercel.app/"
          target="__blank"
        >
          ©kysclient 김유신
        </a>
      </div>
    </footer>
  );
};

export default Footer;
