export const Card = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 h-[130px] w-full  rounded-lg pt-10 p-4 shadow-lg">
      <p className="text-xl text-neutral-200">{label}</p>

      <div className="text-3xl text-neutral-100 mt-2"></div>
      <div className="text-3xl text-neutral-100 mt-2">{value}</div>
    </div>
  );
};
