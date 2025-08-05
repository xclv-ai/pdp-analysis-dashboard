# PDP Analysis Dashboard 🚀

**LIVE DEMO**: https://xclv-ai.github.io/pdp-analysis-dashboard/

Interactive dashboard for **real-time** Product Detail Page (PDP) analysis workflow tracking with n8n integration and Supabase real-time updates.

## 🌟 Features

- **Real-time Progress Tracking**: Live updates via Supabase real-time subscriptions
- **Interactive UI**: Modern, glassmorphism design with smooth animations
- **Step-based Progress**: No percentages - tracks actual workflow steps with `active`, `completed`, `error`, and `skipped` states
- **Smart Skip Logic**: Sections are automatically marked as "skipped" (grey) when checkboxes are unchecked
- **Comprehensive Analysis Steps**: Track all phases from URL validation to final completion
- **Mobile Responsive**: Works seamlessly across all device sizes
- **Visual Feedback**: Color-coded status indicators and progress bars
- **Connection Status**: Real-time connection indicator with fallback simulation
- **Error Resilience**: Automatic fallback to simulation mode if real-time fails
- **Final Completion Step**: Uses `current-analysis` as the definitive completion trigger

## 🎯 Live Demo

🔗 **[View Dashboard](https://xclv-ai.github.io/pdp-analysis-dashboard/)**

## 📊 Analysis Workflow Steps

1. **URL Validation** - Validates Amazon/Walmart product URLs
2. **Folder Setup** - Creates Google Drive organization structure
3. **Platform Detection** - Identifies e-commerce platform
4. **PDP Content Aggregation & Enrichment** - Extracts product data with substeps:
   - Base Content Analysis
   - From the brand Section
   - From the manufacturer Section
   - Sustainability Section
5. **Visual Deep Analysis** - Advanced analysis of product images and gallery
6. **Video Deep Processing** - Comprehensive processing and analysis of product videos
7. **AI-empowered Strategic Content Analysis** - Advanced AI-powered content evaluation
8. **Brand Perception Gaps Evaluation** - Analyzing gaps between brand perception and reality
9. **Ratings & Reviews Analysis** - Comprehensive analysis of customer ratings and reviews
10. **Report Generation** - Compiles comprehensive analysis report
11. **File Sharing** - Makes results accessible for download
12. **Analysis Complete** - Final completion status (triggers when `current-analysis` is completed)

## 🛠️ Technical Stack

- **Frontend**: Pure HTML, CSS, JavaScript (ES6+)
- **Real-time**: Supabase real-time subscriptions
- **Styling**: CSS Custom Properties, Glassmorphism, Animations
- **Typography**: Google Fonts (Kode Mono)
- **Integration**: n8n webhook integration with live database tracking

## 🔧 Real-time Integration Architecture

### Supabase Real-time Setup
The dashboard connects to Supabase for real-time progress updates:

```javascript
// Real-time subscription to executions table
this.supabaseClient
    .channel('executions-changes')
    .on('postgres_changes', {
        event: '*',
        schema: 'public', 
        table: 'executions',
        filter: `execution_id=eq.${this.executionId}`
    }, (payload) => {
        this.handleDatabaseUpdate(payload);
    })
    .subscribe();
```

### n8n Workflow Integration
1. **Webhook Trigger**: Dashboard sends request to n8n with execution_id and selected options
2. **Database Updates**: n8n workflow updates Supabase `executions` table with step progress
3. **Real-time Sync**: Dashboard receives live updates via Supabase subscriptions
4. **Visual Updates**: UI updates in real-time based on step status changes
5. **Completion Trigger**: Analysis completes when `current-analysis` step status becomes `completed`

### Database Schema
```sql
create table public.executions (
  execution_id text not null,
  step_id text null,
  status text null,
  timestamp timestamp with time zone null,
  constraint executions_pkey primary key (execution_id)
);
```

### Status Values
- `pending` - Default state (waiting to start)
- `active` - Currently processing
- `completed` - Successfully finished
- `error` - Failed with error
- `skipped` - Step skipped based on user selection (shown in grey)

### Step Mapping
The dashboard maps database step_ids to UI components:

```javascript
mapStepId(dbStepId) {
    const stepMapping = {
        'url_validation': 'url-validation',
        'folder_creation': 'folder-creation',
        'platform_detection': 'platform-detection',
        'content_scraping': 'content-scraping',
        'base_content': 'base-content',
        'from_brand': 'from-brand',
        'from_manufacturer': 'from-manufacturer',
        'sustainability': 'sustainability',
        'image_analysis': 'image-analysis',
        'video_processing': 'video-processing',
        'ai_analysis': 'ai-analysis',
        'brand_perception_gaps': 'brand-perception-gaps',
        'ratings_reviews': 'ratings-reviews',
        'report_generation': 'report-generation',
        'file_sharing': 'file-sharing',
        'current_analysis': 'current-analysis'  // Final completion step
    };
    return stepMapping[dbStepId] || dbStepId;
}
```

## 🚀 Setup & Deployment

### GitHub Pages (Current Setup)
Already configured and live at: `https://xclv-ai.github.io/pdp-analysis-dashboard/`

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/xclv-ai/pdp-analysis-dashboard.git
   ```
2. Open `index.html` in your browser
3. No build process required - pure HTML/CSS/JS

### Environment Configuration
The dashboard includes your Supabase credentials for real-time functionality:
- **Supabase URL**: Built-in for seamless real-time updates
- **Webhook URL**: Pre-configured for your n8n workflow
- **Connection Status**: Visual indicator shows real-time connection state

## 🎨 Customization

### Color Scheme
The dashboard uses CSS custom properties for easy theming:

```css
:root {
    --primary: #6366f1;        /* Primary brand color */
    --secondary: #ec4899;      /* Secondary accent */
    --success: #10b981;        /* Success states */
    --warning: #f59e0b;        /* Warning states */
    --error: #ef4444;          /* Error states */
    --skip: #6b7280;           /* Skipped sections */
    --background: #0f172a;     /* Main background */
    --surface: #1e293b;        /* Card backgrounds */
}
```

### Skip Logic Implementation
Steps and substeps are automatically marked as skipped based on user checkbox selections:

```javascript
isStepSkipped(step) {
    if (step.option) {
        return !this.selectedOptions[step.option];
    }
    return false;
}

// User options mapping:
// base_content -> Base Content Analysis
// premium_content -> From Brand Content  
// from_manufacturer -> From Manufacturer Content
// brand_perception -> Brand Perception Evaluation
// video_content -> Video Analysis
// gallery_images -> Gallery Images
```

### Progress Calculation
Overall progress excludes skipped steps for accurate completion tracking:

```javascript
updateOverallProgress() {
    const totalSteps = this.steps.length - this.skippedSteps.size;
    const completed = this.completedSteps.size;
    const percentage = Math.min((completed / Math.max(totalSteps, 1)) * 100, 100);
    
    const progressFill = document.getElementById('overall-progress');
    progressFill.style.width = percentage + '%';
}
```

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 🔒 Security & Performance

- Real-time subscriptions with automatic cleanup
- Connection fallback and error handling
- No external dependencies loaded from CDNs (except Google Fonts and Supabase)
- Efficient real-time filtering by execution_id
- Automatic timeout handling for long-running workflows
- Skip logic reduces unnecessary processing and visual clutter

## ✨ Recent Updates (v2.0)

### 🎯 Enhanced Completion Logic
- **Final Step Integration**: Added `current-analysis` as the definitive completion trigger
- **Smart Skip Detection**: Automatically detects and visually marks skipped sections based on user selections
- **Improved Progress Tracking**: Progress calculation now excludes skipped steps for accurate completion percentages

### 🎨 Visual Improvements
- **Skip State Styling**: Added grey theme for skipped sections with dedicated CSS variables
- **Status Badge Updates**: Enhanced status badges to include "SKIPPED" state
- **Progress Title Updates**: Dynamic title changes to "Analysis Complete! 🎉" on completion

### 🔧 Technical Enhancements
- **Enhanced Step Mapping**: Updated step mapping to handle both underscore and hyphen formats
- **Completion Detection**: Workflow completion now triggers specifically on `current-analysis` completed
- **Skip Logic Integration**: Full integration of skip logic throughout the application lifecycle
- **Real-time Filtering**: Skip detection prevents processing of updates for disabled sections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add new feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📄 License

MIT License - feel free to use this in your projects!

## 🔗 Links

- **Repository**: https://github.com/xclv-ai/pdp-analysis-dashboard
- **Live Demo**: https://xclv-ai.github.io/pdp-analysis-dashboard/
- **Issues**: https://github.com/xclv-ai/pdp-analysis-dashboard/issues

---

Built with ❤️ for real-time workflow monitoring • **Now with smart skip functionality and enhanced completion logic!**