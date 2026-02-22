import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Minus } from "lucide-react";

const getBadgeVariant = (change) => {
  const numericChange = Number(change);
  if (numericChange > 0) return "bg-green-600 dark:bg-green-800 text-white border-transparent";
  if (numericChange < 0) return "bg-red-600 dark:bg-red-800 text-white border-transparent";
  return "bg-gray-500 hover:bg-gray-600 text-white border-transparent"; // Color neutro si es exactamente 0
};

const getBadgeIcon = (change) => {
  const numericChange = Number(change);
  if (numericChange > 0) return <ArrowUp size={16} strokeWidth="3px" />;
  if (numericChange < 0) return <ArrowDown size={16} strokeWidth="3px" />;
  return <Minus size={16} strokeWidth="3px" />; // Ícono neutro en lugar de texto
};

export const CardsMetrics = ({
  title,
  value,
  icon,
  iconBgColor,
  percentageChange,
}) => {
  return (
    <Card className="flex flex-col gap-0 justify-between">
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <CardTitle className="text-md font-medium text-neutral-400">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-xl w-fit text-white ${iconBgColor}`}>
          {icon}
        </div>
      </CardHeader>

      <CardContent className={"flex flex-row gap-6 items-center"}>
        <div className="text-4xl font-medium mb-2">{value}</div>
        {percentageChange !== undefined && (
          <Badge className={getBadgeVariant(percentageChange) + " h-fit"}>
            {getBadgeIcon(percentageChange)}
            <span>{percentageChange}%</span>
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
