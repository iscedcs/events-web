import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import React from "react";

export default function page() {
  return (
    <div className=" p-[100px]">
      <p className="  font-bold text-[29px]">My Events</p>
      <Button>Somthet</Button>

      <div className=" bg-secondary h-[200px] w-[200px]"></div>
      <p className=" text-error">Error</p>
      <p className=" text-success">Success</p>
      <Tabs>
        <TabsList>
          <TabsTrigger value="one">Going</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
      </Tabs>

      <p className=" text-secondary-foreground">
        Host, attend and bookmark events near you to get started
      </p>
    </div>
  );
}
