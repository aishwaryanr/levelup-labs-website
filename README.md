# LevelUp Labs Website

A minimalistic, modular website for LevelUp Labs - AI Advisory & Implementation specialists.

## Project Structure

```
labs_website/
├── index.html              # Main landing page
├── blog.html               # Blog listing page
├── resources.html          # Resources listing page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # JavaScript functionality
├── blog/
│   └── *.html              # Individual blog posts
├── resources/
│   └── *.html              # Individual resource pages
├── components/
│   ├── header.html         # Shared header component
│   └── footer.html         # Shared footer component
├── templates/
│   ├── new-blog-post.html  # Template for new blog posts
│   └── new-resource.html   # Template for new resources
└── README.md
```

## Features

- **Responsive Design**: Works on all devices
- **Modular Structure**: Easy to add new content
- **Contact Form**: Comprehensive questionnaire that opens email client
- **Blog System**: Individual blog posts with metadata
- **Resources System**: Categorized resources with individual pages
- **Clean Navigation**: Smooth scrolling between sections
- **SEO Friendly**: Proper meta tags and semantic HTML

## Adding New Content

### Adding a New Blog Post

1. Copy `templates/new-blog-post.html` to `blog/your-post-name.html`
2. Replace the following placeholders:
   - `BLOG_TITLE`: Your blog post title
   - `PUBLISH_DATE`: Publication date
   - `CATEGORY`: Post category (Strategy, Implementation, etc.)
   - `READ_TIME`: Estimated reading time
   - `LEAD_PARAGRAPH`: Opening paragraph
   - `CTA_TITLE`: Call-to-action title
   - `CTA_DESCRIPTION`: Call-to-action description

3. Add the new post to `blog.html` in the blog-grid section:
```html
<article class="blog-post-card">
    <h2><a href="blog/your-post-name.html">Your Post Title</a></h2>
    <div class="post-meta">
        <span class="date">Date</span>
        <span class="category">Category</span>
    </div>
    <p>Brief description...</p>
    <a href="blog/your-post-name.html" class="read-more">Read More</a>
</article>
```

### Adding a New Resource

1. Copy `templates/new-resource.html` to `resources/your-resource-name.html`
2. Replace the following placeholders:
   - `RESOURCE_TITLE`: Your resource title
   - `RESOURCE_TYPE`: Type (Guide, Tool, Template, etc.)
   - `READ_TIME`: Estimated reading/completion time
   - `RESOURCE_DESCRIPTION`: Brief description
   - `CTA_TITLE`: Call-to-action title
   - `CTA_DESCRIPTION`: Call-to-action description

3. Add the new resource to `resources.html` in the appropriate category section:
```html
<div class="resource-card">
    <h3><a href="resources/your-resource-name.html">Your Resource Title</a></h3>
    <p>Brief description...</p>
    <div class="resource-meta">
        <span class="resource-type">Type</span>
        <span class="resource-length">Duration</span>
    </div>
</div>
```

## Services Offered

- **AI Advisory**: Strategic guidance on AI vision and implementation
- **Hands-on Implementation**: Engineering team augmentation and direct implementation
- **Corporate Training**: Comprehensive training programs and workshops
- **Strategic Investments**: Investment opportunities in AI companies

## Contact Information

- **Email**: contact@levelup-labs.ai
- **Website**: [Local development server](http://localhost:8000)

## Development

To run the website locally:

1. Navigate to the project directory
2. Start a local server: `python3 -m http.server 8000`
3. Open your browser to `http://localhost:8000`

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: Form handling and smooth scrolling
- **No frameworks**: Lightweight and fast loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 LevelUp Labs. All rights reserved.