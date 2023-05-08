import { render, screen } from '@testing-library/react'
import { TagWidget } from "./TagWidget.js";
import { blogPageData } from "./mockData";
import camelcaseKeys from "camelcase-keys";

test("TagWidget Test", () => {
  const data = camelcaseKeys(blogPageData, {deep: true})
  const { container } = render(<TagWidget {...data} />);

  const { tagsList } = data;

  const el = screen.getByText(tagsList[0].name);
  expect(el.tagName).toEqual("SPAN");

  tagsList.map((tag) => expect(screen.getByText(tag.name)).toBeInTheDocument());

  expect(container).toMatchSnapshot();
});
