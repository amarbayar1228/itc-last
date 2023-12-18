const Arrow = ({ name }) => {
  return (
    <div
      className={
        name === "white"
          ? "inline-block w-2 h-2 border-t-[1px] border-r-[1px] rotate-45 border-white"
          : "inline-block w-2 h-2 border-t-[1px] border-r-[1px] rotate-45 border-brand-50"
      }
    ></div>
  );
};
export default Arrow;
