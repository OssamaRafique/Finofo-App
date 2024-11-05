import { TableCell, TableRow } from "@/components/ui/table";
import { IGroupedFruit } from "@/interfaces";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FruitGroupAddButton } from "./FruitGroupAddButton";
import { FruitTableRow } from "./FruitTableRow";

export interface IFruitTableGroupedRowProps {
  group: IGroupedFruit;
}

export function FruitTableGroupedRow({ group }: IFruitTableGroupedRowProps) {
  const [groupExpanded, setGroupExpanded] = useState<boolean>(false);

  return (
    <>
      <TableRow
        className="bg-muted/50 hover:bg-muted/80 cursor-pointer"
        onClick={() => setGroupExpanded((prev) => !prev)}
      >
        <TableCell colSpan={6} className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {groupExpanded ? (
                <ChevronDown className="h-4 w-4 mr-2 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
              )}
              <span className="font-medium">{group.group}</span>
            </div>
            <FruitGroupAddButton fruits={group.fruits} />
          </div>
        </TableCell>
      </TableRow>
      {groupExpanded &&
        group.fruits.map((fruit) => (
          <FruitTableRow key={fruit.id} fruit={fruit} />
        ))}
    </>
  );
}
