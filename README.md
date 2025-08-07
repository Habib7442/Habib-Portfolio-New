# Portfolio Website - Notebook/Sketch Theme

A modern, responsive portfolio website inspired by [chanhdai.com](https://chanhdai.com/) with a unique notebook/paper sketch aesthetic. Built with Next.js, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Notebook/Paper Sketch Theme**: Handwritten fonts, ruled paper background, and pen-drawing animations
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Animations**: Scroll-triggered animations, hover effects, and live drawing animations
- **Modern Tech Stack**: Next.js 15, Tailwind CSS v4, TypeScript, Framer Motion
- **Skiper UI Integration**: Card carousel component for project showcase
- **Clean Architecture**: Modular components and organized file structure

## 🎨 Design Inspiration

The design is inspired by chanhdai.com with the following enhancements:
- Notebook paper background with ruled lines
- Handwritten and sketchy fonts (Kalam, Caveat, Architects Daughter)
- Sketch-style borders and hover effects
- Bright color palette with pen-like interactions
- Centered layout with maximum width constraints

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd habib-portfolio-new
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with notebook theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer, Container)
│   ├── sections/         # Page sections (Hero, About, Projects, Contact)
│   └── ui/               # Reusable UI components
├── data/                 # JSON data files
│   └── projects.json     # Project data
├── lib/                  # Utility functions
│   └── utils.ts          # Class name utilities
├── types/                # TypeScript type definitions
│   └── project.ts        # Project-related types
└── public/               # Static assets
```

## 🎯 Customization

### Personal Information

Update the personal information in the following files:
- `components/sections/Hero.tsx` - Name, title, location, etc.
- `components/sections/Contact.tsx` - Contact details and social links
- `components/sections/About.tsx` - About text and skills

### Project Data

Edit `data/projects.json` to add your own projects:
```json
{
  "projects": [
    {
      "id": "1",
      "title": "Your Project",
      "description": "Project description",
      "technologies": ["React", "Next.js"],
      "category": "Web Development",
      "status": "Completed",
      "featured": true,
      "githubUrl": "https://github.com/...",
      "liveUrl": "https://...",
      // ... more fields
    }
  ]
}
```

### Styling

The notebook theme can be customized in `app/globals.css`:
- Color variables (sketch-blue, sketch-green, etc.)
- Font families
- Background patterns
- Animation effects

### Components

All components are modular and can be easily customized:
- `components/sections/` - Main page sections
- `components/ui/` - Reusable UI components
- `components/layout/` - Layout components

## 🛠 Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **UI Components**: Skiper UI (Card Carousel)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Kalam, Caveat, Architects Daughter)

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions
- Optimized animations for mobile

## 🎨 Color Palette

```css
--sketch-blue: #3498db
--sketch-green: #2ecc71
--sketch-orange: #f39c12
--sketch-purple: #9b59b6
--sketch-red: #e74c3c
--notebook-line: #e8f4f8
--notebook-margin: #ff6b6b
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue or contact the developer.

---

Built with ❤️ using Next.js and Tailwind CSS
