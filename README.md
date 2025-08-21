# Sanity CMS Sandbox

Sanity CMS Sandbox App.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

The aim of this project was for me to build and deploy a modern blog using Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS. I wanted to go beyond a basic blog by setting up the project from scratch, integrating a headless CMS, and giving it a clean, responsive design. A big part of the challenge was implementing tags so posts could be organized, filtered, and counted in a meaningful way.

By the end, I had a production-ready blog with dynamic pages, reusable layouts, theme switching, a custom 404 page, and deployment on Vercel—while also learning how to properly integrate CMS-driven content into a Next.js application.

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/sanitycms-nextjs](https://github.com/traez/sanitycms-nextjs)
- Live Site URL: [https://sanitycms-nextjs.vercel.app/](https://sanitycms-nextjs.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs
- Tailwind CSS
- nextjs-toploader
- Sanity – Headless CMS
- next-sanity – Sanity integration for Next.js
- @sanity/image-url – Helper for building Sanity image URLs
- @sanity/vision – GROQ query explorer for Sanity
- @portabletext/react – Portable Text renderer for React
- react-icons – Popular icon library for React
- styled-components – CSS-in-JS styling library

### What I learned

**1 Tutorial Overview**  
**Excellent Tutorial with Great Handholding**

Build and Deploy BLOG with Tags - Next.js 14, Sanity CMS and Tailwind
- **Video Tutorial**: [YouTube - CodewalkEmpire](https://www.youtube.com/watch?v=yAqgjSZ0PqY&ab_channel=CodewalkEmpire) (2:31:34)
- **GitHub Repository**: [stefandjikic/next-cms-blog](https://github.com/stefandjikic/next-cms-blog)
- **Live Demo**: [next-cms-blog-ce.vercel.app](https://next-cms-blog-ce.vercel.app/)
- **Published**: Dec 6, 2023 by Codewalk Empire

**2 Initial Setup Process**  
For existing Next.js apps, run `pnpm create sanity@latest`

During the interactive setup:
- **Project name?** → Pick any name (e.g., Amatcol Studio)
- **Use TypeScript?** → Yes ✅
- **Output path?** → e.g., studio (this creates a /studio folder inside your project)
- **Dataset name?** → production
- **Use a project template?** → Clean project with no predefined schemas or Blog

*Note: I embedded and chose blank template*  

**3 Sanity Platform Features**  
**Growth Plan Trial**: 30-day free trial available
- Documentation: [Sanity Growth Plan Trial](https://www.sanity.io/docs/platform-management/growth-plan-trial)

**Authentication Options**: 
- GitHub
- Google  
- Email/Password 

**4 Schema Definition**  
Define your schema and register the post schema type to the Studio schema for content structure.     

**5 GROQ Query Language**  
**GROQ (Graph-Relational Object Queries)** is Sanity's custom query language designed to retrieve and shape structured content from its document-based database. 

- **Similar to**: GraphQL (a universal typed API query language created by Facebook/Meta for querying APIs with strongly-typed schemas)
- **Example Query**: `*[_type == "post"]` - Gets all documents of type "post"
- **Testing Environment**: Use `/studio/vision` to test queries before embedding in code  

**6 Portable Text Rendering**  
**Installation**: `pnpm add @portabletext/react`

Sanity stores rich text (like blog posts) in a special JSON format called Portable Text, not plain HTML. To render that content properly in a React app, you need `@portabletext/react`, which converts Portable Text into real React components like `<p>`, `<h2>`, etc. Without it, you'd just see raw structured data instead of readable content.   

**7 Typography Styling**  
**Installation**: `pnpm add -D @tailwindcss/typography`

Add the plugin to your main `style.css` file (this also ensures you enjoy IntelliSense in VS Code):

\`\`\`css
@import "tailwindcss";
+ @plugin "@tailwindcss/typography";
\`\`\`

The Tailwind CSS Typography plugin gives you a `prose` class that automatically styles rich text content like blog posts or articles, so you don't have to manually style each HTML element. It ensures clean, readable formatting for headings, paragraphs, lists, and code blocks, making it perfect for CMS-driven content.  

**8 Image Handling**  
**Installation**: `pnpm add @sanity/image-url`

Sanity stores images as references, not direct links. You need the `urlForImage()` helper with `@sanity/image-url` to generate real image URLs from those references so you can display them properly in your frontend.

After installation, add the function to `src/sanity/lib/image.ts`.

**Common Issue**: You may encounter this error: `next/image`, hostname "cdn.sanity.io" is not configured under images in your `next.config.js`. Make sure to configure this in your Next.js config.  

**9 Documentation Resources**  
- **Official Guide**: [Sanity Next.js Quickstart](https://www.sanity.io/docs/next-js-quickstart) - Use as your primary coding guide

**10 Studio Access**  
- **Studio URL**: [sanitycms-nextjs.vercel.app/studio](https://sanitycms-nextjs.vercel.app/studio)
- **Project Management**: [Sanity Project Members](https://www.sanity.io/manage/project/sufhe0gb)

Both links are protected - first by the app, second by Sanity authentication. 

**11 Dependencies Summary**  
```js
"dependencies": {
  "@portabletext/react": "^3.2.1",     // Install manually
  "@sanity/image-url": "^1.1.0",       // Installed with setup command
  "@sanity/vision": "^4.2.0",          // Installed with setup command
  "next-sanity": "^10.0.6",            // Installed with setup command
  "sanity": "^4.2.0"                   // Installed with setup command
},
"devDependencies": {
  "@tailwindcss/typography": "^0.5.16" // Install manually
}
```

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofor.tech)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

- Jehovah who keeps breath in my lungs
