# SIC! SALTS Admin Panel

A separate admin panel website for managing the SIC! SALTS vaping website content.

## Features

- 🖼️ **Image Management**: Upload, organize, and manage website images
- 📦 **Product Management**: Add, edit, and manage vaping products
- 📝 **Content Management**: Edit website text and content
- ⚙️ **Settings**: Configure website settings and preferences
- 📊 **Dashboard**: View website statistics and activity
- 🔐 **Authentication**: Secure admin login system

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **File Upload**: React Dropzone
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to admin panel directory**
   ```bash
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Admin panel: http://localhost:3001

### Demo Login

- **Email**: admin@sicsalts.com
- **Password**: admin123

## Key Features

### Image Management
- Drag & drop image upload
- Image categorization (Hero, Products, Animations, etc.)
- Image preview and management
- File size tracking
- Bulk operations

### Product Management
- Add/edit/delete products
- Product series management
- Stock tracking
- Price management
- Status control (active/inactive)

### Content Management
- Edit hero section content
- Update about page
- Modify contact information
- Real-time preview

### Settings
- Site configuration
- SEO settings
- Social media links
- System preferences
- Maintenance mode toggle

## Project Structure

```
admin-panel/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main admin page
├── components/            # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Top header
│   ├── Dashboard.tsx      # Dashboard overview
│   ├── ProductManagement.tsx # Product CRUD
│   ├── ImageManagement.tsx # Image upload/management
│   ├── ContentManagement.tsx # Content editing
│   └── Settings.tsx       # Settings panel
└── Configuration files
```

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set custom domain (e.g., admin.sicsalts.com)

2. **Environment Variables**
   - `DATABASE_URL`: Your Neon database URL
   - `ADMIN_SECRET`: Secret key for admin authentication

3. **Deploy**
   - Vercel will automatically deploy on every push
   - Your admin panel will be available at your custom domain

## Integration with Main Website

The admin panel is designed to work with the main SIC! SALTS website:

1. **Shared Database**: Both websites use the same Neon database
2. **API Integration**: Admin panel updates content via API calls
3. **Real-time Updates**: Changes reflect immediately on the main website
4. **Image Management**: Uploaded images are accessible to the main website

## Security

- Admin authentication required
- Secure file upload handling
- Input validation and sanitization
- Environment variable protection

## Customization

- Modify color schemes in `tailwind.config.js`
- Add new content sections in `ContentManagement.tsx`
- Extend product fields in `ProductManagement.tsx`
- Customize image categories in `ImageManagement.tsx`

---

**Note**: This is a demo admin panel. In production, implement proper authentication, file storage, and security measures.
