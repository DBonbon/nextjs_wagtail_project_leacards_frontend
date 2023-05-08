import React from "react";
import Head from "next/head";

function HeadMeta(props) {
  const { seoJsonTitle, seoJsonDescription } = props.pageContent;
  return (
    <Head>
      <title>{seoJsonTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      {!!seoJsonDescription && (
        <meta name="description" content={seoJsonDescription} />
      )}
    </Head>
  );
}

export { HeadMeta };
