
"use client";

export const NetbankingSkeleton = () => {
  return (
    <div className="lg:ml-[270px] lg:mr-[20px] animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-6">
        <div className="h-8 w-48 bg-neutral-800 lg:mt-10 rounded ml-14 lg:ml-2" />
        <div className="h-5 w-64 bg-neutral-700 rounded ml-14 lg:ml-2" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
        {/* Add Money Form */}
        <div className="order-2 lg:order-1 col-span-3 space-y-4 lg:mt-10  ">
          <div className="h-12 bg-neutral-800 rounded" />
          <div className="h-12 bg-neutral-800 rounded" />
          <div className="h-12 bg-neutral-800 rounded" />
     
          <div className="h-10 w-32 bg-neutral-700 rounded" />
        </div>

        {/* Balance + Quote */}
        <div className="order-1 lg:order-2 col-span-3 lg:col-span-2 flex flex-col">
          <div className="lg:mt-10 h-[300px] bg-neutral-800 rounded mb-4" />
        
        </div>
      </div>

      {/* Transaction List */}
      <div className="hidden md:block space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-neutral-800 rounded" />
        ))}
      </div>
    </div>
  );
};
