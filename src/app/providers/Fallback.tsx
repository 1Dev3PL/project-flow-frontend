import { CircularProgress } from "@mui/material";

export const Fallback = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress color={"inherit"} />
    </div>
  );
};
