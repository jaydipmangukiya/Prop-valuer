"use client";

import Link from "next/link";
import { User, Calendar, ChevronLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getBlogById } from "@/app/api/blog";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function BlogDetail({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getBlogById(id);
      setBlogDetails(res);
    } catch (error: any) {
      toast({
        title: "Failed to load blogs  ❌",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <main>
      {/* Back Button */}
      <div className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-4">
          <Badge className="bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100">
            {blogDetails?.category}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {blogDetails?.title}
        </h1>
        {blogDetails?.excerpt && (
          <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
            {blogDetails.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap gap-6 text-slate-600 border-b pb-8 mb-8">
          <div className="flex items-center gap-2">
            <User size={18} className="text-emerald-600" />
            <span>{blogDetails?.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-emerald-600" />
            <span>{new Date(blogDetails?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {blogDetails?.image?.url && (
          <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
            <Image
              src={blogDetails.image.url}
              alt={blogDetails.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700"
          dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
        />
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white py-16 px-4 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need a Property Valuation?
          </h2>
          <p className="text-emerald-100 mb-8">
            Get a professional property valuation from our expert team.
          </p>
          <button className="px-8 py-3 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
