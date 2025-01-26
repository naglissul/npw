import React, { type ReactNode } from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/plugin-content-blog/client";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import BlogPostPageStructuredData from "@theme/BlogPostPage/StructuredData";
import TOC from "@theme/TOC";
import ContentVisibility from "@theme/ContentVisibility";
import type { Props } from "@theme/BlogPostPage";
import type { BlogSidebar } from "@docusaurus/plugin-content-blog";
import { CommentSection, FirebaseProvider } from "docusaurus-comment-section";

const firebaseConfig = {
  apiKey: "AIzaSyB9pUE5p93eatRFG4ZAU1g88oYACDmxXC4",
  authDomain: "npw-lt-8f4e9.firebaseapp.com",
  projectId: "npw-lt-8f4e9",
  storageBucket: "npw-lt-8f4e9.firebasestorage.app",
  messagingSenderId: "497425222546",
  appId: "1:497425222546:web:404e256e216f0337b44f4b",
};

function BlogPostPageContent({
  sidebar,
  children,
}: {
  sidebar: BlogSidebar;
  children: ReactNode;
}): JSX.Element {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <ContentVisibility metadata={metadata} />
      <BlogPostItem>{children}</BlogPostItem>
      {/* Added content */}
      <FirebaseProvider config={firebaseConfig}>
        <CommentSection postId={metadata.title} isDefaultVerified={true} />
      </FirebaseProvider>
      {/* End of added content */}
      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): JSX.Element {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
