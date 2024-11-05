import { Button } from "@/components/ui/button";
import { IJarItemWithFruit } from "@/interfaces";
import {
  addFruitToJar,
  removeQuantityFromFruitInJar,
} from "@/redux/slices/jar.slice";
import { AppDispatch } from "@/redux/store";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useDispatch } from "react-redux";

export interface IJarItemProps {
  jarItem: IJarItemWithFruit;
}

export function JarItem({ jarItem }: IJarItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDecrement = () => {
    dispatch(
      removeQuantityFromFruitInJar({ id: jarItem.fruit.id, quantity: 1 })
    );
  };

  const handleIncrement = () => {
    dispatch(addFruitToJar(jarItem.fruit.id));
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span className="font-medium">{jarItem.fruit.name}</span>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          {jarItem.fruit.nutritions.calories * jarItem.quantity} calories
        </span>
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={handleDecrement}
            disabled={jarItem.quantity <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-2 py-1 text-sm">{jarItem.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
