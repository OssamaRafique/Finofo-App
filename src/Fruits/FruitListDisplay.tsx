import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GroupBy } from "@/enums/groupBy.enum";
import { IFruit } from "@/interfaces/fruit.interface";
import {
  selectFruitsArray,
  selectGroupBy,
  selectGroupedFruits,
} from "@/redux/selectors";
import { addMultipleFruitsToJar } from "@/redux/slices/jar.slice";
import { AppDispatch } from "@/redux/store";
import { ChevronRight, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FruitList } from "./FruitList";

export function FruitListDisplay() {
  const dispatch = useDispatch<AppDispatch>();
  const groupBy = useSelector(selectGroupBy);
  const fruits = useSelector(selectFruitsArray);
  const groupedFruits = useSelector(selectGroupedFruits);

  const handleAddAllGroupFruits = (groupFruits: IFruit[]) => {
    const fruitsToAdd = groupFruits.map((fruit) => fruit.id);
    dispatch(addMultipleFruitsToJar(fruitsToAdd));
  };

  return (
    <>
      {groupBy === GroupBy.None ? (
        <FruitList fruits={fruits} />
      ) : (
        groupedFruits.map((group) => (
          <Collapsible key={group.group}>
            <div className="flex items-center justify-between w-full p-2 bg-muted hover:bg-muted/80 rounded-md">
              <CollapsibleTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200" />
                  <span className="font-medium">{group.group}</span>
                </div>
              </CollapsibleTrigger>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddAllGroupFruits(group.fruits);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add All
              </Button>
            </div>
            <CollapsibleContent className="pl-4 space-y-1 mt-1">
              <FruitList fruits={group.fruits} />
            </CollapsibleContent>
          </Collapsible>
        ))
      )}
    </>
  );
}
