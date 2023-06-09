export default async function preview(req, res) {
  const { content_type: contentType, token } = req.query;

  if (!contentType || !token) {
    return res
      .status(401)
      .json({ message: "Missing contentType and/or token" });
  }

  res.setPreviewData({ contentType, token });
  res.redirect("/_preview");
  res.end();
}
