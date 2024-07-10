/*eslint-disable */
function LocationKeywords({ id, label, selected, onClick, img_src }) {
  return (
    <div
      onClick={() => onClick(id)}
      className="font-sans flex flex-grow bg-slate-100 p-2 rounded-lg justify-center items-center transition-all duration-500 hover:bg-indigo-300 hover:border-1 hover:border-slate-400 hover:cursor-pointer"
    >
      <div className="flex flex-col justify-center items-center">
        <img src={img_src} className="aspect-square w-10" />
        <p className="mt-1">{label}</p>
      </div>
    </div>
  );
}

export default LocationKeywords;
