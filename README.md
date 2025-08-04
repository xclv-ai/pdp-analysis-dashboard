# PDP Analysis Dashboard 🚀

Interactive dashboard for real-time Product Detail Page (PDP) analysis workflow tracking with n8n integration.

## 🌟 Features

- **Real-time Progress Tracking**: Monitor your n8n workflow execution with live updates
- **Interactive UI**: Modern, glassmorphism design with smooth animations
- **Comprehensive Analysis Steps**: Track all phases from URL validation to final report generation
- **Mobile Responsive**: Works seamlessly across all device sizes
- **Visual Feedback**: Color-coded status indicators and progress bars

## 🎯 Live Demo

🔗 **[View Dashboard](https://xclv-ai.github.io/pdp-analysis-dashboard/)**

## 📊 Analysis Workflow Steps

1. **URL Validation** - Validates Amazon/Walmart product URLs
2. **Folder Setup** - Creates Google Drive organization structure
3. **Platform Detection** - Identifies e-commerce platform
4. **Content Scraping** - Extracts product data with substeps:
   - Base Content Analysis
   - Brand Story Section
   - Product Description
   - Sustainability Focus
5. **Visual Analysis** - Processes product images and gallery
6. **Video Processing** - Analyzes product videos
7. **AI Analysis** - Runs AI-powered content evaluation:
   - PDP Brand Perception
   - Target Brand Perception
8. **Brand Perception** - Analyzes perception gaps
9. **Ratings & Reviews** - Sentiment analysis of customer feedback
10. **Report Generation** - Compiles comprehensive analysis
11. **File Sharing** - Makes results accessible for download

## 🛠️ Technical Stack

- **Frontend**: Pure HTML, CSS, JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Glassmorphism, Animations
- **Typography**: Google Fonts (Kode Mono)
- **Integration**: Ready for n8n webhook/REST API connection

## 🔧 Integration with n8n

This dashboard is designed to integrate with your n8n workflow. To connect:

1. **Webhook Integration**: Replace the simulated `executeWorkflow()` function with actual n8n webhook calls
2. **Real-time Updates**: Implement WebSocket or polling mechanism for live status updates
3. **API Endpoints**: Configure REST API calls to your n8n instance

### Example Integration Code

```javascript
async executeWorkflow(url, options) {
    // Replace with actual n8n webhook URL
    const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, options })
    });
    
    const { executionId } = await response.json();
    this.executionId = executionId;
    
    // Poll for status updates
    this.pollExecutionStatus();
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

### Custom Domain
To use your own domain:
1. Add a `CNAME` file to the repository root
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

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
Modify the `steps` array in the JavaScript to match your workflow:

```javascript
this.steps = [
    {
        id: 'your-step-id',
        title: 'Your Step Title',
        description: 'Step description',
        icon: '🔥',
        substeps: [
            // Optional substeps
        ]
    }
];
```

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## 🔒 Security

- No external dependencies loaded from CDNs (except Google Fonts)
- Client-side only - no server required
- No data persistence - all state is in-memory

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

Built with ❤️ for real-time workflow monitoring