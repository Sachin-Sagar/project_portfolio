# Portfolio Content Sitemap & Quick Editing Guide

This guide is designed to help you quickly find and edit any text or content across your portfolio without having to hunt through code.

---

## ⚡ Quick Content Lookup Table

| If you want to edit... | Go to this file | Key Section / Details |
| :--- | :--- | :--- |
| **Name, Title, Contact Info** (Phone, Email, Location) | [`src/data.json`](./src/data.json) | `"basics"` block (lines 2–11) |
| **"About Me" Bio Paragraphs** | [`src/data.json`](./src/data.json) | `"basics"."summary"` |
| **Sidebar Tagline** ("I am Sachin Sagar, an ... specializing in ...") | [`src/components/Sidebar.jsx`](./src/components/Sidebar.jsx) | Lines 67–72 |
| **Technical Skills List** (Programming, Hardware, Protocols, Tools) | [`src/data.json`](./src/data.json) | `"skills"` block |
| **Professional Experience** (Bajaj Auto roles, dates, bullets, milestones) | [`src/data.json`](./src/data.json) | `"experience"."professional"` |
| **College Experience** (Raftar Formula Racing, DRDO Wing Project) | [`src/data.json`](./src/data.json) | `"experience"."college"` |
| **Internships** (Forbes Marshall, Reevia, Bajaj testing) | [`src/data.json`](./src/data.json) | `"experience"."internships"` |
| **Project Summaries & Highlights** (Cards on home page) | [`src/data.json`](./src/data.json) | `"projects"` block |
| **GPU Clustering Deep-Dive Article** (CUDA, algorithms, benchmarks) | [`src/components/GPUClusteringDetails.jsx`](./src/components/GPUClusteringDetails.jsx) | Technical writeup & math |
| **Embedded C Libraries Deep-Dive Article** (FFT & Quaternions) | [`src/components/EmbeddedCLibraryDetails.jsx`](./src/components/EmbeddedCLibraryDetails.jsx) | Technical writeup & code |
| **Chaos Theory SIMD Deep-Dive Article** (AVX2, Mandelbrot, Lorenz) | [`src/components/ChaosTheoryDetails.jsx`](./src/components/ChaosTheoryDetails.jsx) | Technical writeup & code |
| **Education & Honors** (Degree, IIT Madras, CGPA, Minor) | [`src/data.json`](./src/data.json) | `"education"` block |
| **Certifications & Coursework** (Stanford, Coursera, MathWorks) | [`src/data.json`](./src/data.json) | `"courses"` list |
| **Section Headings** ("Personal Projects", "About me:", etc.) | See [Static UI Shell Text](#3-static-ui-shell-text) | Individual component files |
| **Browser Tab Title & Meta Description** | [`index.html`](./index.html) | `<title>` and `<meta name="description">` |
| **Static Downloadable PDFs** (Original Resume, Poster) | [`public/docs/`](./public/docs/) | PDF files in public folder |

---

## 1. Primary Content Store: [`src/data.json`](./src/data.json)

Almost **90% of the site text** is stored in this single JSON file. Editing here automatically updates both the **webpage** and the **downloadable ATS resume**.

```
src/data.json
├── basics         -> Name, Title, Contact Info, About Summary
├── skills         -> Categorized technical skill lists
├── courses        -> Certifications and coursework list
├── experience     -> Work history, roles, bullets, milestones
│   ├── professional
│   ├── college
│   └── internships
├── projects       -> Project names, contexts, bullet points, results
└── education      -> Degree, CGPA, year, institution, minor
```

### Detailed Breakdown:
- **Header & Contact**:
  - `name`: Candidate full name
  - `title`: Professional headline (e.g. `Embedded Applications Engineer (ADAS)`)
  - `email`, `phone`, `location`: Displayed in sidebar and resume
  - `linkedin`, `github`: URLs for profiles
  - `summary`: Multi-paragraph bio displayed in the **About Me** section (separated by `\n\n`)
- **Skills**:
  - `Programming`, `Protocols`, `Embedded Hardware`, `Control Estimation`, `ADAS Perception`, `Tools`
- **Professional Experience**:
  - Grouped by company (`Bajaj Auto Technology Limited`)
  - Sub-roles (`Manager (R&D)`, `Assistant Manager (R&D)`, `Graduate Trainee Engineer`)
  - Each role contains `period`, `location`, `milestone`, `skills` array, and `bulletPoints` array
- **Personal Projects**:
  - `road-anomaly`: Road Anomaly Detection & Geospatial Mapping
  - `embedded-c-libraries`: Custom Embedded C Libraries
  - `gpu-clustering`: GPU Accelerated Clustering
  - `chaos-theory`: Chaos Theory SIMD Optimization Lab
  - Each project has: `name`, `context`, `period`, `bulletPoints`, `blog`, `results`, and `gitRepo` links
- **Education**:
  - `degree`, `institution`, `cgpa`, `year`, `minor`, `notes`

---

## 2. Project Deep-Dive Pages (Technical Articles)

When a visitor clicks **"View Details"** on a project card, they navigate to dedicated, full-length technical articles:

1. **GPU Accelerated Clustering**:
   - File: [`src/components/GPUClusteringDetails.jsx`](./src/components/GPUClusteringDetails.jsx)
   - Contents: Overview, Sorted Spatial Grid algorithm, Lock-Free Parallel DSU, performance benchmarks, and interactive SVG benchmark chart.
2. **Custom Embedded C Libraries**:
   - File: [`src/components/EmbeddedCLibraryDetails.jsx`](./src/components/EmbeddedCLibraryDetails.jsx)
   - Contents: Real-time FFT radix-2 implementation, Quaternion 3D kinematics, memory benchmarks, and architecture diagrams.
3. **Chaos Theory: SIMD Optimization Lab**:
   - File: [`src/components/ChaosTheoryDetails.jsx`](./src/components/ChaosTheoryDetails.jsx)
   - Contents: AVX2 vectorization, Mandelbrot pixel streams, Lorenz attractor simulations, and speedup tables.

---

## 3. Static UI Shell Text

If you need to change section headers, button text, or navigational labels:

- **Sidebar & Header**: [`src/components/Sidebar.jsx`](./src/components/Sidebar.jsx)
  - Headline quote: lines 67–72 (`"I am Sachin Sagar..."`)
  - Navigation links: lines 81–87 (`About`, `Experiences`, `Projects`, `Skills`, `Education`)
  - Button text: line 95 (`Download Resume`)
  - Footer copyright: lines 122–125
- **Home Page Main Layout**: [`src/App.jsx`](./src/App.jsx)
  - "About me:" heading: line 22
  - Contact pill bar: lines 25–41
  - "Experience" heading: line 55
- **Projects Section Title**: [`src/components/Projects.jsx`](./src/components/Projects.jsx)
  - Section title: line 35 (`"Personal Projects"`)
  - Button text: lines 45 & 49 (`"View Details"`, `"View Poster"`)
- **Experience Timeline Headings**: [`src/components/Experience.jsx`](./src/components/Experience.jsx)
  - Titles: "Professional Experience", "College Experience", "Internships"
- **Skills Section**: [`src/components/Skills.jsx`](./src/components/Skills.jsx)
  - Title: line 6 (`"Skills & Expertise"`)
- **Courses Section**: [`src/components/Courses.jsx`](./src/components/Courses.jsx)
  - Title: line 6 (`"Courses & Certifications"`)
- **Education Section**: [`src/components/Education.jsx`](./src/components/Education.jsx)
  - Title: line 6 (`"Education"`)
- **ATS Export Modal**: [`src/components/AtsExportModal.jsx`](./src/components/AtsExportModal.jsx)
  - Dialog title, subtitle, badge texts, and descriptions for PDF, Plain Text, and Stylized resume formats.

---

## 4. Media & Static Documents

- **Images & Photos**: [`src/assets/pics/`](./src/assets/pics/)
  - `prof_photo.png`: Profile photo in "About me"
  - `IITM_logo.png`: Avatar logo in the sidebar
  - `IITM_building.jpg`: Sidebar background photo
  - `road_anomaly_tile.png`, `embedded_libs_tile.png`, `gpu_clustering_tile.png`, `chaos_theory_tile.png`: Project tile previews
  - `Bajaj_auto_icon.jpg`, `BATL_icon.jpg`, `reevia_icon.jpg`, `forbes-marshall.png`: Company icons
- **Static Downloadable PDFs**: [`public/docs/`](./public/docs/)
  - `ssagar_resume.pdf`: Original stylized resume PDF
  - `BTP_Poster.pdf`: BTech project poster
  - `BTP_Report_signed.pdf`: BTech project report

---

## 5. Development & Testing Commands

- **Start Local Preview Server**:
  ```bash
  npm run dev
  ```
- **Check for Typos or Lint Issues**:
  ```bash
  npm run lint
  ```
- **Verify Production Build**:
  ```bash
  npm run build
  ```

