import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewType } from "@/enums/viewType.enum";
import { loadFruits } from "@/redux/slices/fruits.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FruitGroupBySelect } from "./FruitGroupBySelect";
import { FruitJar } from "./FruitJar/FruitJar";
import { FruitListDisplay } from "./FruitListDisplay";
import { FruitTableDisplay } from "./FruitTableDisplay";

export const FruitDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.fruits);
  const [view, setView] = useState<ViewType>(ViewType.List);

  useEffect(() => {
    dispatch(loadFruits());
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-[25px] w-full rounded-lg" />
          <Skeleton className="h-[25px] w-full rounded-lg" />
          <Skeleton className="h-[25px] w-full rounded-lg" />
        </div>
      )}

      {error && (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && (
        <div className="flex flex-col lg:flex-row p-4 gap-4">
          <div className="lg:w-2/3 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <FruitGroupBySelect />
              <Tabs
                value={view}
                onValueChange={(value) => setView(value as ViewType)}
              >
                <TabsList>
                  <TabsTrigger value={ViewType.List}>List</TabsTrigger>
                  <TabsTrigger value={ViewType.Table}>Table</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Card className="flex-grow overflow-auto">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Fruit List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {view === ViewType.List ? (
                    <FruitListDisplay />
                  ) : (
                    <FruitTableDisplay />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-1/3">
            <FruitJar />
          </div>
        </div>
      )}
    </>
  );
};
