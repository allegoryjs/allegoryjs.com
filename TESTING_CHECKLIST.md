# Testing Checklist for Accessibility and SEO Improvements

## Keyboard Navigation Testing

### Skip Navigation
1. ✓ Load the homepage
2. ✓ Press Tab once
3. ✓ Expected: "Skip to main content" link appears
4. ✓ Press Enter to activate
5. ✓ Expected: Focus moves to main content area

### Focus Indicators
1. ✓ Tab through all interactive elements
2. ✓ Expected: Visible focus ring on all interactive elements
3. ✓ Check buttons, links, and form inputs
4. ✓ Expected: 2px outline in accent color

### Form Navigation
1. ✓ Navigate to newsletter form with Tab
2. ✓ Fill in email using keyboard only
3. ✓ Press Enter to submit
4. ✓ Expected: Form submits successfully

## Screen Reader Testing

### ARIA Landmarks
Test with NVDA, JAWS, or VoiceOver:
1. ✓ Navigate by landmarks (d key in NVDA)
2. ✓ Expected landmarks:
   - main (main content)
   - contentinfo (footer)
   - navigation (footer nav)

### Heading Navigation
1. ✓ Navigate by headings (h key in NVDA)
2. ✓ Expected heading structure:
   - H1: "Allegory.js" (in image alt)
   - H2: "How It Works"
   - H2: "Recent Activity"
   - H2: "Stay in the Story"
   - H3: Feature cards
   - H4: Architecture items

### Form Announcements
1. ✓ Focus on email input
2. ✓ Expected: Label is announced
3. ✓ Submit form
4. ✓ Expected: Live region announces status
   - "Subscribing to newsletter..." when loading
   - "Successfully subscribed to newsletter!" on success
   - "Error subscribing to newsletter. Please try again." on error

### Image Alt Text
1. ✓ Navigate to GitHub commits
2. ✓ Expected: Avatar images announced with proper alt text
   - "John's avatar" not just "John"

## Language Support Testing

### Language Switcher
1. ✓ Click globe icon (top right)
2. ✓ Switch to Spanish
3. ✓ Expected: All text updates to Spanish
4. ✓ Check skip link text updates
5. ✓ Check ARIA announcements update

### HTML Lang Attribute
1. ✓ Open browser DevTools
2. ✓ Check `<html lang="en">` on page load
3. ✓ Switch language to Spanish
4. ✓ Expected: Updates to `<html lang="es">`

## Reduced Motion Testing

### Test with System Preference
1. ✓ Enable "Reduce Motion" in OS settings:
   - macOS: System Preferences > Accessibility > Display > Reduce motion
   - Windows: Settings > Ease of Access > Display > Show animations
2. ✓ Load the page
3. ✓ Expected: Animations are minimal or instant
4. ✓ Check:
   - Pulsing indicators (should be static)
   - Transitions (should be instant)
   - Hover effects (should be instant)

## SEO Verification

### Meta Tags
Open browser DevTools and check `<head>`:
1. ✓ `<meta name="description" content="...">` exists
2. ✓ `<meta name="keywords" content="...">` exists
3. ✓ `<link rel="canonical" href="https://allegoryjs.com">` exists
4. ✓ `<meta name="theme-color" ...>` exists (2 variants)
5. ✓ Open Graph tags present
6. ✓ Twitter Card tags present

### Structured Data
1. ✓ View page source
2. ✓ Find `<script type="application/ld+json">`
3. ✓ Copy JSON content
4. ✓ Validate at: https://search.google.com/test/rich-results
5. ✓ Expected: Valid SoftwareApplication schema

### Robots.txt
1. ✓ Visit: https://allegoryjs.com/robots.txt
2. ✓ Expected content:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://allegoryjs.com/sitemap.xml
   ```

### Sitemap.xml
1. ✓ Visit: https://allegoryjs.com/sitemap.xml
2. ✓ Expected: Valid XML with homepage entry
3. ✓ Validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Mobile Testing

### Theme Color
1. ✓ Open site on mobile device or in mobile DevTools
2. ✓ Expected: Browser chrome matches theme
   - Light mode: white (#ffffff)
   - Dark mode: black (#000000)

### Touch Targets
1. ✓ Test on mobile
2. ✓ All interactive elements should be at least 44x44px
3. ✓ Check buttons, links, and language switcher

## Browser Developer Tools Checks

### Lighthouse Audit
1. ✓ Open Chrome DevTools
2. ✓ Go to Lighthouse tab
3. ✓ Run audit with:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
4. ✓ Expected scores:
   - Accessibility: 95+ (target: 100)
   - SEO: 95+ (target: 100)

### Accessibility Insights
1. ✓ Install: https://accessibilityinsights.io/
2. ✓ Run FastPass
3. ✓ Expected: No automated issues
4. ✓ Run Tab Stops test
5. ✓ Expected: All interactive elements reachable

## Search Engine Testing (Post-Deployment)

### Google Search Console
1. Submit sitemap.xml
2. Request indexing
3. Check URL inspection tool
4. Expected: No errors

### Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Enter site URL
3. Expected: Valid SoftwareApplication markup

## Color Contrast (Manual Check)

Using browser DevTools or WebAIM contrast checker:

1. ✓ Check text contrast ratios
2. ✓ Expected: All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
3. ✓ Key areas to check:
   - Body text on background
   - Muted text on background
   - Button text on button background
   - Link text (primary color)

## Cross-Browser Testing

Test in:
1. ✓ Chrome/Edge (Chromium)
2. ✓ Firefox
3. ✓ Safari
4. ✓ Mobile Safari (iOS)
5. ✓ Chrome Mobile (Android)

Expected: Consistent behavior across all browsers

## Issues Found During Testing

Document any issues here with steps to reproduce and severity.

---

## Automated Testing Commands

```bash
# Run linter (if configured)
npm run lint

# Build static site
npm run build

# Check for broken links (if tool installed)
npx broken-link-checker http://localhost:3000

# Run accessibility tests (if configured)
npm run test:a11y
```

## Notes

- The site uses client-side language switching, so there's only one URL
- All animations respect `prefers-reduced-motion`
- Focus indicators are visible for keyboard users
- All interactive elements have accessible names
- Forms provide proper feedback to screen readers
