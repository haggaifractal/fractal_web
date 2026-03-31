# תוכנית עבודה: SEO, אבטחה וכפיפות לתיקון 13

תוכנית זו מתמקדת בשיפור נראות ברשתות החברתיות, הכנה רגולטורית להטמעת כלי אנליטיקס (לרבות עדכוני Content Security Policy ושמירה על Opt-In אקטיבי תחת תיקון 13), ויצירת מפת אתר אוטומטית למנועי חיפוש.

## User Review Required
> [!IMPORTANT]
> - האם ברצונך שאכין את פונקציית הטעינה של האנליטיקס (`loadAnalytics`) כך שתזריק את GTM בצורה דינמית **רק אחרי קבלת הסכמה** (אכיפה קשיחה של תיקון 13), ושנשאיר שם מזהה placeholder (כגון `GTM-XXXXXXX`)?
> - הטיפול במפת האתר דורש התקנת חבילה (`npx astro add sitemap` או התקנה ידנית ב-npm). אני יכול לבצע זאת ברגע שתאשר את התוכנית.

## Proposed Changes

### SEO & Open Graph
#### [MODIFY] Layout.astro
- הוספת תגיות מטא `og:locale` (לדוגמה `he_IL` או `en_US`) מבוסס על שפת העמוד.
- הוספת `og:locale:alternate` לתמיכה מלאה בשני העמודים כשהם משותפים בוואטסאפ ולינקדאין.
- וידוא שתגית `og:image` מוגדרת היטב.

### Sitemaps & robots.txt
#### [MODIFY] astro.config.mjs
- הוספת אינטגרציה של `@astrojs/sitemap`.
#### [NEW] public/robots.txt
- יצירת קובץ ברור המפנה ל-`https://www.fractal.co.il/sitemap-index.xml`.

### Analytics, CSP וציות לתיקון 13 לחוק הגנת הפרטיות
#### [MODIFY] public/_headers
- עדכון ה- Content-Security-Policy (CSP) תחת `script-src`, `connect-src`, ו-`img-src` כדי לאפשר תעבורה מולם `https://www.googletagmanager.com` ו-`https://www.google-analytics.com`. זה קריטי כדי שהסקרפטים לא ייחסמו על ידי הדפדפן.
#### [MODIFY] Layout.astro
- עדכון התגית `<script is:inline>` שקוראת ל-`loadAnalytics()`. 
- בניית לוגיקה שמזריקה את הסקריפט של גוגל רק כאשר קיים `localStorage.getItem('cookie-consent') === 'granted'`. זה מבטיח יישום Strict Opt-In לפי דרישות תיקון 13.

## Open Questions
האם תרצה להוסיף דומיינים נוספים ל-CSP (כמו פיקסלים של פייסבוק או לינקדאין) מעבר לגוגל אנליטיקס בשלב זה?

## Verification Plan
### Automated Tests
- נריץ ביצוע בילד (`npm run build`) כדי לוודא שקובץ ה-Sitemap אכן נוצר נכון במחיצת `dist`.
### Manual Verification
- נבדוק בסביבת פיתוח שחסימת הסקריפט של ה-CSP פעילה (דרך כלי המפתחים בדפדפן).
- נדמה אישור Cookie ונראה אם הסקריפט של ההזרקה מתבצע באמת רק אחרי הלחיצה (Compliance).
