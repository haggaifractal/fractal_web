# רפקטורינג ויצירת מודולריות רכיבי Layout

ביצוע רפקטורינג מקיף ל-`Layout.astro` על מנת לתקן בעיות ארכיטקטורה (God Object), ניהול מצב שגוי, וטיפול יסודי ב-SEO ועוגיות, הן בצד הלקוח והן בשרת.

## User Review Required

> [!IMPORTANT]
> התוכנית עברה רענון משמעותי לפי הנחיותיך: 
> 1. בוטלה הדרישה לעטיפת מחלקות דרך `@apply`. נשמור על מחלקות ה-Tailwind כ-Utility Styles במקומן הטבעי כחלק מעקרונות הפיתוח, ונשתמש בחלוקה לקומפוננטות-משנה אם הקובץ יהפוך לכבד מדי לקריאה.
> 2. הוספנו דרישה חמורה לשמירה על מחזור החיים של View Transitions (`astro:page-load`) כדי לוודא שסקריפטים חיוניים כדוגמת הנגישות שורדים ניווט SPA.
> 3. טיפול בצד השרת להחלפת קריאת Cookies פרימיטיבית (`functions/_middleware.ts`).

## Proposed Changes

### 1. קומפוננטות חדשות (Components Extraction)

#### [NEW] `src/components/Navbar.astro` (וקומפוננטות עזר במידת הצורך)
- העברת קוד הניווט במלואו, תוך שימור עיצוב Utility-First של TailwindCSS ללא חריגות.
- **טיפול ב-Inline Handlers:** הסרת כל המופעים של `onclick="document.cookie='lang=en...'"` מהקוד ב-HTML. לחילופין, נשתמש במזהים (`data-lang` או `id`) ובתגיות `<script>` ייעודיות שיבצעו הוספת עוגיה באופן בטוח ונקי.

#### [NEW] `src/components/AnalyticsTracking.astro`
- מכולה ללא צד ויזואלי להרצת סקריפטי המעקב בלבד, ורק במידה וניתנה הסכמת Cookie.

#### [NEW] `src/components/AccessibilityWidget.astro`
- שומר על כתיבת `<script is:inline>` וחיבור הוידג'ט דרך Event של `astro:page-load` באופן שמבטיח עמידות מלאה בזמן מעברי ניווט פנימיים (`ClientRouter`).

### 2. שיפור ארכיטקטורת Server-Side ב-Middleware

#### [MODIFY] `functions/_middleware.ts`
- **קריאת עוגיות תקנית:** המערכת פועלת כרגע עם `cookies.includes('lang=en')`, שעלול להביא להטיה (למשל בעוגיה צידית בשם אחר כמו `user_slang=entropy`). החלפת המתודה בחיפוש מוקפד (Regex Parsing או Helper תקני לפענוח אובייקט ה-Cookies) על מנת לשלוף במדויק ולהבטיח יציבות במערך ההפניות (Redirects).

### 3. שכתוב Layout.astro הראשי

#### [MODIFY] `src/layouts/Layout.astro`
- חיסול בעיית ה-God Object. נייבא את רכיבי המבנה שניקינו כך שהקובץ הראשי יתרכז נטו בהגדרת ה-HTML Document ובמיקומו של ה-`<slot />`.

## Open Questions

> [!WARNING]
> לשם ביצוע הניתוח המדויק לעוגיות ב-`functions/_middleware.ts` (סביבת Cloudflare Pages), האם תעדיף פונקציית Regex קטנה קלה (ללא תלויות תוכנה/חבילות) או התקנה של Package גלובלי דוגמת `cookie`? הפתרון המומלץ והפשוט כאן לטעמי הוא משחק Regex מהודק היטב לקריאה.

## Verification Plan
1. בדיקה שעיצוב ה-Navbar נשמר אחד-לאחד כמו לפני הרפקטורינג ללא פגמים גרפיים.
2. החלפת משתנה השפה תוך לחיצה עליו ב-Navbar מבצעת החלפה מאובטחת.
3. ניווט במספר עמודים דרך ה-ClientRouter ב-SPA מוודא שהאייקון של "נגישות" אינו מוסתר או קורס.
4. שינוי ידני של עוגיית ה-`lang` במסוף רשת (DevTools) מוודא שה-Middleware מפנה בדייקנות גם לעמודים בעלי אורך נתיב מורכב.
