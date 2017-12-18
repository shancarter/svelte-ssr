# svelte-ssr

This is an attempt to create an interactive article with Svelte that includes a pre-rendered version of the html using the ssr options. Unfortunately my hydration code blows away all the pre-rendered DOM nodes when it loads. I would love to have a static index.html page that loads and get hydrated with a svelte bundle, but doesn't blow away the entire page because most it will be static `<p>` tags with text.
  
  `npm install`
  
  `npm run build`
  
  `npm run serve`
