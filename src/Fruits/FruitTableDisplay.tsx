import { Fragment, useState } from "react";
import { Plus, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import {
  selectGroupedFruits,
  selectGroupBy,
  selectFruitsArray,
} from "@/redux/selectors";
import { FruitTableRow } from "./FruitTableRow";
import { GroupBy } from "@/enums/groupBy.enum";
import { addFruitToJar } from "@/redux/slices/jar.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IFruit } from "@/interfaces";

export function FruitTableDisplay() {
  const dispatch = useDispatch<AppDispatch>();
  const fruits = useSelector(selectFruitsArray);
  const groupedFruits = useSelector(selectGroupedFruits);
  const groupBy = useSelector(selectGroupBy);

  const [groupExpanded, setGroupExpanded] = useState<Record<string, boolean>>(
    {}
  );

  const handleAddAllFruitsToJar = (fruits: IFruit[]) => {
    fruits.forEach((fruit) => dispatch(addFruitToJar(fruit.id)));
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="w-[150px]">Family</TableHead>
            <TableHead className="w-[150px]">Order</TableHead>
            <TableHead className="w-[150px]">Genus</TableHead>
            <TableHead className="w-[100px]">Calories</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupBy === GroupBy.None ? (
            fruits.map((fruit) => (
              <FruitTableRow key={fruit.id} fruit={fruit} />
            ))
          ) : (
            <>
              {groupedFruits.map((group) => {
                return (
                  <Fragment key={group.group}>
                    <TableRow
                      className="bg-muted/50 hover:bg-muted/80 cursor-pointer"
                      onClick={() =>
                        setGroupExpanded({
                          ...groupExpanded,
                          [group.group]: !groupExpanded[group.group],
                        })
                      }
                    >
                      <TableCell colSpan={6} className="p-0">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            {groupExpanded[group.group] ? (
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
                    {groupExpanded[group.group] &&
                      group.fruits.map((fruit) => (
                        <FruitTableRow key={fruit.id} fruit={fruit} />
                      ))}
                  </Fragment>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
