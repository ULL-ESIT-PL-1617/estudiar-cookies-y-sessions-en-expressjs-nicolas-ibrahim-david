# Query string
On the World Wide Web, a **query string** is the part of a uniform resource locator (URL) containing data that does not fit conveniently into a hierarchical path structure. The query string commonly includes fields added to a base URL by a Web browser or other client application, for example as part of an HTML form.
![Example URL with the query string] (http://images.mxpnl.com/blog/2014-10-17%2000:30:48.190268-jnurl1.png)
## Structure
A typical URL containing a query string is as follows:
>http://example.com/over/there?name=chelo

When a server receives a request for such a page, it may run a program, passing the query string, which in this case is, *name=ferret* unchanged, to the program. The first question mark is used as a separator, and is not part of the query string.
A link in a web page may have a URL that contains a query string. HTML defines three ways a user agent can generate the query string:

- an HTML form 
- a  server-side image map 
- an indexed search 
### Web forms
One of the original uses was to contain the content of an HTML form, also known as web form. In particular, when a form containing the fields *field1*, *field2*, *field3* is submitted, the content of the fields is encoded as a query string as follows:
>field1=value1&field2=value2&field3=value3...

- The query string is composed of a series of field-value pairs.
- Within each pair, the field name and value are separated by an **equals sign**, '='.
- The series of pairs is separated by the **ampersand**, '&' (or semicolon).

While there is no definitive standard, most web frameworks allow multiple values to be associated with a single field.
For each field of the form, the query string contains a pair *field=value*. Web forms may include fields that are not visible to the user; these fields are included in the query string when the form is submitted
This convention is a **W3C** recommendation. W3C recommends that all web servers support semicolon separators in addition to ampersand separators to allow *application/x-www-form-urlencoded* query strings in URLs within HTML documents without having to entity escape ampersands.

### Indexed search
Before forms were added to HTML, browsers rendered the **< isindex >** element as a single-line text-input control. The text entered into this control was sent to the server as a query string addition to a GET request for the base URL or another URL specified by the *action* attribute. This was intended to allow web servers to use the provided text as query criteria so they could return a list of matching pages.
When the text input into the indexed search control is submitted, it is encoded as a query string as follows:
>argument1+argument2+argument3...

- The query string is composed of a series of arguments by parsing the text into words at the spaces.
- The series is separated by the plus sign, '+'.

## URL Encoding
Some **characters** cannot be part of a URL (for example, the space) and some other characters have a special meaning in a URL: for example, the character # can be used to further specify a subsection (or fragment) of a document. In HTML forms, the character = is used to separate a name from a value. 
**HTML 5** specifies the following transformation for submitting HTML forms with the "get" method to a web server:

- Characters that cannot be converted to the correct charset are replaced with HTML numeric character references
- SPACE is encoded as '+' or '%20'
- Letters (A–Z and a–z), numbers (0–9) and the characters '*','-','.' and '_' are left as-is
- All other characters are encoded as %HH hex representation with any non-ASCII characters first encoded as UTF-8 (or other specified encoding)

##Example
If a form is embedded in an HTML page as follows:
```javascript
<form action="cgi-bin/test.cgi" method="get">
  <input type="text" name="first" />
  <input type="text" name="second" />
  <input type="submit" />
</form>
```
and the user inserts the strings “this is a field” and “was it clear (already)?” in the two text fields and presses the submit button, the program *test.cgi* (the program specified by the *action* attribute of the form element in the above example) will receive the following query string:
> first=this+is+a+field&second=was+it+clear+%28already%29%3F.

##Tracking
A program receiving a query string can ignore part or all of it. If the requested URL corresponds to a file and not to a program, the whole query string is ignored. However, regardless of whether the query string is used or not, the whole URL including it is stored in the server log files.
For example, when a web page containing the following is requested:
```javascript
 <a href="foo.html">see my page!</a>
 <a href="bar.html">mine is better</a>
```
a unique string, such as *e0a72cb2a2c7* is chosen, and the page is modified as follows:
```javascript
 <a href="foo.html?e0a72cb2a2c7">see my page!</a>
 <a href="bar.html?e0a72cb2a2c7">mine is better</a>
```
The addition of the query string does not change the way the page is shown to the user. When the user follows, for example, the first link, the browser requests the page *foo.html?e0a72cb2a2c7* to the server, which ignores what follows *?* and sends the page *foo.html* as expected, adding the query string to its links as well.
This way, any subsequent page request from this user will carry the same query string *e0a72cb2a2c7*, making it possible to establish that all these pages have been viewed by the same user. Query strings are often used in association with web beacons.
The main differences between query strings used for tracking and HTTP cookies are that:

1. Query strings form part of the URL, and are therefore included if the user saves or sends the URL to another user; cookies can be maintained across browsing sessions, but are not saved or sent with the URL.
2. If the user arrives at the same web server by two (or more) independent paths, it will be assigned two different query strings, while the stored cookies are the same.
3. The user can disable cookies, in which case using cookies for tracking does not work. However, using query strings for tracking should work in all situations.
4. Different query strings passed by different visits to the page will mean that the pages are never served from the browser (or proxy, if present) cache thereby increasing the load on the web server and slowing down the user experience.