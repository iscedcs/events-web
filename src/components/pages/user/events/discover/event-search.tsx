"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

export default function EventSearch() {
  const [closeSearch, setCloseSearch] = useState(true);
  const handleSearchToggle = () => {
    setCloseSearch(!closeSearch);
  };
  return (
    <div>
      <IoSearch
        onClick={handleSearchToggle}
        className=" text-accent w-[24px] h-[24px]"
      />
      {!closeSearch && (
        <div className=" -mt-[15px]  absolute top-0 h-screen z-30 bg-black w-full left-0">
          <div className=" flex pl-3 items-center gap-2  bg-secondary">
            <GoArrowLeft
              onClick={handleSearchToggle}
              className=" w-[20px] h-[20px]"
            />
            <div className=" flex gap-2 justify-between w-full relative">
              <IoSearch className=" -translate-y-1/2 top-1/2 absolute text-white w-[20px] h-[20px]" />
              <Input
                className="  text-[14px] py-[10px] border-0 rounded-none pl-[30px]"
                placeholder="Search for events"
              />
              <Button className=" bg-success py-[20px] text-white rounded-none">
                Search
              </Button>
            </div>
          </div>
          <p>Search Section</p>
        </div>
      )}
    </div>
  );
}
