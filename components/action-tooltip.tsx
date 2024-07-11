"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface ActionToolTipProps {
  label: string;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

/**
 * @description When hovered over a component it tels what it does using the label
 * 
 * @param label
 * @param children
 * @param side
 * @param align
 * 
 * @returns provider for hover action 
 */

// TODO: add timing
export const ActionToolTip = ({
  label,
  children,
  side,
  align,
}: ActionToolTipProps) => {
    return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>    
            <TooltipContent side={side} align={align}>
                <p className="font-semibold text-sm capitalize">
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>    
    </TooltipProvider>)
};
