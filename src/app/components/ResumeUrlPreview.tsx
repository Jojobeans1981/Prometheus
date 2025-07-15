interface ResumeUrlPreviewProps {
  url: string;
  onOpen?: () => void;
}

export default function ResumeUrlPreview({ url, onOpen }: ResumeUrlPreviewProps) {
  const urlType = url.includes('drive.google.com') 
    ? 'Google Drive'
    : url.includes('dropbox.com')
    ? 'Dropbox'
    : 'External Link';

  return (
    <div className="border rounded p-2 mt-2">
      <div className="flex items-center gap-2">
        <span>📄 {urlType}</span>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={onOpen}
          className="text-blue-500 hover:underline text-sm ml-auto"
        >
          Open Resume
        </a>
      </div>
    </div>
  );
}