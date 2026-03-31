# משימות רפקטורינג - ארכיטקטורת האתר

- [x] יצירת קבצי התשתית החדשים:
  - `src/components/AnalyticsTracking.astro`
  - `src/components/AccessibilityWidget.astro`
  - `src/components/Navbar.astro` (עם חלוקה לרכיבי משנה לתפריט/לוגו רק אם הקובץ יעבור גבולות סבירים של קריאות)
- [x] פיתוח `AnalyticsTracking.astro` לחילוץ קוד האנליטיקס.
- [x] פיתוח `AccessibilityWidget.astro`:
  - [x] העברת סקריפט ספרית הנגישות.
  - [x] הבטחת המעטפת של `document.addEventListener('astro:page-load', ...)` כולל יציבות מול ClientRouter.
- [x] בניית ה-`Navbar` מחדש:
  - [x] העתקת המבנה ללא הפיכת מחלקות ליסודות CSS חיצוניים (שמירה על Tailwind בפילוסופיית Utility-First).
  - [x] השמדת Inline Event Handlers כגון `onclick` מול סקריפטי שינוי השפה ב-HTML.
  - [x] החלפה למחלקת `.lang-toggle-btn` ותכונת `data-lang`, יחד עם יצירת Block מסודר ב-JS להקצאת עוגיות לפי ההערות.
- [x] תיקון לוגיקת צד-השרת ב-`functions/_middleware.ts`:
  - [x] כתיבת Parse Utility מדויק נגד מחרוזות הקיימות, תוך החלפת הקוד השברירי `cookies.includes` מול שימוש ה-Regex הדק.
- [x] ניקוי ואסיפת הכול בקרבי `src/layouts/Layout.astro`:
  - [x] ייבוא ה-Navbar.
  - [x] ייבוא ה-Analytics.
  - [x] ייבוא ה-AccessibilityWidget.
  - [x] הקובץ כעת נקי, בעל סקופ ברור, ומכיל בסך הכול 151 שורות (משמעותית פחות מ-455).

- [x] הסרת תלות ב-Material Symbols והמרת אייקונים ל-SVGs:
  - [x] יצירת סקריפט ממוכן `fetch-icons.mjs` ליבוא נתיבי האייקונים ישירות מהמאגר של Google.
  - [x] פיתוח קומפוננטת `Icon.astro` מולדת המאפשרת שליטה חלקה בגודל וצבע (Tailwind Utilities).
  - [x] סריקה, איתור, והחלפה של כל 20+ מופעי ה-`.material-symbols-outlined` ב-8 תבניות וקומפוננטות.
  - [x] יישום אנימציות צולבות (Cross-fade) על בסיס שקיפות (Opacity) בכפתורי ההעתקה בפוטר לטובת מניעת Layout Shift לחלוטין.
