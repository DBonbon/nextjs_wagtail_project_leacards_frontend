import { rest } from 'msw'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { setupServer } from 'msw/node'
import { useRouter } from 'next/router'
import SearchPage from "./SearchPage";

const API_BASE = process.env.NEXT_PUBLIC_WAGTAIL_API_BASE;

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const page1Response = {
  meta: {
    total_count: 4
  },
  items: [
    {
      id: 7,
      meta: {
        type: "blog.PostPage",
        detail_url: "http://api.nextjs-wagtail.com:8000/api/nextjs/v1/pages/7/",
        html_url: "http://api.nextjs-wagtail.com:8000/postpage4/",
        slug: "postpage4",
        first_published_at: "2020-11-12T02:50:53.016000Z"
      },
      title: "PostPage4"
    },
    {
      id: 6,
      meta: {
        type: "blog.PostPage",
        detail_url: "http://api.nextjs-wagtail.com:8000/api/nextjs/v1/pages/6/",
        html_url: "http://api.nextjs-wagtail.com:8000/postpage3/",
        slug: "postpage3",
        first_published_at: "2020-11-12T02:50:39.671000Z"
      },
      title: "PostPage3"
    }
  ]
}

const page2Response = {
    "meta": {
        "total_count": 4
    },
    "items": [
        {
            "id": 5,
            "meta": {
                "type": "blog.PostPage",
                "detail_url": "http://api.nextjs-wagtail.com:8000/api/nextjs/v1/pages/5/",
                "html_url": "http://api.nextjs-wagtail.com:8000/postpage2/",
                "slug": "postpage2",
                "first_published_at": "2020-11-12T02:50:32.020000Z"
            },
            "title": "PostPage2"
        },
        {
            "id": 4,
            "meta": {
                "type": "blog.PostPage",
                "detail_url": "http://api.nextjs-wagtail.com:8000/api/nextjs/v1/pages/4/",
                "html_url": "http://api.nextjs-wagtail.com:8000/postpage1/",
                "slug": "postpage1",
                "first_published_at": "2020-11-12T02:50:23.986000Z"
            },
            "title": "PostPage1"
        }
    ]
}

const server = setupServer(
  rest.get(`${API_BASE}/api/v1/nextjs/pages/`, (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset')
    if (offset === '0') {
      return res(
        ctx.json(page1Response),
      )
    } else if (offset === '2'){
      return res(
        ctx.json(page2Response),
      )
    }
  }),
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('Search on page load', async () => {
  useRouter.mockImplementation(() => ({
    asPath: '/',
    query: {
      query: 'wagtail'
    }
  }))

  render(<SearchPage/>);

  await waitFor(() =>
    expect(
      screen.getByText("Load More", { selector: "button" })
    ).toBeInTheDocument()
  );

  await waitFor(() =>
    expect(screen.getByText("PostPage4", { selector: "a" })).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.getByText("PostPage3", { selector: "a" })).toBeInTheDocument()
  );

  fireEvent.click(screen.getByText("Load More"));

  // Load 2 page
  await waitFor(() =>
    expect(screen.getByText("PostPage2", { selector: "a" })).toBeInTheDocument()
  );

  await waitFor(() =>
    expect(screen.getByText("PostPage1", { selector: "a" })).toBeInTheDocument()
  );

})
