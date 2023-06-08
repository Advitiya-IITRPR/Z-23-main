export default function RegisterEventModel({ open, setOpen }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100000] grid h-screen w-screen place-items-center bg-opacity-0 backdrop-blur-sm transition-opacity duration-300 ">
          <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-orange-900 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
            <div className="flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased text-gray-200">
              Are you sure want to register?
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500">
              <button
                className="middle center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-gray-50 transition-all hover:bg-gray-500/10 active:bg-gray-500/30"
                onClick={() => setOpen(false)}
              >
                No
              </button>
              <button className="middle center rounded-lg bg-gradient-to-tr from-gray-50 to-gray-300 py-3 px-6 font-sans text-xs font-bold uppercase text-orange-600 shadow-md transition-all hover:shadow-lg  active:opacity-[0.85]">
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
