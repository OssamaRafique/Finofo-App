import { IFruit } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import { TableCell } from "@/components/ui/table";
import { FruitTableRow } from "./FruitTableRow";
import { TableRow } from "@/components/ui/table";
import { IGroupedFruit } from "@/interfaces";
import { addFruitToJar } from "@/redux/slices/jar.slice";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export interface IFruitTableGroupedRowProps {
  group: IGroupedFruit;
}

export function FruitTableGroupedRow({ group }: IFruitTableGroupedRowProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [groupExpanded, setGroupExpanded] = useState<boolean>(false);

  const handleAddAllFruitsToJar = (fruits: IFruit[]) => {
    fruits.forEach((fruit) => dispatch(addFruitToJar(fruit.id)));
  };

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
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAddAllFruitsToJar(group.fruits);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add All
            </Button>
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
