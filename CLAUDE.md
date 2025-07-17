# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Website
```bash
# Start local development server
python3 -m http.server 8000

# Access the website at http://localhost:8000
```

### File Structure Navigation
- **Main pages**: `index.html` (landing), `blog.html` (blog listing), `resources.html` (resources listing)
- **Content directories**: `blog/` (individual posts), `resources/` (individual resources)
- **Shared components**: `components/` (header.html, footer.html) - not currently used but available
- **Templates**: `templates/` (new-blog-post.html, new-resource.html) for creating new content
- **Assets**: `css/styles.css` (main stylesheet), `js/script.js` (functionality)

## Architecture Overview

### Design System
This is a minimalistic, lab-like aesthetic website with:
- **Monochrome color palette**: Primary text `#1c1c1c`, background `#fcfbf8`, secondary text `#525252`
- **Typography**: Inter font with tight letter spacing (-0.01em to -0.03em) for technical precision
- **Geometric elements**: Subtle circles, squares, and lines positioned with CSS pseudo-elements
- **Subtle color accents**: Minimal gradients on service cards (blue, green, purple, amber at 30% opacity)

### Content Management System
The website uses a template-based approach for scalability:

#### Blog System
1. Copy `templates/new-blog-post.html` to `blog/filename.html`
2. Replace placeholders: `BLOG_TITLE`, `PUBLISH_DATE`, `CATEGORY`, `READ_TIME`, `LEAD_PARAGRAPH`, `CTA_TITLE`, `CTA_DESCRIPTION`
3. Add entry to `blog.html` in the `.blog-grid` section

#### Resources System
1. Copy `templates/new-resource.html` to `resources/filename.html`
2. Replace placeholders: `RESOURCE_TITLE`, `RESOURCE_TYPE`, `READ_TIME`, `RESOURCE_DESCRIPTION`, `CTA_TITLE`, `CTA_DESCRIPTION`
3. Add entry to `resources.html` in appropriate `.category-section`

### Form Handling
The contact form uses JavaScript to:
- Prevent default submission
- Collect form data including multiple checkbox selections
- Generate mailto link with formatted email body
- Open user's email client with pre-filled content to `contact@levelup-labs.ai`

### CSS Architecture
- **Modular sections**: Each page section has dedicated CSS rules
- **Responsive design**: Mobile-first approach with breakpoints at 768px and 480px
- **Geometric elements**: Implemented via CSS pseudo-elements (::before, ::after) for visual interest
- **Hover effects**: Subtle transform animations (translateY -1px to -2px)
- **Color system**: Service cards have nth-child color accents, CTA sections have blue accent bars

### Navigation Structure
- **Single-page sections**: Hero, Services, About, Testimonials, Community, Contact (anchor links)
- **Multi-page sections**: Resources and Blog (separate HTML files)
- **Smooth scrolling**: Implemented via JavaScript for anchor links
- **Active states**: Navigation highlights current section

## Key Business Context
LevelUp Labs offers AI advisory, implementation, training, and strategic investments. The website emphasizes their "problem-first, enterprise-grade mindset" and positions them as "forward-deployed AI specialists."

## Important Notes
- **CRITICAL**: Always run the local server after making changes for review - the user needs to see changes immediately
- Maintain the lab-like aesthetic with subtle geometric elements
- Keep color usage minimal and professional
- The contact form integrates with email client, not a backend service
- Templates ensure consistency when adding new content

## Development Workflow
After making any changes to the codebase:
1. Save your changes
2. **IMMEDIATELY** run: `python3 -m http.server 8000`
3. Inform the user that the server is running and they can review at http://localhost:8000
4. Wait for user feedback before proceeding