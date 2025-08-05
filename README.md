# PDP Analysis Dashboard 🚀

**LIVE DEMO**: https://xclv-ai.github.io/pdp-analysis-dashboard/

Interactive dashboard for **real-time** Product Detail Page (PDP) analysis workflow tracking with n8n integration and Supabase real-time updates.

## 🌟 Features

- **Real-time Progress Tracking**: Live updates via Supabase real-time subscriptions
- **Interactive UI**: Modern, glassmorphism design with smooth animations
- **Step-based Progress**: No percentages - tracks actual workflow steps with `active`, `completed`, `error` states
- **Comprehensive Analysis Steps**: Track all phases from URL validation to final report generation
- **Mobile Responsive**: Works seamlessly across all device sizes
- **Visual Feedback**: Color-coded status indicators and progress bars
- **Connection Status**: Real-time connection indicator with fallback simulation
- **Error Resilience**: Automatic fallback to simulation mode if real-time fails

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
1. **Webhook Trigger**: Dashboard sends request to n8n with execution_id
2. **Database Updates**: n8n workflow updates Supabase `executions` table
3. **Real-time Sync**: Dashboard receives live updates via Supabase subscriptions
4. **Visual Updates**: UI updates in real-time based on step status changes

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
    --background: #0f172a;     /* Main background */
    --surface: #1e293b;        /* Card backgrounds */
}
```

### Step Configuration
Steps are automatically mapped from your n8n workflow. Update the `mapStepId()` function to match your workflow's step_ids:

```javascript
mapStepId(dbStepId) {
    const stepMapping = {
        'url_validation': 'url-validation',
        'folder_creation': 'folder-creation',
        'platform_detection': 'platform-detection',
        'content_scraping': 'content-scraping',
        // Add your n8n step_ids here
    };
    return stepMapping[dbStepId] || dbStepId;
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

Built with ❤️ for real-time workflow monitoring • **Now with live Supabase integration!**