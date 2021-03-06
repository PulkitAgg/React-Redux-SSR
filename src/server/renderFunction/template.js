// html skeleton provider
// import serialize from "serialize-javascript";

export default function template(title, initialState = {}, content = "") {
    let scripts = ` <script>
                     window.__STATE__ = ${JSON.stringify(initialState)}
                  </script>
                  <script src="/bundle.js" defer></script>
                  `
    let page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title> ${title} </title>
                  <link rel="stylesheet" href="/css/main.css">
                </head>
                <body>
                  <div class="content">
                     <div id="app" class="wrap-inner">
                        <!--- magic happens here -->  ${content}
                     </div>
                  </div>
                    ${scripts}
                </body>
                </html>
                `;
    return page;
}