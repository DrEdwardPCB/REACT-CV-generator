import * as React from "react";
import TextField from "@mui/material/TextField";

export interface IJSONInputProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function JSONInput({ value, handleChange }: IJSONInputProps) {
    return (
        <div className="flex-1">
            <TextField
                className="w-full h-full"
                id="outlined-multiline-static"
                label="JSON"
                multiline
                rows={10}
                defaultValue="Default Value"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
