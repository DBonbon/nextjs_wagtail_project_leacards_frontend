import React from "react";
import LazyPages from './LazyPages';
import { HeadMeta } from "./HeadMeta";

function PageProxy(props) {
  const {pageType} = props;
  const PageComponent = LazyPages[pageType];

  if (PageComponent) {
    return (
      <React.Fragment>
        <HeadMeta {...props} />
        <PageComponent {...props} />
      </React.Fragment>
    );
  } else {
    return <div>Error when loading {pageType}</div>;
  }
}

export { PageProxy };
