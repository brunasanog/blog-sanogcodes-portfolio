import { client } from "./sanity";

function getFirstParagraphText(blocks) {
  if (!blocks || blocks.length === 0) return "";

  const firstTextBlock = blocks.find(
    (block) => block._type === "block" && block.style === "normal"
  );

  if (firstTextBlock && firstTextBlock.children) {
    return firstTextBlock.children.map((span) => span.text).join("");
  }

  return "";
}

function calculateReadingTime(blocks) {
  if (!blocks || !Array.isArray(blocks)) return 1;

  const wordsPerMinute = 200;
  let wordCount = 0;

  wordCount = blocks.reduce((total, block) => {
    if (block._type === "block" && block.children) {
      const text = block.children.map((span) => span.text).join("");
      return total + text.trim().split(/\s+/).filter(Boolean).length;
    }
    return total;
  }, 0);

  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Number.isFinite(readingTime) && readingTime > 0 ? readingTime : 1;
}

export async function getFeaturedPost() {
  const query = `
    *[_type == "post" && isFeatured == true && !(_id in path("drafts.**")) && defined(slug.current)] 
    | order(_updatedAt desc)[0] {
      _id, title, slug, publishedAt, "mainImage": mainImage.asset->url, body, subtitle,
      "authorName": author->name,
      totalLikes,
      tags
    }`;
  const featured = await client.fetch(query, {}, { next: { revalidate: 60 } });

  if (!featured) return null;

  return {
    ...featured,
    contentPreview: getFirstParagraphText(featured.body),
    readingTime: calculateReadingTime(featured.body),
  };
}

export async function getRecentPosts() {
  const query = `
    *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] 
    | order(publishedAt desc)[0...5] {
      _id, title, slug, publishedAt, "mainImage": mainImage.asset->url, body, subtitle,
      "authorName": author->name,
      totalLikes,
      tags
    }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  return data.map((post) => ({
    ...post,
    contentPreview: getFirstParagraphText(post.body),
    readingTime: calculateReadingTime(post.body),
  }));
}

export const POSTS_PER_PAGE = 9;

export async function getTotalPostsCount() {
  const query = `count(*[_type == "post" && !(_id in path("drafts.**"))])`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function getPosts(offset = 0) {
  const query = `
    *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] {
      _id,
      title,
      slug,
      publishedAt,
      subtitle,
      excerpt,
      "mainImage": mainImage.asset->url,
      "authorName": author->name,
      body,
      totalLikes,
      tags,
    } | order(publishedAt desc) [${offset}...${offset + POSTS_PER_PAGE}]
  `;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  return data.map((post) => {
    return {
      ...post,
      contentPreview: getFirstParagraphText(post.body),
      readingTime: calculateReadingTime(post.body),
    };
  });
}

export async function getPostsByTag(tag) {
  const query = `
    *[_type == "post" && $tag in tags && !(_id in path("drafts.**")) && defined(slug.current)] {
      _id,
      title,
      slug,
      publishedAt,
      subtitle,
      "mainImage": mainImage.asset->url,
      "authorName": author->name,
      body,
      totalLikes,
      tags,
    } | order(publishedAt desc)
  `;

  const data = await client.fetch(query, { tag }, { next: { revalidate: 60 } });

  return data.map((post) => ({
    ...post,
    contentPreview: getFirstParagraphText(post.body),
    readingTime: calculateReadingTime(post.body),
  }));
}

export async function getAllTags() {
  const query = `
    *[_type == "post" && defined(tags) && tags != [] && !(_id in path("drafts.**"))].tags
  `;

  const listOfTagArrays = await client.fetch(
    query,
    {},
    { next: { revalidate: 3600 } }
  );

  const allTagsFlat = listOfTagArrays.flat();

  const tagCounts = allTagsFlat.reduce((acc, tag) => {
    acc.set(tag, (acc.get(tag) || 0) + 1);
    return acc;
  }, new Map());

  const finalTags = Array.from(tagCounts.keys())
    .map((tag) => ({
      name: tag,
      count: tagCounts.get(tag),
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count);

  return finalTags;
}
