import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const Resume: React.FC = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const pdfFile = '/Resume_Anurag_Sharma.pdf';

  return (
    <div
      className="win-app-body"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f3f3f3' }}
    >
      {/* Toolbar — wraps on small windows */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px 14px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1c1c1c' }}>Resume_Anurag_Sharma.pdf</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          <button
            className="win-btn"
            style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1c1c1c', width: '40px', textAlign: 'center' }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            className="win-btn"
            style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setScale(s => Math.min(2.5, s + 0.1))}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.12)', margin: '0 6px' }} />
          <button className="win-btn" style={{ padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }} title="Print"
            onClick={() => window.open(pdfFile, '_blank')}>
            <Printer size={14} /> Print
          </button>
          <a
            href={pdfFile}
            download="Resume_Anurag_Sharma.pdf"
            className="win-btn win-btn-accent"
            style={{ padding: '4px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
          >
            <Download size={14} /> Download
          </a>
        </div>
      </div>

      {/* PDF Viewer — fills remaining space, scrollable */}
      <div
        className="win-scrollbar"
        style={{ flex: 1, overflow: 'auto', background: '#e5e5e5', display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div style={{ marginTop: '60px', fontSize: '13px', color: '#616161' }}>Loading Document...</div>
          }
          error={
            <div style={{ marginTop: '60px', fontSize: '13px', color: '#d13438', background: '#fff', padding: '14px 18px', borderRadius: '6px', border: '1px solid rgba(209,52,56,0.3)' }}>
              Failed to load PDF. Please provide a valid file.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Footer */}
      {numPages && (
        <div style={{ height: '26px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#616161', fontWeight: 500, flexShrink: 0 }}>
          Page {pageNumber} of {numPages}
        </div>
      )}
    </div>
  );
};
