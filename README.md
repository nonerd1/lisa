# L.I.S.A. Drone Project Website

This is the project portfolio website for L.I.S.A. - a quadcopter whose 3-D-printed arms telescope in flight.

## 🚀 Features

- Modern, responsive design built with Next.js 14 and Tailwind CSS
- Interactive 3D model viewer using Three.js
- Animation effects with Framer Motion
- Comprehensive project documentation and resources
- Optimized for performance and SEO

## 📋 Pages

- **Home**: Hero section with video background and project overview
- **Overview**: High-level project pitch with specs and timeline
- **Hardware**: Detailed bill of materials and component information
- **Software**: Architecture diagrams and code snippets
- **Design**: Gallery of design iterations and 3D model viewer
- **Testing**: Flight test videos and performance data
- **Team**: Meet the team behind the project
- **Resources**: Download project files and documentation
- **Contact**: Get in touch with the team

## 🛠️ Technologies Used

- **Next.js 14**: React framework with app router
- **TypeScript**: Typed JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **Framer Motion**: Animation library
- **Three.js (@react-three/fiber)**: 3D rendering
- **Mermaid**: Diagrams as code

## 🏗️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lisa-drone-website.git
   cd lisa-drone-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create necessary directories:
   ```bash
   mkdir -p public/models public/media public/files
   ```

4. Add your media files:
   - Put arm model at `/public/models/extendable_arm.glb`
   - Add images, videos, and other media to `/public/media/`
   - Add downloadable files to `/public/files/`

## 🚀 Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧪 Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🚢 Deployment

This site is configured for deployment on Vercel. To deploy:

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI: `npm i -g vercel`
3. Run: `vercel` to deploy to a preview URL
4. Run: `vercel --prod` to deploy to production

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

This project is released under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Initial project concept and design by the L.I.S.A. team
- 3D modeling and mechanical design thanks to our engineering team
- Special thanks to all contributors and advisors
