// app/components/Tab.tsx

interface TabProps {
  bgColor: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab: React.FC<TabProps> = ({ bgColor, text, onClick }) => {
  const commonTabClasses = `
    flex justify-center items-center h-full rounded-t-lg py-2.5 text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-stone-900 shadow-md cursor-pointer
    transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0.5 select-none
  `;

  return (
    <li className="flex-grow">
      <button type="button" onClick={onClick} className={`${commonTabClasses} ${bgColor} w-full`}>
        <p className={`font-permanent -rotate-3`}>{text}</p>
      </button>
    </li>
  );
};

export default Tab;
