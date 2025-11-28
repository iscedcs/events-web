import Image from "next/image";
import React from "react";

export default function TypingWatchBar({
  typingUsers,
}: {
  typingUsers: Map<
    string,
    {
      name: string;
      timestamp: number;
      displayPicture?: string | null | undefined;
    }
  >;
}) {
  return (
    <>
      {typingUsers.size > 0 && (
        <div className=" bg-black w-full py-[10px]  bottom-0 left-0 z-30 absolute mb-[71px] ">
          <div className="flex items-center gap-2  text-zinc-400 text-sm animate-fade-in">
            <div className="flex gap-1">
              <div className="w-[4px] h-[4px] bg-zinc-400 rounded-full animate-bounce" />
              <div
                className="w-[4px] h-[4px] bg-zinc-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-[4px] h-[4px] bg-zinc-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <span>
              <p className=" text-[10px]">
                <span className=" capitalize">
                  {Array.from(typingUsers.values())[0].name.toLowerCase()}
                </span>
                {`${typingUsers.size > 1
                  ? ` and ${typingUsers.size - 1} person is typing`
                  : typingUsers.size > 1
                    ? ` and ${typingUsers.size - 1} persons are typing`
                    : " is typing"
                  } `}
              </p>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
