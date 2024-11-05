import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IFruit } from "@/interfaces";
import { addFruitToJar } from "@/redux/slices/jar.slice";
import { AppDispatch } from "@/redux/store";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export interface IFruitTableRowProps {
  fruit: IFruit;
}

export function FruitTableRow({ fruit }: IFruitTableRowProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddFruitToJar = () => {
    dispatch(addFruitToJar(fruit.id));
    toast.success("Added fruit to the jar");
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{fruit.name}</TableCell>
      <TableCell>{fruit.family}</TableCell>
      <TableCell>{fruit.order}</TableCell>
      <TableCell>{fruit.genus}</TableCell>
      <TableCell>{fruit.nutritions.calories}</TableCell>
      <TableCell className="text-end">
        <Button variant="outline" size="sm" onClick={handleAddFruitToJar}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
}
