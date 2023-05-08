import { PageProxy } from "./PageProxy";
import { screen, render, waitFor } from "@testing-library/react";
import { blogPageData } from "./mockData";
import { PostPageCardContainer } from "./PostPageCardContainer";
import { SideBar } from "./SideBar";
import camelcaseKeys from "camelcase-keys";


jest.mock("./PostPageCardContainer", () => ({
  PostPageCardContainer:
    jest.fn(({children}) => <div data-testid="PostPageCardContainer">{children}</div>)
}));

jest.mock("./SideBar", () => ({
  SideBar:
    jest.fn(({children}) => <div data-testid="SideBar">{children}</div>)
}));

test('BlogPage', async () => {
  const data = camelcaseKeys(blogPageData, {deep: true})

  const {container} = render(
    <PageProxy {...data}/>
  );

  await waitFor(() =>
    expect(screen.queryByTestId("PostPageCardContainer")).toBeInTheDocument()
  );
  expect(PostPageCardContainer).toHaveBeenCalledWith(
    data,
    expect.anything(),
  );

  await waitFor(() =>
    expect(screen.queryByTestId("SideBar")).toBeInTheDocument()
  );
  expect(SideBar).toHaveBeenCalledWith(
    data,
    expect.anything(),
  );

  expect(container).toMatchSnapshot();
});
