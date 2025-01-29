import { Layers, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";

export const MapControls = () => (
    <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="secondary" size="sm">
            <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm">
            <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm">
            <Layers className="h-4 w-4" />
        </Button>
    </div>
);