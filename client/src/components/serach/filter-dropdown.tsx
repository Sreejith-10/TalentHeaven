"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface FilterDropDownProps {
  title: string;
  items: string[];
  id: string;
}

export const FilterDropDown = ({ title, items, id }: FilterDropDownProps) => {
  const url = new URL(window.location.href);
  const search = new URLSearchParams(url.search);

  const params = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {title} ({params.getAll(id).length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={search.getAll(id).includes(item)}
            onCheckedChange={(state) => {
              if (state) {
                search.append(id, item);
                window.history.pushState(
                  {},
                  "",
                  `${url.origin}${url.pathname}?${search.toString()}`,
                );
              } else {
                search.delete(id, item);
                window.history.pushState(
                  {},
                  "",
                  `${url.origin}${url.pathname}?${search.toString()}`,
                );
              }
            }}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
