import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GroupBy } from "@/enums/groupBy.enum";
import {
  selectFruitsArray,
  selectGroupBy,
  selectGroupedFruits,
} from "@/redux/selectors";
import { useSelector } from "react-redux";
import { FruitTableGroupedRow } from "./FruitTableGroupedRow";
import { FruitTableRow } from "./FruitTableRow";

export function FruitTableDisplay() {
  const fruits = useSelector(selectFruitsArray);
  const groupedFruits = useSelector(selectGroupedFruits);
  const groupBy = useSelector(selectGroupBy);

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
              {groupedFruits.map((group) => (
                <FruitTableGroupedRow key={group.group} group={group} />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
