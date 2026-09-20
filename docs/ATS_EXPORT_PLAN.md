# ATS-Friendly Resume Export Feature Plan

## 1. Overview & Objective
This document details the architecture, design, and implementation plan for adding an ATS-friendly (Applicant Tracking System) download feature to the portfolio web application.

Applicant Tracking Systems (such as Workday, Taleo, Greenhouse, Lever, and iCIMS) parse uploaded resumes into structured database fields. Traditional web pages or highly stylized resumes often fail ATS parsing due to multi-column layouts, graphics, icons, canvas elements, and non-standard section headers.

This feature enables generating and exporting an ATS-compliant resume directly from [`src/data.json`](../src/data.json) on demand, guaranteeing that the exported document is always up-to-date with the portfolio data.

---

## 2. Core ATS Standards Enforced
To ensure maximum compatibility and 100% parsing accuracy:
1. **Single-Column Linear Layout**: Information flows sequentially from top to bottom without side-by-side columns that scramble parser text streams.
2. **Canonical Section Headings**:
   - `PROFESSIONAL SUMMARY`
   - `TECHNICAL SKILLS`
   - `PROFESSIONAL EXPERIENCE`
   - `ENGINEERING PROJECTS`
   - `EDUCATION`
   - `CERTIFICATIONS & COURSEWORK`
3. **Pure Vector Text**: Real searchable, selectable UTF-8 text with standard web-safe fonts (Helvetica, Arial, Times New Roman), avoiding rasterized images or HTML canvas captures.
4. **Standard Bullet Points**: Conventional unicode bullets (`•`) for job descriptions and achievements.
5. **Clean Header & Contact Info**: Name, title, email, phone number, location, LinkedIn, and GitHub links prominently placed at the top.
6. **Consistent Date Format**: Standard `MM/YYYY - Present` or `Month YYYY` representations.

---

## 3. Architecture & User Experience (Option A)

### User Flow
1. Visitor clicks the **"Download Resume"** (or **"Export Resume"**) button in the Sidebar.
2. An accessible, responsive **ATS Export Modal** appears with clear format options:
   - **ATS PDF (.pdf)**: Clean, single-column, standard ATS-compliant vector PDF generated directly in the browser.
   - **ATS Plain Text (.txt)**: Clean ASCII/UTF-8 formatted text resume ideal for copying/pasting into online job application forms with zero formatting issues.
   - **Original Formatted Resume (PDF)**: Access to the original stylized PDF document (`ssagar_resume.pdf`).
   - *(Optional)* **ATS Markdown (.md)**: Formatted markdown for developers and technical recruiters.
3. Clicking a format triggers an instant client-side download without requiring server round-trips or print dialog navigation.

### Component Structure
- `src/data.json`: Updated `basics` section with `phone: "+91 7979039100"` and `location: "Pune, Maharashtra, India"`.
- `src/utils/atsDataFormatter.js`: Core data extraction and normalization layer that translates raw portfolio data into structured resume sections.
- `src/utils/textExporter.js`: Zero-dependency plain text and markdown file generator using the native browser `Blob` and `URL.createObjectURL` APIs.
- `src/utils/pdfExporter.js`: Vector PDF generator implementing single-column ATS rules with selectable text and active links.
- `src/components/AtsExportModal.jsx` & `AtsExportModal.css`: Modal dialog for format selection, styled with light and dark mode support matching the portfolio theme.
- `src/components/Sidebar.jsx` & `Sidebar.css`: Updated action buttons to trigger the ATS export modal and display contact details.

---

## 4. Implementation Steps
1. **Data Model Updates**: Add phone number and location to `basics` in `src/data.json`.
2. **Contact Details on Page**: Display the updated contact details (phone, email, location) clearly in the sidebar / portfolio header.
3. **ATS Formatting Logic**: Build `atsDataFormatter.js` to structure the profile, skills, experience, projects, education, and coursework.
4. **Text Exporter**: Build `textExporter.js` for `.txt` and `.md` exports.
5. **PDF Exporter**: Build `pdfExporter.js` for crisp, single-column vector ATS PDF generation.
6. **UI Modal Component**: Implement `AtsExportModal.jsx` with modal backdrop, format cards, keyboard accessibility (Esc to close), and download triggers.
7. **Sidebar Integration**: Wire up state in `Sidebar.jsx` to open the modal.
8. **Verification & Testing**: Test PDF and text generation, verify ATS text extraction with `pdftotext`, verify mobile responsiveness and theme toggling.

