# שדרוג מערכת ההסכמות לתקן גישה גרנולרית (GDPR / תיקון 13)

היעד הוא לשדרג את מנגנון ההסכמות הבינארי הקיים ("הכל או כלום") למערכת ניהול הסכמות מתקדמת (Granular Consent Modal) המאפשרת למשתמש לבחור בנפרד את העדפות הפרטיות שלו (חיוני, סטטיסטיקה, ושיווק).

## חובת אישור מלקוח (User Review Required)

> [!CAUTION]
> המעבר לגישה האירופאית מייצר ממשק מעט יותר מורכב לגולש (חלון הגדרות עם מתגים). עליך לאשר שזהו אכן כיוון ה-UX/UI שאתה מעוניין בו עבור אתר ה-B2B. כמו כן, שים לב כי נשנה את עיצוב הבאנר בהתאם לאישור שלך.

## שינויים מוצעים (Proposed Changes)

### `src/components/CookieBanner.astro`
- **[MODIFY]** שדרוג הממשק: כפתור "דחה הכל" יהפוך לכפתור "הגדרות מתקדמות".
- **[NEW]** הוספת מודל (Modal) צף שיכיל 3 מתגים (Toggles):
  1. **עוגיות חיוניות (Essential):** מצב מופעל-קשיח (Disabled toggle, On).
  2. **סטטיסטיקה (Analytics):** כבוי כברירת מחדל (שולט ב-GA4).
  3. **שיווק ומעקב (Marketing):** כבוי כברירת מחדל (שולט בפיקסלים/גוגל אדס).
- המערכת תשמור את הבחירות לשני משתני `localStorage` נפרדים:
  - `cookie-consent-analytics`
  - `cookie-consent-marketing`

*דוגמת קוד לממשק ההגדרות שיתווסף בבאנר:*
```html
<div id="cookie-preferences-modal" class="hidden fixed inset-0 z-[200] bg-black/50 overflow-y-auto...">
  <label class="flex items-center justify-between">
    <span>סטטיסטיקה ואנליטיקה (Google Analytics 4)</span>
    <input type="checkbox" id="toggle-analytics" class="toggle-switch" />
  </label>
  <label class="flex items-center justify-between">
    <span>שיווק מותאם אישית (Google Ads, Meta)</span>
    <input type="checkbox" id="toggle-marketing" class="toggle-switch" />
  </label>
</div>
```

### `src/layouts/Layout.astro`
- **[MODIFY]** החלפת הלוגיקה הבינארית בלוגיקה מפוצלת שבודקת כל מפתח `localStorage` בנפרד.

*דוגמת קוד מפוצל לצד-לקוח:*
```javascript
// סטטיסטיקה בלבד (GA4)
if (localStorage.getItem('cookie-consent-analytics') === 'granted') {
    gtag('config', 'G-989B9CSF2C');
}

// שיווק מותאם אישית (Ads)
if (localStorage.getItem('cookie-consent-marketing') === 'granted') {
    gtag('config', 'AW-XXXXXXX'); // תשתית מופרדת שמוכנה לקבל את הטוקן
}
```

## שאלות פתוחות (Open Questions)

> [!IMPORTANT]
> 1. האם תרצה שהחלון ייבנה בעיצוב המותאם לתבנית העיצובית (Material Design) של האתר, הכולל מתגים מעוצבים צבועים בצבע ה-`Primary` של האתר?
> 2. מאחר וכעת אנו מפרידים את התשתית - האם יש לך כבר מזהה `AW-XXXXXXX` של גוגל אדס שתרצה שאטמיע מראש בחלק השיווקי ב-Layout, או שתרצה שאשאיר קוד ריק/הערה למילוי עתידי?

## תוכנית בדיקה (Verification Plan)

### בדיקה ידנית
1. כניסה לאתר בחלון גלישה בסתר (Incognito) להופעת הבאנר.
2. פתיחת חלון "הגדרות עוגיות" והפעלת Analytics בלבד ללא Marketing, ושמירת ההעדפות.
3. כניסה לנתיב "Application -> Local Storage" בדפדפן, ווידוא שאכן נרשם רק `cookie-consent-analytics = granted`.
4. וידוא בפאנל ה-Network שהבקשה יוצאת מול התגית `G-989B9CSF2C` בלבד, וסקריפטים אחרים מנועים מריצה בהתאם לדרישת ה-GDPR.
