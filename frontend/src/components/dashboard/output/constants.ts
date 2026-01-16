export const inputStyles = {
  "& .MuiInputLabel-root": {
    color: "#1a1a1a",
    fontWeight: 500,
  },
  "& .MuiInputBase-input": {
    color: "#000000",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#86BC25" },
    "&.Mui-focused fieldset": { borderColor: "#86BC25" },
  },
};

export const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
      marginTop: "4px",
      "& .MuiMenuItem-root": {
        fontSize: "14px",
        color: "#000",
        "&.Mui-selected": {
          backgroundColor: "rgba(134, 188, 37, 0.1) !important",
          fontWeight: 700,
        },
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
};

export const generateOutputId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};
