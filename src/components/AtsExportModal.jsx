import React, { useState, useEffect } from 'react';
import './AtsExportModal.css';
import { downloadAtsPlainText } from '../utils/textExporter.js';

const AtsExportModal = ({ isOpen, onClose, data }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const { downloadAtsPdf } = await import('../utils/pdfExporter.js');
      downloadAtsPdf(data);
    } catch (err) {
      console.error('Failed to generate ATS PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const onDownloadText = () => {
    downloadAtsPlainText(data);
  };

  const originalResumeUrl = `${import.meta.env.BASE_URL}docs/ssagar_resume.pdf`;

  return (
    <div className="ats-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="ats-modal-title">
      <div className="ats-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ats-modal-header">
          <div>
            <h3 id="ats-modal-title" className="ats-modal-title">Download Resume</h3>
            <p className="ats-modal-subtitle">Select an ATS-optimized format or the original stylized layout.</p>
          </div>
          <button className="ats-modal-close" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="ats-modal-body">
          {/* Option 1: ATS PDF */}
          <div className="ats-format-card featured">
            <div className="ats-card-header">
              <span className="ats-format-name">
                📄 ATS-Friendly PDF (.pdf)
              </span>
              <span className="ats-badge ats-badge-primary">Recommended</span>
            </div>
            <p className="ats-format-description">
              Single-column, vector text layout designed for Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever). Formatted with canonical headers, live selectable text, standard margins, and zero graphics.
            </p>
            <div className="ats-card-action">
              <button
                className="ats-btn ats-btn-primary"
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? '⏳ Generating PDF...' : 'Download ATS PDF'}
              </button>
            </div>
          </div>

          {/* Option 2: Plain Text */}
          <div className="ats-format-card">
            <div className="ats-card-header">
              <span className="ats-format-name">
                📝 Plain Text (.txt)
              </span>
              <span className="ats-badge ats-badge-secondary">Universal</span>
            </div>
            <p className="ats-format-description">
              Pure ASCII/UTF-8 formatted text with standard section dividers. Perfect for directly copying and pasting into web application forms with guaranteed 100% parsing reliability.
            </p>
            <div className="ats-card-action">
              <button className="ats-btn ats-btn-outline" onClick={onDownloadText}>
                Download Plain Text
              </button>
            </div>
          </div>

          {/* Option 3: Original Formatted PDF */}
          <div className="ats-format-card">
            <div className="ats-card-header">
              <span className="ats-format-name">
                🎨 Stylized Resume (PDF)
              </span>
              <span className="ats-badge ats-badge-secondary">Human Reading</span>
            </div>
            <p className="ats-format-description">
              Original stylized multi-section visual document. Ideal for direct human review, portfolio presentation, and networking.
            </p>
            <div className="ats-card-action">
              <a
                href={originalResumeUrl}
                target="_blank"
                rel="noreferrer"
                className="ats-btn ats-btn-outline"
                download="ssagar_resume.pdf"
              >
                Download Original PDF
              </a>
            </div>
          </div>
        </div>

        <div className="ats-modal-footer">
          <p className="ats-footer-hint">
            💡 Dynamic formats are generated directly from your live portfolio data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtsExportModal;
