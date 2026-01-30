"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Calendar, Loader2, ImageOff } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Blog, getBlogs } from "@/app/api/blog";

export default function BlogView() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogs(20, 0, true);
        setBlogs(response.blogs || []);
      } catch (err: any) {
        toast({
          title: "Failed to load blogs  ❌",
          description: err?.message,
          variant: "destructive",
        });
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchBlogs();
  }, []);

  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  const filteredPosts = selectedCategory
    ? blogs.filter((b) => b.category === selectedCategory)
    : blogs;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Asstory Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Stay informed with expert takes on valuation, market movement, and
              investment strategy tailored for Indian real estate.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          {/* Category Filter */}
          {loading && (
            <div className="flex justify-center items-center h-80">
              <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
            </div>
          )}
          {!loading && !filteredPosts.length && (
            <div className="flex justify-center items-center text-center text-red-600 text-xl py-20 h-80">
              No articles found in this category. Try a different filter.
            </div>
          )}
          {!loading && filteredPosts.length > 0 && (
            <>
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-slate-900">
                  Filter by Category
                </h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === null
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                        : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                    }`}
                  >
                    All Posts
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-8 text-slate-900">
                {selectedCategory
                  ? `${selectedCategory} Articles`
                  : "Latest Articles"}
                <span className="text-slate-500 ml-2">
                  ({filteredPosts.length})
                </span>
              </h2>
            </>
          )}
          <div>
            {filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link key={post._id} href={`/blog/${post._id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition">
                      {/* Image */}
                      <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                        {post.image?.url ? (
                          <Image
                            src={post.image.url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-400">
                            <ImageOff className="h-8 w-8 mb-2" />
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50"
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors">
                          {post.title}
                        </h3>
                      </CardHeader>

                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="space-y-2 text-xs text-slate-500 border-t pt-4">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-emerald-600" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-emerald-600" />
                            <span>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <div className="mt-4 pt-4 border-t">
                          <span className="text-emerald-600 font-semibold text-sm hover:text-emerald-800 transition-colors">
                            Read More →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="pb-8">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 text-white max-w-7xl mx-auto py-12 rounded-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-6">
                Subscribe to our newsletter
              </h2>
              <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">
                Get valuation tips and market intel straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-white text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
