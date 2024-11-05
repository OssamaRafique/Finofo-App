import { Button } from "@/components/ui/button";
import { IFruit } from "@/interfaces";
import { addMultipleFruitsToJar } from "@/redux/slices/jar.slice";
import { AppDispatch } from "@/redux/store";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export interface IFruitGroupAddButtonProps {
  fruits: IFruit[];
}

export function FruitGroupAddButton({ fruits }: IFruitGroupAddButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddAllGroupFruits = (groupFruits: IFruit[]) => {
    const fruitsToAdd = groupFruits.map((fruit) => fruit.id);
    dispatch(addMultipleFruitsToJar(fruitsToAdd));
    toast.success("Added all fruits to the jar");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        handleAddAllGroupFruits(fruits);
      }}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add All
    </Button>
  );
}
