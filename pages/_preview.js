import { getPagePreview } from "../utils/wagtail";
export { default } from "./[...path]";

export async function getStaticProps({ params, preview, previewData }) {
  if (!preview) {
    return { props: {} };
  }

  const { contentType, token } = previewData;

  const pagePreviewData = await getPagePreview(
    contentType,
    token,
    {}
  );

  return {
    props: pagePreviewData,
  };
}
