"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AiOutlineEdit } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { Check, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { getUniqueCategories } from "../../../../../actions/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CategoriesFormValues = {
  categories: string[];
};

export default function CategoriesField() {
  const { watch, setValue } = useFormContext<CategoriesFormValues>();

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const selectedCategories = watch("categories") || [];

  // ✅ Fetch categories once
  useEffect(() => {
    (async () => {
      const categoryData = await getUniqueCategories();
      setAvailableCategories(categoryData || []);
    })();
  }, []);

  // ✅ Toggle category selection
  const handleToggleCategory = useCallback(
    (category: string) => {
      const updated = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      setValue("categories", updated, { shouldValidate: true });
    },
    [selectedCategories, setValue]
  );

  // ✅ Add custom category
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    const lowerTrimmed = trimmed.toLowerCase();

    const alreadyExists =
      availableCategories.some((c) => c.toLowerCase() === lowerTrimmed) ||
      selectedCategories.some((c) => c.toLowerCase() === lowerTrimmed);

    if (alreadyExists) {
      setNewCategory("");
      setShowAddInput(false);
      return;
    }

    setAvailableCategories((prev) => [...prev, trimmed]);
    setValue("categories", [...selectedCategories, trimmed], {
      shouldValidate: true,
    });
    setNewCategory("");
    setShowAddInput(false);
  };

  return (
    <div>
      <div className="mt-[10px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BiCategory />
          <p className="text-white">Category</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 text-accent hover:underline">
              <p>
                {selectedCategories.length
                  ? `${selectedCategories.length} Selected`
                  : "Select Category"}
              </p>
              <AiOutlineEdit />
            </button>
          </DialogTrigger>

          <DialogContent className="bg-secondary border-0">
            <DialogTitle hidden>Category Selection</DialogTitle>

            <p className="font-semibold mb-2">Event Category</p>
            <p className="text-sm text-muted-foreground mb-2">
              Trending Event Categories
            </p>

            {availableCategories.length > 0 ? (
              <div className="flex flex-col gap-3">
                <ScrollArea className="w-[300px]">
                  <div className="flex flex-wrap gap-3 w-[500px]">
                    {availableCategories.map((category, index) => {
                      const selected = selectedCategories.includes(category);
                      return (
                        <span
                          key={index}
                          onClick={() => handleToggleCategory(category)}
                          className={`capitalize flex items-center gap-2 rounded-full py-[5px] px-[10px] cursor-pointer transition-all ${
                            selected
                              ? "bg-accent text-black"
                              : "bg-transparent text-accent border border-accent"
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                          {category}
                        </span>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {showAddInput ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter custom category"
                      className="h-[30px] text-[12px] border-accent focus-visible:ring-0 focus-visible:border-accent bg-[#151515] rounded-[8px] px-[15px]"
                    />
                    <Button
                      size="sm"
                      onClick={handleAddCategory}
                      className="h-[30px] bg-white text-[12px] rounded-[12px] text-black hover:bg-white"
                    >
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setShowAddInput(false);
                        setNewCategory("");
                      }}
                      className="h-[30px] bg-white text-[12px] rounded-[12px] text-black hover:bg-white"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddInput(true)}
                    className="text-accent capitalize flex justify-center items-center gap-2 border border-accent rounded-full py-[5px] px-[10px]"
                  >
                    <Plus className="w-4 h-4" />
                    Add yours
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-accent text-sm">Check again later</p>
                <button
                  type="button"
                  onClick={() => setShowAddInput(true)}
                  className="text-accent capitalize flex justify-center items-center gap-2 border border-accent rounded-full py-[5px] px-[10px]"
                >
                  <Plus className="w-4 h-4" />
                  Add yours
                </button>
                {showAddInput && (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter custom category"
                      className="h-[30px] text-[12px] border-accent focus-visible:ring-0 focus-visible:border-accent bg-[#151515] rounded-[8px] px-[15px]"
                    />
                    <Button
                      size="sm"
                      onClick={handleAddCategory}
                      className="h-[30px] bg-white text-[12px] rounded-[12px] text-black hover:bg-white"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            )}

            <hr className="my-[20px] border border-accent border-dashed" />

            <div>
              <p className="text-accent text-[12px]">Selected Categories:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.length > 0 ? (
                  selectedCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-[12px] bg-accent text-black rounded-full py-[4px] px-[8px]"
                    >
                      {cat}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground text-[12px]">
                    You do not have any category yet
                  </p>
                )}
              </div>
            </div>

            <DialogClose asChild>
              <Button
                className="w-full rounded-[12px] bg-white border-0 text-black font-semibold py-[24px]"
                variant="outline"
              >
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <hr className="mt-[10px] border-accent" />
    </div>
  );
}
