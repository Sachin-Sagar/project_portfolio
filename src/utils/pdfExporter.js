import { jsPDF } from 'jspdf';
import { getStructuredAtsData } from './atsDataFormatter.js';

/**
 * Generates an ATS-compliant single-column PDF resume using jsPDF.
 * Uses real vector text, standard fonts, standard margins, and clean section hierarchies.
 *
 * @param {Object} data - Raw portfolio data from data.json
 * @returns {jsPDF} The generated jsPDF instance
 */
export function generateAtsPdf(data) {
  const structured = getStructuredAtsData(data);
  const { basics, skills, workHistory, researchHistory, internshipHistory, projects, education, courses } = structured;

  // Standard Letter page size in mm: 215.9 x 279.4
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const leftMargin = 14;
  const rightMargin = 201.9;
  const contentWidth = rightMargin - leftMargin; // 187.9 mm
  const topMargin = 14;
  const bottomMargin = 265;

  let y = topMargin;

  // Helper for page break checks
  const ensureSpace = (neededHeight) => {
    if (y + neededHeight > bottomMargin) {
      doc.addPage();
      y = topMargin;
      return true;
    }
    return false;
  };

  // 1. Candidate Name (Header)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // #0f172a
  doc.text(basics.name.toUpperCase(), leftMargin, y);
  y += 6.5;

  // 2. Professional Title
  if (basics.title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(51, 65, 85); // #334155
    doc.text(basics.title, leftMargin, y);
    y += 5;
  }

  // 3. Contact Details (2 neat lines so nothing gets cut off or overflows)
  // Line 1: Email | Phone | Location
  const primaryContact = [];
  if (basics.email) primaryContact.push({ text: basics.email, link: `mailto:${basics.email}` });
  if (basics.phone) primaryContact.push({ text: basics.phone, link: `tel:${basics.phone}` });
  if (basics.location) primaryContact.push({ text: basics.location, link: null });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  let contactX = leftMargin;
  primaryContact.forEach((part, index) => {
    if (index > 0) {
      const sep = '   |   ';
      doc.setTextColor(148, 163, 184);
      doc.text(sep, contactX, y);
      contactX += doc.getTextWidth(sep);
    }
    if (part.link) {
      doc.setTextColor(37, 99, 235);
      doc.textWithLink(part.text, contactX, y, { url: part.link });
    } else {
      doc.setTextColor(71, 85, 105);
      doc.text(part.text, contactX, y);
    }
    contactX += doc.getTextWidth(part.text);
  });
  y += 4.5;

  // Line 2: LinkedIn | GitHub
  const onlineProfiles = [];
  if (basics.linkedin) {
    const displayLinkedin = basics.linkedin.replace(/^https?:\/\/(www\.)?/, '');
    onlineProfiles.push({ label: 'LinkedIn: ', text: displayLinkedin, link: basics.linkedin });
  }
  if (basics.github) {
    const displayGithub = basics.github.replace(/^https?:\/\/(www\.)?/, '');
    onlineProfiles.push({ label: 'GitHub: ', text: displayGithub, link: basics.github });
  }

  contactX = leftMargin;
  onlineProfiles.forEach((profile, index) => {
    if (index > 0) {
      const sep = '   |   ';
      doc.setTextColor(148, 163, 184);
      doc.text(sep, contactX, y);
      contactX += doc.getTextWidth(sep);
    }
    doc.setTextColor(71, 85, 105);
    doc.text(profile.label, contactX, y);
    contactX += doc.getTextWidth(profile.label);

    doc.setTextColor(37, 99, 235);
    doc.textWithLink(profile.text, contactX, y, { url: profile.link });
    contactX += doc.getTextWidth(profile.text);
  });
  y += 4;

  // Divider line after header
  doc.setDrawColor(203, 213, 225); // #cbd5e1
  doc.setLineWidth(0.4);
  doc.line(leftMargin, y, rightMargin, y);
  y += 6;

  // Helper for Section Headings
  const renderSectionHeader = (title) => {
    ensureSpace(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // #0f172a
    doc.text(title.toUpperCase(), leftMargin, y);
    y += 1.8;

    doc.setDrawColor(148, 163, 184); // #94a3b8
    doc.setLineWidth(0.4);
    doc.line(leftMargin, y, rightMargin, y);
    y += 4.5;
  };

  // Helper for rendering wrapped bullet points
  const renderBullet = (bulletText, indent = 4) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);

    const bulletSymbol = '•';
    const bulletWidth = doc.getTextWidth(bulletSymbol + ' ');
    const textWidth = contentWidth - indent - bulletWidth;
    const lines = doc.splitTextToSize(bulletText, textWidth);

    ensureSpace(lines.length * 4.2 + 1);

    // Render bullet symbol
    doc.text(bulletSymbol, leftMargin + indent, y);

    // Render wrapped lines
    lines.forEach((line) => {
      doc.text(line, leftMargin + indent + bulletWidth, y);
      y += 4.2;
    });
  };

  // 4. Professional Summary
  if (basics.summary) {
    renderSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);

    const paragraphs = basics.summary.split('\n\n');
    paragraphs.forEach((p) => {
      const wrapped = doc.splitTextToSize(p.trim(), contentWidth);
      ensureSpace(wrapped.length * 4.2 + 2);
      wrapped.forEach((line) => {
        doc.text(line, leftMargin, y);
        y += 4.2;
      });
      y += 1.5;
    });
    y += 2;
  }

  // 5. Technical Skills
  if (skills.length > 0) {
    renderSectionHeader('Technical Skills');
    skills.forEach(({ category, skillsList }) => {
      ensureSpace(5);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const catLabel = `• ${category}: `;
      doc.text(catLabel, leftMargin, y);

      const catWidth = doc.getTextWidth(catLabel);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);

      const wrappedList = doc.splitTextToSize(skillsList, contentWidth - catWidth);
      if (wrappedList.length === 1) {
        doc.text(wrappedList[0], leftMargin + catWidth, y);
        y += 4.5;
      } else {
        wrappedList.forEach((line, idx) => {
          if (idx === 0) {
            doc.text(line, leftMargin + catWidth, y);
          } else {
            ensureSpace(4.5);
            doc.text(line, leftMargin + 8, y);
          }
          y += 4.5;
        });
      }
    });
    y += 2;
  }

  // 6. Professional Experience
  if (workHistory.length > 0) {
    renderSectionHeader('Professional Experience');
    workHistory.forEach((job) => {
      ensureSpace(14);

      // Line 1: Company (Bold) & Period (Right)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(job.company, leftMargin, y);

      if (job.period) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const pWidth = doc.getTextWidth(job.period);
        doc.text(job.period, rightMargin - pWidth, y);
      }
      y += 4.2;

      // Line 2: Role / Designation (Semi-bold) & Location (Right)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const maxRoleWidth = contentWidth - (job.location ? doc.getTextWidth(job.location) + 8 : 0);
      const titleLines = doc.splitTextToSize(job.title, maxRoleWidth);
      doc.text(titleLines[0], leftMargin, y);

      if (job.location) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        const locWidth = doc.getTextWidth(job.location);
        doc.text(job.location, rightMargin - locWidth, y);
      }
      y += 4.2;

      // If title had extra lines:
      if (titleLines.length > 1) {
        for (let i = 1; i < titleLines.length; i++) {
          doc.text(titleLines[i], leftMargin, y);
          y += 4.2;
        }
      }

      if (job.milestone) {
        ensureSpace(5);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(13, 148, 136); // teal accent
        doc.text(`Milestone: ${job.milestone}`, leftMargin + 4, y);
        y += 4;
      }

      if (job.skills && job.skills.length > 0) {
        ensureSpace(5);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(`Key Focus: ${job.skills.join(', ')}`, leftMargin + 4, y);
        y += 4;
      }

      job.bulletPoints.forEach((bp) => {
        renderBullet(bp, 3);
      });
      y += 2.5;
    });
    y += 1;
  }

  // 7. Key Engineering Projects
  if (projects.length > 0) {
    renderSectionHeader('Key Engineering Projects');
    projects.forEach((proj) => {
      ensureSpace(12);

      // Line 1: Project Name & Period
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(proj.name, leftMargin, y);

      if (proj.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        const pWidth = doc.getTextWidth(proj.period);
        doc.text(proj.period, rightMargin - pWidth, y);
      }
      y += 4.2;

      // Line 2: Context / Subtitle
      if (proj.context) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(proj.context, leftMargin, y);
        y += 4.2;
      }

      // Line 3: Repository link if available
      if (proj.gitRepo) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(37, 99, 235);
        const repoText = `Repository: ${proj.gitRepo}`;
        doc.textWithLink(repoText, leftMargin + 3, y, { url: proj.gitRepo });
        y += 4;
      }

      proj.bullets.forEach((b) => {
        renderBullet(b, 3);
      });
      y += 2.5;
    });
    y += 1;
  }

  // 8. Research & Leadership Experience
  if (researchHistory.length > 0) {
    renderSectionHeader('Research & Leadership Experience');
    researchHistory.forEach((item) => {
      ensureSpace(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(item.organization, leftMargin, y);

      if (item.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        const pWidth = doc.getTextWidth(item.period);
        doc.text(item.period, rightMargin - pWidth, y);
      }
      y += 4.2;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(item.title, leftMargin, y);
      y += 4.2;

      item.bulletPoints.forEach((bp) => {
        renderBullet(bp, 3);
      });
      y += 2.5;
    });
    y += 1;
  }

  // 9. Internships
  if (internshipHistory.length > 0) {
    renderSectionHeader('Internships');
    internshipHistory.forEach((intern) => {
      ensureSpace(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(intern.company, leftMargin, y);

      if (intern.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        const pWidth = doc.getTextWidth(intern.period);
        doc.text(intern.period, rightMargin - pWidth, y);
      }
      y += 4.2;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(intern.title, leftMargin, y);
      y += 4.2;

      intern.bulletPoints.forEach((bp) => {
        renderBullet(bp, 3);
      });
      y += 2.5;
    });
    y += 1;
  }

  // 10. Education
  if (education.length > 0) {
    renderSectionHeader('Education');
    education.forEach((edu) => {
      ensureSpace(12);

      // Line 1: Institution & Year
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(edu.institution, leftMargin, y);

      const emWidth = doc.getTextWidth(edu.year);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(edu.year, rightMargin - emWidth, y);
      y += 4.2;

      // Line 2: Degree & CGPA
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(edu.degree, leftMargin, y);

      if (edu.cgpa) {
        const cgpaText = `CGPA: ${edu.cgpa}`;
        const cgpaWidth = doc.getTextWidth(cgpaText);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(cgpaText, rightMargin - cgpaWidth, y);
      }
      y += 4.2;

      if (edu.minor) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(`Minor: ${edu.minor}`, leftMargin + 3, y);
        y += 4;
      }
      if (edu.notes) {
        renderBullet(edu.notes, 3);
      }
      y += 2.5;
    });
  }

  // 11. Certifications & Continuing Education
  if (courses.length > 0) {
    renderSectionHeader('Certifications & Continuing Education');
    courses.forEach((course) => {
      renderBullet(course, 3);
    });
  }

  return doc;
}

/**
 * Triggers client-side download of the ATS-compliant PDF resume.
 *
 * @param {Object} data - Raw portfolio data
 * @param {string} filename - Desired filename
 */
export function downloadAtsPdf(data, filename = 'Sachin_Sagar_ATS_Resume.pdf') {
  const doc = generateAtsPdf(data);
  doc.save(filename);
}

