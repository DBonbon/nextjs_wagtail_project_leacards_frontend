import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // add custom css classes to the body element
  // https://nextjs.org/docs/advanced-features/custom-document

  return (
    <Html>
      <Head />
      <body className="dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
