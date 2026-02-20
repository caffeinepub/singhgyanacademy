# Specification

## Summary
**Goal:** Transform Singh Gyan Academy into a comprehensive All India Education Platform with expanded competitive exam coverage, school education (Classes 1-12), and enhanced AI learning tools.

**Planned changes:**
- Update main navigation to include 11 menu items: Home, AI Learning, Competitive Exams, School Education, Video Classes, Study Material, Test Series, Current Affairs, Geography Special, About, Contact
- Update site tagline to "Ek Kadam Nishulk Shiksha Ki Aur" and subtitle to "India's Smart Learning Platform"
- Create Competitive Exams landing page with 7 major exam categories: Civil Services, SSC, Railway, Police, Teaching, Banking, Defence
- Create Civil Services page with UPSC sections (Prelims, Mains, Optional, Interview, Notes, Test Series) and 18 State PCS exam pages (UPPCS, BPSC, MPPCS, RPSC, HPSC, UKPSC, JPSC, CGPSC, MPSC, GPSC, APPSC, TSPSC, WBPSC, TNPSC, KPSC, Kerala PSC, Punjab PSC, Other States)
- Extend backend CourseCategory enum to include all State PCS, SSC (9 exams), Railway (7 exams), Police (8 exams), Teaching (10 exams), Banking (7 exams), and Defence (6 exams) categories
- Create School Education section with Classes 1-12 and 8 board options (CBSE, ICSE, UP Board, Bihar Board, MP Board, Rajasthan Board, Maharashtra Board, Other State Boards) with Subject Wise Notes, Videos, Question Bank, and Sample Papers
- Add backend support for school education with Class enum (Class1-Class12), Board enum, and content types
- Create exam-specific pages for SSC, Railway, Police, Teaching, Banking, and Defence with detail pages showing Syllabus, Notes, Previous Papers, and Test Series
- Update AI Learning Zone to include AI Study Planner and Doubt Solver alongside existing 6 AI tools
- Create Study Material page with 9 subjects: History, Geography, Polity, Economy, Science, Maths, Reasoning, English, Hindi
- Update Video Classes page to integrate @singhgyanacademy YouTube channel with organized playlists
- Add PYQ Practice section to Test Series page alongside Daily Quiz, Weekly Test, and Full Mock
- Create Geography Special page with 8 specialized sections: Physical Geography, Human Geography, Indian Geography, Climatology, Oceanography, Models & Theories, UPSC Optional, University
- Update Current Affairs Hub to include Quiz section alongside Daily, Weekly, Monthly tabs
- Update admin dashboard to manage all new exam categories, school education content, and AI features

**User-visible outcome:** Students can access a comprehensive education platform covering all major competitive exams (UPSC, State PCS, SSC, Railway, Police, Teaching, Banking, Defence), complete school education for Classes 1-12 across multiple boards, enhanced AI learning tools (8 total features including Study Planner and Doubt Solver), organized study materials across 9 subjects, integrated YouTube video classes, expanded test series with PYQ practice, specialized geography content, and current affairs quizzes—all organized through an intuitive 11-item navigation menu.
