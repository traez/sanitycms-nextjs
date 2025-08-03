# Shadcn UI Component Library SandBox

React UI component libraries sandbox App.

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

**Damilare Femi Akinlaja**: "When working on large projects, where you collaborate with many other engineers, a well componentized architecture makes it so that you don’t redo what already exists.

Problem caused from redoing stuff is regression errors, and inconsistency in app behavior:

For example, there is a modal component that has been maintained over time to be perfect fit for the project’s scenarios.

Then someone else create their own version in their own small feature… there will be chances of design inconsistency, behavior differences, and it could confuse other developers when maintaining the code base.

Imperative development is nice, but some architecture makes it maintainable and testable.

Tailwind only solve for design, but not all of it, and it doesn’t solve for scoped logic.

Frontend architectures like component driven design were not born out of someone’s fantasy, they solve problems that you would never know existed until you encounter them and it’s too late"

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/shadcn-ui-component-library](https://github.com/traez/shadcn-ui-component-library)
- Live Site URL: [https://shadcn-ui-component-library.vercel.app/](https://shadcn-ui-component-library.vercel.app/)

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
- ShadCN  
- @radix-ui  
- class-variance-authority  
- clsx  
- lucide-react  
- nextjs-toploader  
- tailwind-merge    

### What I learned

**1 Main Reasons for Using CSS Component Libraries**   

**A Accessibility**: Built-in ARIA attributes and keyboard navigation support  
**B Consistency**: Ensures uniform design across the application  
**C Speed**: Reduces development time with pre-built components  
**D Responsive Design**: Components automatically adapt to different screen sizes  
**E Cross-Browser Compatibility**: Works seamlessly across various browsers       

**2 Shadcn/ui Current State & Considerations**  
Shadcn/ui, built on top of Radix, faces potential risks due to Radix's declining maintenance—currently maintained by just one part-time developer, with unresolved bugs and limited support from its parent company, which reportedly wants to discontinue it. Despite Shadcn's popularity, it's built on an unstable foundation. Some developers are advocating for a shift toward more stable alternatives like Ariakit or Base UI, which are actively maintained and well-funded. Without a stronger foundation, Shadcn's long-term viability remains uncertain. However, we continue using it as it's currently in a class of its own.

**Important**: Shadcn is not used everywhere in this project. Tailwind CSS is still extensively used, with Shadcn components imported only as needed. This approach helps maintain familiarity with the library while keeping the codebase more maintainable and consistent.

**3 Understanding Transitive Dependencies**  
**What Are Transitive Dependencies?**
- Dependencies that your direct dependencies (listed in `package.json`) rely on
- Installed automatically by npm/yarn/pnpm but not explicitly listed in your `package.json`
- Form a dependency tree (viewable with `npm ls`, `yarn list`, or `pnpm list --depth 2`) 

**4 VS Code File Path Tips**  
In VS Code, you can quickly generate file paths as comments using the built-in "Copy Path" feature:
1. Right-click the file in the Explorer sidebar
2. Select "Copy Path" or "Copy Relative Path"
3. Paste it as a comment in your file  
```javascript
// src/components/Navbar.tsx
```

**5 State Management Strategy. When to Use Cookies vs. Zustand:**  
**Use cookies** for small, persistent values that need to be shared between server and client (auth tokens, user preferences, "remember me" toggles)
**Use Zustand** (or similar) for fast-changing, in-memory app state that doesn't need to persist across page reloads or be accessed server-side 

**6 Understanding the `asChild`Property**  
The `asChild` prop is a common pattern in component libraries (like Radix UI) that allows a component to pass all its props down to its child element instead of rendering its own DOM element.

**Example:**

```javascriptreact
<SidebarMenuButton asChild>
  <Link href="/dashboard">
    <Home />
    <span>Dashboard</span>
  </Link>
</SidebarMenuButton>
```
**Renders as:**

```html
<a href="/dashboard" class="sidebar-menu-button"> <!-- Notice it's now an <a> tag -->
  <svg>...</svg> <!-- Home icon -->
  <span>Dashboard</span>
</a>
```

The button properties are passed down to the `<Link>` component rather than creating a separate button wrapper.   

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofortech.vercel.app/)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
