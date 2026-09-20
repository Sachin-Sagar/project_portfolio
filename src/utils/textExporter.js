import { getStructuredAtsData } from './atsDataFormatter.js';

/**
 * Converts structured ATS data into clean, readable plain text.
 */
export function generateAtsPlainText(data) {
  const structured = getStructuredAtsData(data);
  const { basics, skills, workHistory, researchHistory, internshipHistory, projects, education, courses } = structured;

  const lines = [];

  // Header
  lines.push(basics.name.toUpperCase());
  if (basics.title) lines.push(basics.title);
  if (basics.contactLine) lines.push(basics.contactLine);
  lines.push('');
  lines.push('================================================================================');

  // Professional Summary
  if (basics.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('--------------------------------------------------------------------------------');
    // Wrap text nicely or include clean paragraphs
    basics.summary.split('\n\n').forEach((para) => {
      lines.push(para.trim());
      lines.push('');
    });
  }

  // Technical Skills
  if (skills.length > 0) {
    lines.push('TECHNICAL SKILLS');
    lines.push('--------------------------------------------------------------------------------');
    skills.forEach(({ category, skillsList }) => {
      lines.push(`• ${category}: ${skillsList}`);
    });
    lines.push('');
  }

  // Professional Experience
  if (workHistory.length > 0) {
    lines.push('PROFESSIONAL EXPERIENCE');
    lines.push('--------------------------------------------------------------------------------');
    workHistory.forEach((job) => {
      lines.push(`${job.company} | ${job.title}`);
      const meta = [job.location, job.period].filter(Boolean).join('  |  ');
      if (meta) lines.push(meta);

      if (job.milestone) {
        lines.push(`  * Milestone: ${job.milestone}`);
      }
      if (job.skills && job.skills.length > 0) {
        lines.push(`  * Core Focus: ${job.skills.join(', ')}`);
      }

      job.bulletPoints.forEach((bp) => {
        lines.push(`  • ${bp}`);
      });
      lines.push('');
    });
  }

  // Engineering Projects
  if (projects.length > 0) {
    lines.push('ENGINEERING PROJECTS');
    lines.push('--------------------------------------------------------------------------------');
    projects.forEach((proj) => {
      const header = [proj.name, proj.context, proj.period].filter(Boolean).join('  |  ');
      lines.push(header);
      if (proj.gitRepo) lines.push(`Repository: ${proj.gitRepo}`);

      proj.bullets.forEach((b) => {
        lines.push(`  • ${b}`);
      });
      lines.push('');
    });
  }

  // College & Research Experience
  if (researchHistory.length > 0) {
    lines.push('RESEARCH & LEADERSHIP EXPERIENCE');
    lines.push('--------------------------------------------------------------------------------');
    researchHistory.forEach((item) => {
      lines.push(`${item.organization} | ${item.title} (${item.period})`);
      item.bulletPoints.forEach((bp) => {
        lines.push(`  • ${bp}`);
      });
      lines.push('');
    });
  }

  // Internships
  if (internshipHistory.length > 0) {
    lines.push('INTERNSHIPS');
    lines.push('--------------------------------------------------------------------------------');
    internshipHistory.forEach((intern) => {
      lines.push(`${intern.company} | ${intern.title} (${intern.period})`);
      intern.bulletPoints.forEach((bp) => {
        lines.push(`  • ${bp}`);
      });
      lines.push('');
    });
  }

  // Education
  if (education.length > 0) {
    lines.push('EDUCATION');
    lines.push('--------------------------------------------------------------------------------');
    education.forEach((edu) => {
      lines.push(`${edu.degree} - ${edu.institution}`);
      const eduMeta = [`Graduation: ${edu.year}`, edu.cgpa ? `CGPA: ${edu.cgpa}` : null].filter(Boolean).join('  |  ');
      lines.push(eduMeta);
      if (edu.minor) lines.push(`Minor: ${edu.minor}`);
      if (edu.notes) lines.push(`• ${edu.notes}`);
      lines.push('');
    });
  }

  // Coursework & Certifications
  if (courses.length > 0) {
    lines.push('CERTIFICATIONS & CONTINUING EDUCATION');
    lines.push('--------------------------------------------------------------------------------');
    courses.forEach((course) => {
      lines.push(`• ${course}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Triggers a client-side download of the plain text resume.
 */
export function downloadAtsPlainText(data, filename = 'Sachin_Sagar_ATS_Resume.txt') {
  const content = generateAtsPlainText(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
