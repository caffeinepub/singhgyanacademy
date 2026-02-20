# Specification

## Summary
**Goal:** Build a comprehensive admin panel with dashboard, full CRUD operations for all content types, branding controls, and student management.

**Planned changes:**
- Create admin dashboard landing page with navigation cards and statistics overview for courses, videos, notes, tests, current affairs, branding, and students
- Enhance ManageCourses page with edit and delete functionality, displaying list of all courses with action buttons
- Create video management page for adding YouTube links with metadata, editing, and deleting videos with searchable/filterable list
- Enhance ManageTests page with edit and delete functionality for test series and individual questions
- Enhance ManageNotes page with edit and delete functionality, displaying list of all notes with action buttons
- Enhance ManageCurrentAffairs page with edit and delete functionality, displaying filterable list by type
- Create branding settings page for uploading and previewing new logo with live updates across platform
- Create student management page with searchable/filterable table showing all registered students and export functionality
- Add backend CRUD endpoints: updateCourse, deleteCourse, updateTest, deleteTest, updateNote, deleteNote, updateCurrentAffair, deleteCurrentAffair, updateLogo, getAllStudents with admin authorization
- Update Navigation component to dynamically load logo from backend configuration

**User-visible outcome:** Admins can access a complete admin panel with dashboard overview, manage all content types (courses, videos, tests, notes, current affairs) with full CRUD operations, customize platform branding by uploading new logos, and view/export registered student data.
