import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton: React.FC = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

export default LoadingSkeleton;
