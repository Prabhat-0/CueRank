
const filterList = ["All", "Location", "Club", "Age Group", "Gender", "Entry Fee"];
    const [filterButton, setFilterButton] = useState(0);

{/** ----------- Filtering buttons ---------------- */}
                <div className="w-full h-auto flex items-center justify-between">

                    <div className="w-full h-full flex items-center gap-3 ">
                        {filterList.map((f, index) => {
                            const isActive = filterButton === index;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setFilterButton(index)}
                                    className={`cursor-pointer font-inter text-sm flex items-center gap-2.5 py-2.5 px-5 rounded-md ${isActive
                                        ? "bg-buttons text-black"
                                        : "bg-[#FFFFFF0D] text-inactive border border-[#1E3028]"
                                        }`}
                                >
                                    <span>{f}</span>
                                    <DownArrow
                                        className={`transition-transform duration-500 ease-in-out ${isActive ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <label htmlFor="sortingButtons" className="text-inactive font-inter text-sm flex whitespace-nowrap items-center gap-2">Sort by:
                        <button
                            type="button"
                            id="sortingButtons"
                            className="cursor-pointer flex items-center gap-2.5 py-2.5 px-5 rounded-md bg-[#FFFFFF0D] text-white border border-[#1E3028] font-inter text-sm font-semibold">
                            <span>Low to high entry fee</span>
                            <DownArrow
                                className="transition-transform duration-500 ease-in-out " />
                        </button></label>


                </div>