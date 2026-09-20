/**
 * Utilities to transform portfolio data from data.json into ATS-compliant structured text and sections.
 */

/**
 * Normalizes and extracts data for ATS resume formatting
 * @param {Object} data - Raw portfolio data (from data.json)
 * @returns {Object} Structured data ready for PDF, TXT, or DOCX generation
 */
export function getStructuredAtsData(data) {
  const basics = data.basics || {};
  const skills = data.skills || {};
  const experience = data.experience || {};
  const projects = data.projects || [];
  const education = data.education || [];
  const courses = data.courses || [];

  // Header contact line elements
  const contactItems = [
    basics.email,
    basics.phone,
    basics.location,
    basics.linkedin ? basics.linkedin.replace(/^https?:\/\/(www\.)?/, '') : null,
    basics.github ? basics.github.replace(/^https?:\/\/(www\.)?/, '') : null,
  ].filter(Boolean);

  // Flatten & structure professional experience
  const workHistory = [];

  if (Array.isArray(experience.professional)) {
    experience.professional.forEach((item) => {
      const company = item.company;
      const companyLocation = item.location || '';

      if (item.grouped && Array.isArray(item.roles)) {
        item.roles.forEach((subRole) => {
          const designation = subRole.designation;
          const period = subRole.period;

          if (Array.isArray(subRole.tracks) && subRole.tracks.length > 0) {
            subRole.tracks.forEach((track) => {
              workHistory.push({
                company,
                location: track.location || companyLocation,
                title: `${designation} – ${track.role}`,
                period: track.period || period,
                milestone: track.milestone || null,
                skills: track.skills || [],
                bulletPoints: track.bulletPoints || [],
              });
            });
          } else {
            workHistory.push({
              company,
              location: companyLocation,
              title: designation,
              period,
              milestone: null,
              skills: [],
              bulletPoints: subRole.bulletPoints || [],
            });
          }
        });
      } else {
        workHistory.push({
          company,
          location: companyLocation,
          title: item.role || item.title || 'Engineer',
          period: item.period || '',
          milestone: null,
          skills: [],
          bulletPoints: item.bulletPoints || [],
        });
      }
    });
  }

  // College & Research Experience
  const researchHistory = [];
  if (Array.isArray(experience.college)) {
    experience.college.forEach((item) => {
      if (item.grouped && Array.isArray(item.roles)) {
        item.roles.forEach((subRole) => {
          researchHistory.push({
            organization: item.company,
            title: subRole.role,
            period: subRole.period,
            bulletPoints: subRole.bulletPoints || [],
          });
        });
      } else {
        researchHistory.push({
          organization: item.company,
          title: item.role,
          period: item.period,
          bulletPoints: item.bulletPoints || [],
        });
      }
    });
  }

  // Internships
  const internshipHistory = [];
  if (Array.isArray(experience.internships)) {
    experience.internships.forEach((item) => {
      internshipHistory.push({
        company: item.company,
        title: item.role,
        period: item.period,
        bulletPoints: item.bulletPoints || [],
      });
    });
  }

  // Projects
  const structuredProjects = projects.map((proj) => ({
    name: proj.name,
    context: proj.context || 'Engineering Project',
    period: proj.period || '',
    bullets: [
      ...(proj.bulletPoints || []),
      ...(proj.results || []).map((res) => `Outcome: ${res}`),
    ],
    gitRepo: proj.gitRepo || '',
  }));

  // Skills Categories
  const categorizedSkills = Object.entries(skills).map(([category, items]) => ({
    category,
    skillsList: Array.isArray(items) ? items.join(', ') : String(items),
  }));

  // Education
  const structuredEducation = education.map((edu) => ({
    degree: edu.degree,
    institution: edu.institution,
    year: edu.year,
    cgpa: edu.cgpa,
    minor: edu.minor || null,
    notes: edu.notes || null,
  }));

  return {
    basics: {
      name: basics.name,
      title: basics.title,
      summary: basics.summary,
      email: basics.email,
      phone: basics.phone,
      location: basics.location,
      linkedin: basics.linkedin,
      github: basics.github,
      contactLine: contactItems.join('  |  '),
    },
    skills: categorizedSkills,
    workHistory,
    researchHistory,
    internshipHistory,
    projects: structuredProjects,
    education: structuredEducation,
    courses,
  };
}

