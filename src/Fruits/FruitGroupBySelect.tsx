import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setGroupBy } from "@/redux/slices/fruits.slice";
import { RootState } from "@/redux/store";
import { GroupBy } from "@/enums/groupBy.enum";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const FruitGroupBySelect: React.FC = () => {
  const dispatch = useDispatch();
  const groupBy = useSelector((state: RootState) => state.fruits.groupBy);

  return (
    <Select
      value={groupBy}
      onValueChange={(value) => dispatch(setGroupBy(value as GroupBy))}
    >
      <SelectTrigger className="w-[240px] [&>span:first-child]:flex [&>span:first-child]:gap-2">
        <SelectValue>
          <span className="text-muted-foreground">Group by :</span>
          <span>{groupBy}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={GroupBy.None}>None</SelectItem>
        <SelectItem value={GroupBy.Family}>Family</SelectItem>
        <SelectItem value={GroupBy.Order}>Order</SelectItem>
        <SelectItem value={GroupBy.Genus}>Genus</SelectItem>
      </SelectContent>
    </Select>
  );
};
