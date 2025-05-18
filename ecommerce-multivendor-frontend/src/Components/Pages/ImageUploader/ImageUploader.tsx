import { Input } from "../../ui/input";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export function ImageUploader({
    label,
    //onChange,
}: {
    label: string;
    placeholderUrl?: string;
    //onChange: (file: File) => void;
}) {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            //setPreview(URL.createObjectURL(file));
            setFileName(file.name);
            //onChange(file);
        }
    };

    return (
        <div className="space-y-2">
            <label className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-300 w-[100px] h-[100px] overflow-hidden">
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex w-full h-full flex-col items-center justify-center text-gray-400">
                    <UploadCloud className="w-6 h-6 mb-1" />
                    <span className="text-xs">{label}</span>
                </div>

            </label>
            {fileName && (
                <p className="text-sm text-gray-500 text-center">{fileName}</p>
            )}
        </div>
    );
}
