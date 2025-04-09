// lib/content.js
import { getPostsFrom } from './md-utils';

export async function getAllPosts() {
  const collections = ["blog", "characters", "cultures", "events", "organizations", "places", "series", "statistics"];
  let all = [];

  for (let c of collections) {
    const posts = await getPostsFrom(c); // baca dari content/${c}
    posts.forEach(p => all.push({ ...p, collection: c }));
  }

  return all;
}
