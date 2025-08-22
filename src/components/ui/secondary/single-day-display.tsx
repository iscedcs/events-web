import { format } from "date-fns/format";

export default function SingleDayDisplay({ date }: { date: Date }) {
  // const date = new Date();

  return (
    <div className=" w-[40px] border-accent h-[40px] border rounded-[12px] ">
      <div className=" text-center rounded-tl-[12px] rounded-tr-[12px] bg-secondary">
        <p className=" uppercase text-[10px]">{format(date, "LLL")}</p>
      </div>
      <div className=" text-center">
        <p className=" text-[14px]">{format(date, "d")}</p>
      </div>
    </div>
  );
}
