export async function onRequest(context: any) {
  const { request, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Skip admin interface and static assets/files
  if (pathname.startsWith('/admin') || /\.[a-zA-Z0-9]+$/.test(pathname)) {
    return await next();
  }

  const cookies = request.headers.get('Cookie') || '';
  const isEnPath = pathname.startsWith('/en');
  
  let preferredLang = 'he'; // default

  // Reliable cookie parsing via Regex
  const langMatch = cookies.match(/(?:^|;\s*)lang=(en|he)(?:;|$)/);
  if (langMatch) {
    preferredLang = langMatch[1];
  } else {
    // Check Accept-Language header if no cookie exists
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    if (acceptLanguage.startsWith('en')) {
      preferredLang = 'en';
    }
  }

  // Redirect logic
  if (preferredLang === 'en' && !isEnPath) {
    // User prefers English but is on Hebrew path -> prepend /en
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return Response.redirect(url.toString(), 302);
  } else if (preferredLang === 'he' && isEnPath) {
    // User prefers Hebrew but is on English path -> remove /en
    url.pathname = pathname.replace(/^\/en/, '') || '/';
    return Response.redirect(url.toString(), 302);
  }

  // Continue to normal asset serving
  return await next();
}
