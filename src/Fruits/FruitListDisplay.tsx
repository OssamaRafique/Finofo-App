import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GroupBy } from "@/enums/groupBy.enum";
import {
  selectFruitsArray,
  selectGroupBy,
  selectGroupedFruits,
} from "@/redux/selectors";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { FruitGroupAddButton } from "./FruitGroupAddButton";
import { FruitList } from "./FruitList";

export function FruitListDisplay() {
  const groupBy = useSelector(selectGroupBy);
  const fruits = useSelector(selectFruitsArray);
  const groupedFruits = useSelector(selectGroupedFruits);

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
              <FruitGroupAddButton fruits={group.fruits} />
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
