import { useState } from "react";

function ReceiptUploadBox({ onFileSelect, file, onClear }) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type.startsWith("image/")) {
        onFileSelect(selectedFile);
      }
    }
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  }

  const imagePreviewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-white">
        Receipt Upload
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Drop a receipt image to extract transactions
      </p>

      <div className="mt-5">
        {file ? (
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#060A12]">
              <img
                src={imagePreviewUrl}
                alt="Receipt Preview"
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={onClear}
                className="absolute top-4 right-4 rounded-xl bg-[#02050A]/70 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#02050A]"
              >
                Change Image
              </button>
            </div>
            <div className="text-center text-xs text-slate-400 truncate">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </div>
          </div>
        ) : (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center cursor-pointer transition ${
              isDragOver
                ? "border-emerald-400 bg-emerald-400/5 text-emerald-300"
                : "border-white/10 bg-white/[0.01] text-slate-400 hover:border-white/20 hover:bg-white/[0.03]"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg text-emerald-300">
              ◈
            </div>
            <p className="mt-4 text-sm font-semibold text-white">
              Drag & drop receipt image
            </p>
            <p className="mt-2 text-xs text-slate-500">
              or click to browse from files
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-wide text-slate-600">
              Supports JPEG, PNG, WEBP (Max 5MB)
            </p>
          </label>
        )}
      </div>
    </div>
  );
}

export default ReceiptUploadBox;
