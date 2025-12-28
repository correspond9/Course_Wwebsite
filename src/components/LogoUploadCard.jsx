import React, { useState } from 'react';
import { ImageIcon, Loader2, CheckCircle } from 'lucide-react';

const LogoUploadCard = ({ onSave }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      
      // Simulate upload progress
      setTimeout(() => {
        setIsUploading(false);
        if (onSave) onSave();
      }, 1500);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:border-blue-200 transition-all">
      <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
        <ImageIcon size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Brand Logo</h3>
      <p className="text-gray-500 mb-6 text-sm">
        {fileName ? `Selected: ${fileName}` : "Upload a high-resolution SVG or PNG logo."}
      </p>
      
      <label className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors block group-hover:border-blue-300">
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={24} className="animate-spin text-blue-600" />
            <p className="text-sm font-medium text-gray-600">Uploading...</p>
          </div>
        ) : (
          <>
            <p className="text-blue-600 font-medium">Click to upload</p>
            <p className="text-xs text-gray-400 mt-1">Max file size: 2MB</p>
          </>
        )}
      </label>
    </div>
  );
};

export default LogoUploadCard;