const Chip = (props: any) => {
  const { chipData, onClick } = props;
  return (
    <div className="grid grid-cols-3 gap-x-16 gap-y-4 text-center">
      {chipData?.map((data: any) => (
        <div className="cursor-pointer">
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-gray-200 text-gray-700 shadow-sm align-middle hover:bg-blue-500 hover:text-white focus:outline-none"
            onClick={() => onClick(data)}
          >
            {data?.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chip;
