import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectJarDetails, selectTotalCalories } from "@/redux/selectors";
import { clearJar } from "@/redux/slices/jar.slice";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { JarItem } from "./JarItem";
import { PieChart } from "./PieChart";

export function FruitJar() {
  const dispatch = useDispatch();
  const jarItems = useSelector(selectJarDetails);
  const totalCalories = useSelector(selectTotalCalories);

  const handleClearJar = () => {
    dispatch(clearJar());
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0 p-5">
        <CardTitle className="text-xl font-semibold">Fruit Jar</CardTitle>

        {jarItems.length > 0 && (
          <Button variant="default" size="sm" onClick={handleClearJar}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <div className="h-[1px] w-full bg-border mb-4" />

      <CardContent className="flex flex-col h-full">
        {jarItems.length === 0 ? (
          <Alert variant="destructive">
            <AlertTitle>No items in the jar</AlertTitle>
            <AlertDescription>
              Add some fruits to your jar to get started
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex-grow overflow-auto mb-4">
              {jarItems.map((item) => (
                <JarItem key={item.fruit.id} jarItem={item} />
              ))}
            </div>
            <div className="text-lg font-semibold mb-4">
              Total Calories: {totalCalories}
            </div>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <PieChart jarItems={jarItems} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
