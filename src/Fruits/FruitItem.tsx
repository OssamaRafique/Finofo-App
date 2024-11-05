import { Button } from "@/components/ui/button";
import { IFruit } from "@/interfaces/fruit.interface";
import { addFruitToJar } from "@/redux/slices/jar.slice";
import { AppDispatch } from "@/redux/store";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export interface IFruitItemProps {
  fruit: IFruit;
}

export function FruitItem({ fruit }: IFruitItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToJar = () => {
    dispatch(addFruitToJar(fruit.id));
    toast.success("Added fruit to the jar");
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 border-b">
        <span>
          {fruit.name} ({fruit.nutritions.calories} calories)
        </span>
        <Button variant="outline" size="sm" onClick={handleAddToJar}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </>
  );
}
