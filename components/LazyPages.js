import dynamic from 'next/dynamic';

export default {
  PostPage: dynamic(() => import('./PostPage').then((mod) => mod.default)),
  BlogPage: dynamic(() => import('./BlogPage').then((mod) => mod.default)),
};
