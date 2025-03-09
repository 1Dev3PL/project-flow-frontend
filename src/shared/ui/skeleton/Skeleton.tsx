import { Skeleton as MuiSkeleton, SkeletonProps } from "@mui/material";

export const Skeleton = (props: SkeletonProps) => {
  return <MuiSkeleton {...props} sx={{bgcolor: "grey.700"}} />;
};
