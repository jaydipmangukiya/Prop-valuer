import BlogView from "../views/blog";
import { metadata as BlogMetadata } from "./metadata";
export const metadata = BlogMetadata;

export default function BlogPage() {
  return <BlogView />;
}
