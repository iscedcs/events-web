import { MdOutlineLocationOff } from "react-icons/md";

export default function EventsNearYou() {
  return (
    <div>
      <div className=" mt-[40px]">
        <p className="text-[24px]">Events near you</p>
        <div className=" mt-[10px]">
          <div className=" rounded-[20px] bg-secondary py-[30px] flex items-center justify-center flex-col gap-3 text-center">
            <div className=" bg-white flex items-center rounded-full justify-center w-[50px] h-[50px] ">
              <MdOutlineLocationOff className=" w-6 h-6 text-secondary" />
            </div>
            <div className="">
              <p className=" text-[16px]">Unable to display events</p>
              <p className=" text-[13px] text-accent">
                Turn on location to view events near you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
