import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';
import { ExternalBlob } from '../backend';

interface FileUploadWithProgressProps {
  onFileSelect: (blob: ExternalBlob) => void;
  accept?: string;
  label?: string;
}

export default function FileUploadWithProgress({
  onFileSelect,
  accept = '.pdf',
  label = 'Upload File',
}: FileUploadWithProgressProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      onFileSelect(blob);
      setIsUploading(false);
    } catch (error) {
      console.error('File upload error:', error);
      setIsUploading(false);
      setFileName('');
      setUploadProgress(0);
    }
  };

  const handleClear = () => {
    setFileName('');
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
          <Upload className="h-4 w-4 mr-2" />
          {label}
        </Button>
        {fileName && (
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm text-muted-foreground truncate">{fileName}</span>
            {!isUploading && (
              <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      {isUploading && (
        <div className="space-y-1">
          <Progress value={uploadProgress} />
          <p className="text-xs text-muted-foreground text-center">{uploadProgress}% uploaded</p>
        </div>
      )}
    </div>
  );
}
